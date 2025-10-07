import { TableBody } from "./components/TableBody.js";
import { TableTop } from "./components/TableTop.js";
import { TableHeader } from "./components/TableHeader.js";
import { TableFooter } from "./components/TableFooter.js";
import { ITable } from "./interfaces/table.interfaces.js";

export class Table{
    private recordsPerPage : number = 10;
    private numPages : number = 0; 
    private currentPage : number = 1;
    private config : ITable;
    private tableContainer = document.createElement('div');

    constructor(params : ITable){        
        this.config = params;
        console.log(this.config.data);
        this.tableContainer.classList.add("datatable-cont");
    };

    /**
     * Draws the table container with all of its elements
     * @param {string} selector Optional string parameter that'll be used to select an HTML element and appends the created table to it.
     */
    public createTable(selector? : string){
        const table = document.createElement('table');
        table.classList.add("datatable");
        const tableTopObj = new TableTop();
        const tableHeadObj = new TableHeader(this.config.columns);
        const tableBodyObj = new TableBody(this.config.columns, this.config.data);
        const tableFooterObj = new TableFooter(this.tableContainer);

        try {
            const tableTop = tableTopObj.drawTop(this.recordsPerPage);
            const tableHead = tableHeadObj.drawHeader();
            const tableBody = tableBodyObj.drawBody({
                currentPage: this.currentPage,
                recordsPerPage: this.recordsPerPage
            });

            this.numPages = tableBodyObj.getInfo().numPages;

            const tableFooter = tableFooterObj.drawFooter({
                currentPage: this.currentPage,
                numPages: this.numPages,
                data: this.config.data,
                
            })
            
            table.appendChild(tableHead);
            table.appendChild(tableBody);

            this.tableContainer.appendChild(tableTop);
            this.tableContainer.appendChild(table);

            if(tableFooter) this.tableContainer.appendChild(tableFooter);
            this.appendToHtml(selector);
        } catch (error : any) {
            console.error(error.message);
        };

    };

    private appendToHtml(selector? : string) : void{
        if(selector){
            const element = document.querySelector(selector);
            if(!element) throw new Error(`${selector} element does not exist in the document`);
            element.appendChild(this.tableContainer);
            return;
        };

        document.body.appendChild(this.tableContainer);
    };

};