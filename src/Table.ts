import { Filter } from "./functions/Filter.js"
import { Pagination } from "./functions/Pagination.js"
import { Sort } from "./functions/Sort.js"
import icons from "./icons.js"

interface IColumn{
    header: string
    field?: string
    body? : (rowData? : Record<string,any>) => string | HTMLElement
};

interface ITable {
    data : Data
    columns : IColumn[]
};

interface On{
    selector : string
    eventName: string
    event : (event : Event) => void
}

export class Table{
    private recordsPerPage : number = 10;
    private numPages : number = 0; 
    private recordsCount : number = 0; //The count of all the records
    private currentPage : number = 1;
    private offset = 0;
    private limit = this.recordsPerPage;
    private config : ITable;
    private mutatedData : Data = [];
    private tableContainer = document.createElement('div');

    constructor({data, columns} : ITable){        
        this.config = {
            data : data,
            columns : columns
        };

        this.tableContainer.classList.add("datatable-cont");
    };

    /**
     * Draws the table container with all of its elements
     * @param {string} selector Optional string parameter that'll be used to select an HTML element and appends the created table to it.
     */
    public create(selector? : string){
        try {
            const table = document.createElement('table');
            table.classList.add("datatable");

            const searchBar = this.drawTop();
            const tableHead = this.drawHeaders();
            const tableBody = this.drawBody();
            const tableFooter = this.drawFooter();
            
            table.appendChild(tableHead);
            table.appendChild(tableBody);

            this.tableContainer.appendChild(searchBar);
            this.tableContainer.appendChild(table);

            if(tableFooter) this.tableContainer.appendChild(tableFooter);
            
            if(selector){
                const element = document.querySelector(selector);
                if(!element) throw new Error(`${selector} element does not exist in the document`);
                element.appendChild(this.tableContainer);
                return;
            };

            document.body.appendChild(this.tableContainer);

        } catch (error : any) {
            console.error(error.message);
        };
    };

    /**
     * Allows the table to have custom events.
     * @param params
     */
    public on(params: On){
        try {
            if (!this.tableContainer) throw new Error("Table container not found!");

            this.tableContainer.addEventListener(params.eventName, (e: Event) => {
                const target = e.target as HTMLElement;
                
                if (target && target.closest(params.selector)) {
                    params.event(e);
                };
            });

        } catch (error : any) {
            console.error(error.message);
        };
    };

    /**
     * Creating the top of the table that includes a select with values to change the number of records per page and an input for searching by characters
     */
    private drawTop(){
        //We create the container for the rest of the elements
        const container = document.createElement("div");
        container.classList.add("searchbar-cont");

        //Container for the selector of the number of pages displayed per page
        const selectContainer = document.createElement("div");
        selectContainer.classList.add("select-container");
        //Elements for the select entries per page section
        const spanEntries = document.createElement("span");
        spanEntries.innerText = "registros por página";
        const selectEntries = document.createElement("select");
        selectEntries.title = "Seleccione una opción";

        //Creating the button that clears the filters
        const clearFiltersButton = document.createElement('button')
        clearFiltersButton.type = "button"
        clearFiltersButton.classList.add('clear-filters')
        clearFiltersButton.title = "Click to clear all the active filters"
        clearFiltersButton.innerHTML = icons.clearFilters
        
        selectContainer.appendChild(clearFiltersButton);
        selectContainer.appendChild(selectEntries);
        selectContainer.appendChild(spanEntries);

        //Array with the different numbers of records per page selector
        const arrEntries = [5,10,20,50,100];
        arrEntries.sort((a, b) => a + b)

        arrEntries.forEach(num => {
            const option = document.createElement("option")
            option.value = num.toString(), option.innerText = num.toString()

            if(num === this.recordsPerPage){
                option.selected = true
            }

            selectEntries.appendChild(option)
        });
    
        const inputSearch  = document.createElement("input");
        inputSearch.setAttribute("type","search");

        //Creating the corresponding events
        selectEntries.addEventListener("change",({target}) => {
            const option = target as HTMLOptionElement
            this.recordsPerPage = parseInt(option.value)
            this.currentPage = 1
            //this.currentPage = Math.min(this.currentPage, Math.ceil(this.config.data.length / this.recordsPerPage))
            //Render the table body and footer content again
            this.update()
            this.drawFooter()
        });

        const filter = new Filter(this.config.data)
        inputSearch.addEventListener("input",() => {
            this.currentPage = 1
            const newData = filter.filterData(inputSearch.value, "contains")
            this.update(newData)
            this.drawFooter()
        });

        clearFiltersButton.addEventListener('click',() => {
            this.mutatedData = [];
            filter.clearFilters(this.tableContainer);
            this.update();
            this.drawFooter();
        })

        //Appending all the of the created elements to the main container
        container.appendChild(selectContainer)
        container.appendChild(inputSearch)

        return container
    };

    /**
     * We create the header for the table
     */
    private drawHeaders(){
        const tableHead = document.createElement("thead");
        const tableHeadRow = document.createElement("tr");
        const unsortedData = this.mutatedData.length >= 1 ? [...this.mutatedData] : [...this.config.data];
        const sortObj = new Sort(unsortedData);
        const filterObj = new Filter(unsortedData);
        
        if(!this.config.columns || this.config.columns.length < 1) throw new Error("The headers were not send");

        this.config.columns.forEach((column) => {
            const th = document.createElement("th");

            const headerContainer = document.createElement('div');
            headerContainer.classList.add('header-cont');

            const targetField = column.field;

            const spanHeader = document.createElement("span");
            spanHeader.innerText = column.header;

            headerContainer.appendChild(spanHeader);

            if(targetField){
                const filtersContainer = document.createElement("div")
                filtersContainer.classList.add('buttons-cont')

                //Creating the buttons for the sorting feature
                const buttonOrder = document.createElement("button")
                buttonOrder.type = "button";
                buttonOrder.title = "Ordenar elementos";
                buttonOrder.innerHTML = icons.sortDown;

                //Creating the select element for filter feature
                const selectFilter = document.createElement("select")
                selectFilter.title = "Seleccione una opción"
                selectFilter.name = "select-filter"
                const defaultOption = document.createElement('option')
                defaultOption.innerText = "Seleccione una opción";

                //Creating the select options for each column
                const uniqueOptions : any[] = [];

                for(let i = this.offset; i < this.limit; i++){
                    const object = unsortedData[i];
                    if(!object) continue;
                    const keyValue = object[targetField];

                    if(!uniqueOptions.some(value => value === keyValue)){
                        uniqueOptions.push(keyValue)
                        const option = document.createElement("option");
                        option.innerText = keyValue.toString().toUpperCase();
                        option.value = keyValue.toString();
                        selectFilter.appendChild(option);
                    };
                };

                filtersContainer.appendChild(buttonOrder); 
                filtersContainer.appendChild(selectFilter);
                headerContainer.appendChild(filtersContainer);
                
                let numOfClicks : number = 0;
                let sortValue : sorting = "asc";
                //Click event for sorting 
                th.addEventListener('click',({target}) => {
                    const targetElement = target as HTMLElement;
                    const closestTh = targetElement.closest('th');

                    //Making sure that what the user pressed was the sorting button
                    if(targetElement.tagName === "SELECT" || !closestTh) return;
                    numOfClicks++;

                    const iconsObj : Record<number, any> = {
                        1 : () => {
                            buttonOrder.innerHTML = icons.sortUp
                            sortValue = "desc"
                        },
                        2 : () => {
                            buttonOrder.innerHTML = icons.sortNormal
                            sortValue = "normal"
                        },
                        3 : () => {
                            buttonOrder.innerHTML = icons.sortDown
                            sortValue = "asc"
                        },
                    };

                    if(!iconsObj[numOfClicks]) return;
                    iconsObj[numOfClicks]();

                    if(numOfClicks < 1 || numOfClicks >= 3) numOfClicks = 0;

                    const sortedData = sortObj.sortData({targetField: targetField, sortValue: sortValue});
                    this.update(sortedData);
                });

                //Select event for filter
                th.addEventListener('change', ({target}) => {
                    const select = target as HTMLSelectElement
                    const value = select.value
                    this.currentPage = 1
                    const newData = filterObj.filterData(value, "equals")
                    this.update(newData)
                    this.drawFooter()
                });
                
            };

            th.appendChild(headerContainer);
            tableHeadRow.appendChild(th);
        });

        tableHead.appendChild(tableHeadRow);

        return tableHead;
    };

    /**
     * Method that draws the body based on the data passed by the user
     */
    private drawBody(){
        const tableBody = document.createElement("tbody");
        const columns = this.config.columns;
        const data : Data = this.mutatedData.length >= 1 ? this.mutatedData : this.config.data;
        
        if(data.length < 1) throw new Error("No data was sent");

        this.offset = (this.currentPage - 1) * this.recordsPerPage;
        this.limit = Math.min(data.length, this.offset + this.recordsPerPage);
        this.recordsCount = data.length;
        this.numPages = Math.ceil(this.recordsCount / this.recordsPerPage);

        for (let i = this.offset; i < this.limit; i++) {
            const rowData = data[i]
            const tableBodyRow = document.createElement("tr")

            if(!rowData) throw new Error(`The row ${i + 1} does not have data attached to it`)

            columns.forEach((column) => {
                if(!column.body && !column.field) throw new Error("The column does not have data associated with it");

                if(column.body && column.field) throw new Error("The column can only have one type of data associated");

                const tableData = document.createElement("td")
                const dataAssoc = column.field ? "field" : "body"

                switch (dataAssoc) {
                    case "body":
                        if(column.body){
                            const content = column.body(rowData)

                            if(typeof content === "string"){
                                tableData.innerHTML = content
                                break
                            }

                            tableData.appendChild(content)
                        };
                        break;

                    case "field":
                        if(column.field) {
                            if(!rowData[column.field]){
                                throw new Error(`The key ${column.field} does not exist in the data object`)
                            }
                            tableData.innerText = rowData[column.field]
                        }
                        break;
                
                    default: throw new Error("Unexpected case while creating the body of the table");
                }

                tableBodyRow.appendChild(tableData)
            });

            tableBody.appendChild(tableBodyRow)
        };

        return tableBody;
    };

    /**
     * Method that draws the paginatión section for the table
     */
    private drawFooter(){
        //Drawing the pagination
        const paginationObj = new Pagination();
        const oldPag = this.tableContainer.querySelector(`.pagination-cont`);

        //If the pagination of a table already exists, then we just remove all of it's content and replaced it with the new pagination
        if(oldPag){
           oldPag.innerHTML = ""
           const newPag = paginationObj.drawPagination({
                numPages: this.numPages, 
                currentPage: this.currentPage
           });
           oldPag.innerHTML = newPag.innerHTML;
           return;
        };

        const paginationContainer = paginationObj.drawPagination({
            numPages: this.numPages, 
            currentPage: this.currentPage
        });

        //Pagination events
        paginationContainer.addEventListener('click',({target}) => {
            const targetElement = target as HTMLElement;
            if(!targetElement) return;

            const button = targetElement.closest("button");
            if(!button) return;

            const dataAction = button.dataset.action;
            if(!dataAction) return;
            
            switch (dataAction) {
                case "first":
                    if(this.currentPage === 1) return;
                    this.currentPage = 1
                    break;

                case "previous":
                    if(this.currentPage <= 1) return;
                    this.currentPage -= 1
                    break;

                case "next":
                    if(this.currentPage >= this.numPages) return;
                    this.currentPage += 1
                    break;

                case "last":
                    if(this.currentPage < 1 || this.currentPage >= this.numPages) return;
                    this.currentPage = this.numPages
                    break;

                case "changePage":
                    const pageNumber = button.dataset.numPage
                    if(!pageNumber) throw new Error("The number of the page was not found");
                    this.currentPage = parseInt(pageNumber)
                    break;
            
                default:
                    break;
            };

            this.update();
            this.drawFooter();
        });

        return paginationContainer
    };

    /**
     * Method that re-draws the body of the table, if the user passes a new object with data then the old stored data 
     * gets updated to the new value
     */
    public update(data? : Data) : void{
        if(data) this.mutatedData = data

        const table = this.tableContainer.querySelector("table");
        if(!table) throw new Error(`The table was not found`)
        
        let oldBody = table.querySelector("tbody")
        if(!oldBody) throw new Error(`The body of the table was not found`)

        const newBody = this.drawBody()
        table.removeChild(oldBody)
        table.appendChild(newBody)
    };
};