
interface IColumn{
    header: string
    field?: string
    body? : string
}

interface ITable {
    data : object[],
    columns : IColumn[], 
    pagination? : boolean
}

export class Table{
    // #RECORDS_PER_PAGE : number = 10;
    // static records : object[] = [];
    // static filteredRecords : object[] = [];
    // static numPages : number = 0;
    // static recordsCount : number = 0;
    // static currentPage : number = 1;
    private config : ITable;

    constructor({data, columns, pagination} : ITable){
        this.config = {
            data : data,
            columns : columns,
            pagination : pagination
        }
    }

    /**
     * Crea una tabla dentro de un elemento HTML 
     */
    public getTable() : HTMLTableElement | void{        
        try {
            const table = document.createElement("table")
            table.classList.add("datatable")
            
            const tableHead = this.drawHeaders()
            const tableBody = this.drawBody()
            
            table.appendChild(tableHead)
            table.appendChild(tableBody)

            return table
        } catch (error : any) {
            console.error(error.message)
        }
    };
    
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
        const data = this.config.data

        if(data.length < 1){
            throw new Error("No data was sent")
        }

        data.forEach((obj : Record <string,any>) => {
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
                            const fieldData =  obj[column.field]
                            if(!fieldData){
                                throw new Error(`The key ${column.field} does not exist in the data object`)
                            }
                            tableData.innerText = fieldData
                        }
                        
                        break
                
                    default:
                        throw new Error("What the fuck");
                }

                if(tableData.innerHTML != "" || tableData.innerText !== ""){
                    tableBodyRow.appendChild(tableData)
                    tableBody.appendChild(tableBodyRow)
                }
            });
        });
        return tableBody
    }
}