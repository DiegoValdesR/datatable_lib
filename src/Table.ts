import { Filter } from "./functions/Filter.js"
import { Pagination } from "./functions/Pagination.js"
import { Sort } from "./functions/Sort.js"
import icons from "./icons.js"

interface IColumn{
    header: string
    field?: string
    body? : (rowData : Record<string,any>) => string | HTMLElement
}

interface ITable {
    data : Data,
    columns : IColumn[],
    tableId : string
}

export class Table{
    private recordsPerPage : number = 10;
    private numPages : number = 0; 
    private recordsCount : number = 0; //The count of all the records
    private currentPage : number = 1;   
    private currentPageRecords : number = 0 //The count of the records in a specific page
    private config : ITable 

    constructor({data, columns, tableId} : ITable){        
        this.config = {
            data : data,
            columns : columns,
            tableId: tableId
        }
    }

    /**
     * Creates the whole table 
     */
    public getTable(){        
        try {
            const container = document.createElement("div")
            container.classList.add("datatable-cont")

            const table = document.createElement("table")
            table.classList.add("datatable")
            table.id = this.config.tableId
            
            const searchBar = this.drawSearchBar()
            const tableHead = this.drawHeaders()
            const tableBody = this.drawBody()
            const tableFooter = this.drawFooter()
            
            table.appendChild(tableHead)
            table.appendChild(tableBody)

            container.appendChild(searchBar)
            container.appendChild(table)
            if(tableFooter) container.appendChild(tableFooter)

            return container

        } catch (error : any) {
            console.error(error.message)
        }
    };

    /**
     * Creating the top of the table that includes a select with values to change the number of records per page and an input for searching by characters
     */
    private drawSearchBar(){
        //We create the container for the rest of the elements
        const container = document.createElement("div")
        container.classList.add("searchbar-cont")

        //Container for the selector of the number of pages displayed per page
        const selectContainer = document.createElement("div")
        selectContainer.classList.add("select-container")
        //Elements for the select entries per page section
        const spanEntries = document.createElement("span")
        spanEntries.innerText = "registros por página"
        const selectEntries = document.createElement("select")
        selectEntries.title = "Seleccione una opción"

        selectContainer.appendChild(selectEntries), selectContainer.appendChild(spanEntries)
        const arrEntries = [5,10,20,50,100]
        
        arrEntries.forEach(num => {
            const option = document.createElement("option")
            option.value = num.toString(), option.innerText = num.toString()

            if(num === this.recordsPerPage){
                option.selected = true
            }

            selectEntries.appendChild(option)
        })
    
        const inputSearch  = document.createElement("input")
        inputSearch.setAttribute("type","search")

        //Creating the corresponding events
        selectEntries.addEventListener("change",({target}) => {
            const option = target as HTMLOptionElement
            this.recordsPerPage = parseInt(option.value)
            this.currentPage = 1
            //this.currentPage = Math.min(this.currentPage, Math.ceil(this.config.data.length / this.recordsPerPage))
            //Render the table and footer content again
            this.updateTableBody()
            this.drawFooter()
        })

        const filter = new Filter(this.config.data)
        inputSearch.addEventListener("input",() => {
            this.currentPage = 1
            const newData = filter.filterData(inputSearch.value)
            this.updateTableBody(newData)
            this.drawFooter()
        })
        
        container.appendChild(selectContainer)
        container.appendChild(inputSearch)
        return container
    };

    /**
     * We create the header for the table
     */
    private drawHeaders() {
        const tableHead = document.createElement("thead")
        const tableHeadRow = document.createElement("tr")
        const sortObj = new Sort(this.config.data)
        const filterObj = new Filter(this.config.data)
    
        if(!this.config.columns || this.config.columns.length < 1){
            throw new Error("The headers were not send")
        };

        this.config.columns.forEach((column) => {
            const th = document.createElement("th")
            const headerContainer = document.createElement('div')
            headerContainer.classList.add('header-cont')
            const targetField = column.field
            const spanHeader = document.createElement("span")
            spanHeader.innerText = column.header

            headerContainer.appendChild(spanHeader)

            //Order in ascending / descending order button
            if(targetField){
                const filtersContainer = document.createElement("div")
                filtersContainer.classList.add('buttons-cont')

                //Creating the buttons for the sorting feature
                const buttonOrder = document.createElement("button")
                buttonOrder.type = "button"
                buttonOrder.title = "Ordenar elementos"
                buttonOrder.innerHTML = icons.sortDown

                //Creating the select element for filter feature
                const selectFilter = document.createElement("select")
                selectFilter.title = "Seleccione una opción"
                selectFilter.name = "select-filter"
                const defaultOption = document.createElement('option')
                defaultOption.innerText = "Seleccione una opción"

                //Creating the select options for each column
                const optionValues = this.config.data.map(obj => obj[targetField])
                const uniqueOptions = [...new Set(optionValues)]

                uniqueOptions.forEach((val) => {
                    const option = document.createElement("option")
                    option.innerText = val.toString().toUpperCase()
                    option.value = val.toString()
                    selectFilter.appendChild(option)
                })

                filtersContainer.appendChild(buttonOrder), filtersContainer.appendChild(selectFilter)
                headerContainer.appendChild(filtersContainer)
                
                //Click event
                let numOfClicks : number = 0
                th.addEventListener('click',({target}) => {
                    const targetElement = target as HTMLElement
                    const closestTh = targetElement.closest('th')

                    //Making sure that what the user pressed was the sorting button
                    if(targetElement.tagName === "SELECT" || !closestTh) return;
                    numOfClicks++

                    const iconsObj : Record<number, string> = {
                        1 : icons.sortUp,
                        2 : icons.sortNormal,
                        3 : icons.sortDown
                    }

                    if(iconsObj[numOfClicks]) {
                        buttonOrder.innerHTML = iconsObj[numOfClicks] || icons.sortUp
                    }

                    if(numOfClicks < 1 || numOfClicks >= 3) numOfClicks = 0

                    const sortedData = sortObj.sortData(targetField)
                    this.updateTableBody(sortedData)
                })

                //Select event
                th.addEventListener('change', ({target}) => {
                    const select = target as HTMLSelectElement
                    const value = select.value
                    const newData = filterObj.filterData(value)
                    this.updateTableBody(newData)
                })
            }

            th.appendChild(headerContainer)
            tableHeadRow.appendChild(th) 
        })

        tableHead.appendChild(tableHeadRow);

        return tableHead
    }

    private drawBody(){
        const tableBody = document.createElement("tbody")
        const columns = this.config.columns
        const data : Data = this.config.data
        
        if(data.length < 1) throw new Error("No data was sent")

        const offset = (this.currentPage - 1) * this.recordsPerPage
        const limit = Math.min(data.length, offset + this.recordsPerPage)
        this.recordsCount = data.length
        this.numPages = Math.ceil(this.recordsCount / this.recordsPerPage)
        this.currentPageRecords = limit - offset

        
        for (let i = offset; i < limit; i++) {
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
        }

        return tableBody
    }

    private drawFooter(){
        //Drawing the pagination
        const paginationObj = new Pagination()
        //We check if the element already exists
        const parent = document.querySelector(`#${this.config.tableId}`)?.closest(".datatable-cont")
        let footerContainer = parent?.querySelector(".datatable-footer")

        if(parent && footerContainer){
            footerContainer.innerHTML = ""
            footerContainer.innerHTML = paginationObj.drawFooter({
                currentPageRecords: this.currentPageRecords,
                recordsPerPage: this.recordsPerPage,
                recordsCount: this.recordsCount
            }).innerHTML

        }else{
            footerContainer = paginationObj.drawFooter({
                currentPageRecords: this.currentPageRecords,
                recordsPerPage: this.recordsPerPage,
                recordsCount: this.recordsCount
            })
        }

        const paginationContainer = paginationObj.drawPagination({numPages: this.numPages, currentPage: this.currentPage})

        //Pagination events
        paginationContainer.addEventListener('click',({target}) => {
            const button = target as HTMLButtonElement
            if(!button) return;
            const dataAction = button.dataset.action
            if(!dataAction) return
            
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
            }

            this.updateTableBody()
            this.drawFooter()
        })

        //Appending all the elements 
        footerContainer.appendChild(paginationContainer)
        return footerContainer
    }

    public updateTableBody(data? : Data){
        if(data) this.config.data = data

        const table = document.querySelector(`#${this.config.tableId}`)
        if(!table) throw new Error(`The table with the the id: ${this.config.tableId} was not found`)
        
        let oldBody = table.querySelector("tbody")
        if(!oldBody) throw new Error(`The body of the table was not found`)

        const newBody = this.drawBody()
        oldBody.innerHTML = "" 
        oldBody.innerHTML = newBody.innerHTML
    }
}