import { ITableBody, ITableColumn, ITableRow } from "../interfaces/table.interfaces.js";

export class TableBody{
    private data : Data = [];
    private mutadedData : Data = [];
    private columns : ITableColumn[];
    private recordsCount : number = 0;
    private numPages : number = 0;

    constructor(columns : ITableColumn[], data : Data){
        this.columns = columns;
        this.data = data
    };

    public drawBody(params : ITableBody) : HTMLTableSectionElement{
        const tableBody = document.createElement("tbody");
        this.mutadedData = params.data ? params.data : [];
        const data = this.mutadedData.length >= 1 ? this.mutadedData : this.data;
        
        if(data.length < 1) throw new Error("No data was sent, module: TableBody");

        const offset = (params.currentPage - 1) * params.recordsPerPage;
        const limit = Math.min(data.length, offset + params.recordsPerPage);
        this.recordsCount = data.length;
        this.numPages = Math.ceil(this.recordsCount / params.recordsPerPage);

        const tableRows = this.drawRows({offset,limit,data});
        tableRows.forEach((row) => tableBody.append(row));

        return tableBody;
    };

    public getInfo(){
        return {
            recordsCount: this.recordsCount,
            numPages : this.numPages
        };
    };

    private drawRows(params : ITableRow) : HTMLTableRowElement[]{
        const tableRows : HTMLTableRowElement[] = [];
        const columns = this.columns;
        
        for (let i = params.offset; i < params.limit; i++) {
            const rowData = params.data[i];
            const tr = document.createElement("tr");

            if(!rowData) throw new Error(`The row ${i + 1} does not have data attached to it`);

            columns.forEach((column) => {
                if(!column.body && !column.field) throw new Error("The column does not have data associated with it");

                if(column.body && column.field) throw new Error("The column can only have one type of data associated");

                const td = document.createElement("td");
                const dataAssoc = column.field ? "field" : "body";

                switch (dataAssoc) {
                    case "body":
                        if(column.body){
                            const content = column.body(rowData);

                            if(typeof content === "string"){
                                td.innerHTML = content;
                                break;
                            };

                            td.appendChild(content);
                        };
                        break;

                    case "field":
                        if(column.field) {
                            if(!rowData[column.field]){
                                throw new Error(`The key ${column.field} does not exist in the data object`);
                            };
                            td.innerText = rowData[column.field];
                        };
                        break;
                
                    default: throw new Error("Unexpected case while creating the body of the table");
                };

                tr.appendChild(td);
            });

            tableRows.push(tr);
        };

        if(tableRows.length < 1) throw new Error("No table row was able to be created.");

        return tableRows;
    };
};