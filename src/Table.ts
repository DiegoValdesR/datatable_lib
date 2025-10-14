import { Filter } from "./functions/Filter.js";
import { Sort } from "./functions/Sort.js";
import { components } from "./components/index.js";
import { events } from "./events/index.js";
import type { ICustomEvent, ITable } from "./interfaces/table.interface.js";
import icons from "./icons.js";

export class Table{
    private recordsPerPage : number = 10;
    private numPages : number = 0; 
    private recordsCount : number = 0;
    private currentPage : number = 1;
    private offset = 0;
    private limit = this.recordsPerPage;
    private config : ITable;
    private mutatedData : Data = [];
    private tableContainer = document.createElement('div');
    private table = document.createElement('table');

    constructor(params : ITable){        
        this.config = params;
        this.tableContainer.classList.add("datatable-cont");
        this.table.classList.add('datatable');
    };

    /**
     * Draws the table container with all of its elements
     * @param {string} selector Optional string parameter that'll be used to select an HTML element and appends the created table to it.
     */
    public createTable(selector? : string){
        try {
            const searchBar = this.drawTop();
            const tableHead = this.drawHeaders();
            const tableBody = this.drawBody();
            const tableFooter = this.drawFooter();
            
            this.table.appendChild(tableHead);
            this.table.appendChild(tableBody);

            this.tableContainer.appendChild(searchBar);
            this.tableContainer.appendChild(this.table);

            if(tableFooter) this.tableContainer.appendChild(tableFooter);
            
            this.appendToHtml(selector);

        } catch (error : any) {
            console.error(error.message);
        };
    };

    public redrawTable(data? : Data){
        if(data) this.mutatedData = data;
        this.drawBody();
        this.drawFooter();
    };

    /**
     * Allows the table to have custom events.
     * @param params
     */
    public customEvent(params: ICustomEvent){
        try {
            if (!this.tableContainer) throw new Error("Table container not found!");

            this.tableContainer.addEventListener(params.eventName, (e: Event) => {
                const target = e.target as HTMLElement;

                if(target.closest(params.selector)) params.event(e);
            });

        } catch (error : any) {
            console.error(error.message);
        };
    };

    private appendToHtml(selector? : string){
        if(selector){
            const element = document.querySelector(selector);
            if(!element) throw new Error(`${selector} element does not exist in the document`);
            element.appendChild(this.tableContainer);
            return;
        };

        document.body.appendChild(this.tableContainer);
    };

    /**
     * Creating the top of the table that includes a select with values to change the number of records per page and an input for searching by characters
     */
    private drawTop(){
        const datatableTop = components.drawTop(this.recordsPerPage);
        const filters = new Filter(this.config.data);

        //Custom event for changing the maximum number of records for each page 
        this.customEvent({
            selector: ".datatable-top select",
            eventName: "change",
            event: ({target}) => {
                const option = target as HTMLOptionElement;
                this.recordsPerPage = parseInt(option.value);
                this.currentPage = 1;
                //Render the table body and footer content again
                this.drawBody();
            }
        });

        //Custom event for the searchbar
        this.customEvent({
            selector: ".datatable-top input",
            eventName: "input",
            event: ({target}) => {
                const input = target as HTMLInputElement;
                this.currentPage = 1;
                this.mutatedData = filters.filterData(input.value, "contains");
                this.drawBody();
            }
        });

        // clearFiltersButton.addEventListener('click',() => {
        //     this.mutatedData = [];
        //     filter.clearFilters(this.tableContainer);
        //     this.update();
        //     this.drawFooter();
        // });

        return datatableTop;
    };

    /**
     * We create the header for the table
     */
    private drawHeaders(){
        const unsortedData = this.mutatedData.length >= 1 ? [...this.mutatedData] : [...this.config.data];
        const sortObj = new Sort(unsortedData);
        const filterObj = new Filter(unsortedData);

        const thead = components.drawHeaders({
            columns: this.config.columns,
            data : unsortedData,
            offset: this.offset,
            limit : this.limit,
            table : this.table
        })

        return thead;
    };

    private drawBody(){
        const columns = this.config.columns;
        const data = this.mutatedData.length >= 1 ? this.mutatedData : this.config.data;

        if(data.length === 0) throw new Error("No data was sent");

        this.offset = (this.currentPage - 1) * this.recordsPerPage;
        this.limit = Math.min(data.length, this.offset + this.recordsPerPage);
        this.recordsCount = data.length;
        this.numPages = Math.ceil(this.recordsCount / this.recordsPerPage);

        const tbody = components.drawBody({
            data: data,
            columns: columns,
            table: this.table,
            offset: this.offset,
            limit: this.limit
        });

        this.drawHeaders();
        this.drawFooter();

        return tbody;
    };

    private drawFooter(){
        const footerContainer = components.drawFooter({
            currentPage: this.currentPage,
            numPages: this.numPages,
            tableContainer: this.tableContainer
        });

        //Pagination event
        this.customEvent({
            selector: ".datatable-footer button",
            eventName : "click",
            event: ({target})=>{
                const htmlElement = target as HTMLElement;
                const button = htmlElement.closest('button');
                if(!button) return;

                this.currentPage = events.paginationEvent({
                    currentPage: this.currentPage,
                    numPages: this.numPages,
                    button: button
                });
                
                this.drawBody();
            }
        });

        return footerContainer;
    };
};