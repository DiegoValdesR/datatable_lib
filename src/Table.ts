
interface IColumn{
    header: string
    field?: string
    body? : string
}

type Data = Record<string,any>[]

interface ITable {
    data : Data,
    columns : IColumn[],
    tableId : string
}

export class Table{
    private recordsPerPage : number = 10;
    // static records : object[] = [];
    // static filteredRecords : object[] = [];
    // static numPages : number = 0;
    // static recordsCount : number = 0;
    private currentPage : number = 1;

    private config : ITable;

    constructor({data, columns, tableId} : ITable){
        this.config = {
            data : data,
            columns : columns,
            tableId: tableId
        }
    }

    /**
     * Crea una tabla dentro de un elemento HTML 
     */
    public getTable() : HTMLDivElement | void{        
        try {
            //Creamos el contenedor principal de la tabla
            const container = document.createElement("div")
            container.classList.add("table-cont")

            const table = document.createElement("table")
            table.classList.add("datatable")
            table.id = this.config.tableId
            
            const searchBar = this.drawSearchBar()
            const tableHead = this.drawHeaders()
            const tableBody = this.drawBody()
            
            table.appendChild(tableHead)
            table.appendChild(tableBody)

            container.appendChild(searchBar)
            container.appendChild(table)

            return container

        } catch (error : any) {
            console.error(error.message)
        }
    };

    private drawSearchBar(){
        //We create the container for the rest of the elements
        const container = document.createElement("div")
        container.classList.add("searchbar-cont")

        const spanEntries = document.createElement("span")
        spanEntries.innerText = "registros por página"
        const selectEntries = document.createElement("select")
        selectEntries.title = "Seleccione una opción"
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
            //Render the table content again
            this.updateTable()
        })

        inputSearch.addEventListener("input",() => console.log("Typing"))
        
        container.appendChild(spanEntries)
        container.appendChild(selectEntries)
        container.appendChild(inputSearch)
        return container
    }
    
    /**
     * Creamos la cabecera de la tabla
     * @param headers Array de strings el cual cada valor representa una columna
     */
    private drawHeaders() {
        const tableHead = document.createElement("thead")
        const tableHeadRow = document.createElement("tr")

        if(!this.config.columns || this.config.columns.length < 1){
            throw new Error("The headers were not send")
        };

        this.config.columns.forEach((column) => {
            const th = document.createElement("th")
            th.innerText = column.header
            tableHeadRow.appendChild(th) 
        })

        tableHead.appendChild(tableHeadRow);

        return tableHead
    }

    private drawBody(){
        const tableBody = document.createElement("tbody")
        const columns = this.config.columns
        const data : Record<string,any>[] = this.config.data

        if(data.length < 1){
            throw new Error("No data was sent")
        }

        const offset = (this.currentPage - 1) * this.recordsPerPage
        const limit = Math.min(data.length, offset + this.recordsPerPage)

        for (let i = offset; i < limit; i++) {
            const tableBodyRow = document.createElement("tr")

            columns.forEach((column) => {
                if(!column.body && !column.field){
                    throw new Error("The column does not have data associated with it");
                }

                if(column.body && column.field){
                    throw new Error("The column can only have one type of data associated");
                }

                const tableData = document.createElement("td")
                const dataAssoc = column.body ? "body" : "field"

                switch (dataAssoc) {
                    case "body":
                        if(column.body) tableData.innerHTML = column.body;
                        break;

                    case "field":
                        if(column.field) {
                            const fieldData = data[i] 
                            if(!fieldData){
                                throw new Error(`The column doesn't have data`)
                            }

                            if(!fieldData[column.field]){
                                throw new Error(`The key ${column.field} does not exist in the data object`)
                            }

                            tableData.innerText = fieldData[column.field]
                        }
                        
                        break
                
                    default:
                        throw new Error("What the fuck");
                }

                if(tableData.innerHTML != "" || tableData.innerText !== ""){
                    tableBodyRow.appendChild(tableData)
                    tableBody.appendChild(tableBodyRow)
                };
            });
        }

        return tableBody
    }

    private updateTable(data? : Data){
        if(data){
            this.config.data = data
        }

        const table = document.querySelector(`#${this.config.tableId}`)
        if(!table) throw new Error(`The table with the the id: ${this.config.tableId} was not found`)
        
        let oldBody = table.querySelector("tbody")
        if(!oldBody) throw new Error(`The body of the table was not found`)

        const newBody = this.drawBody()
        oldBody.innerHTML = "" 
        oldBody.innerHTML = newBody.innerHTML
    }
}