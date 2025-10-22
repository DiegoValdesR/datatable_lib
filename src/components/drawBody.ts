import type { IDrawTableBody } from "./../interfaces/table.interface.js";

export const drawBody = (params : IDrawTableBody) => {
    const tbody = params.table.querySelector("tbody") || document.createElement("tbody");
    if(tbody.innerHTML.length > 0) tbody.innerHTML = "";
    
    for (let i = params.offset; i < params.limit; i++) {
        const rowData = params.data[i];

        if(!rowData) throw new Error(`The row ${i + 1} does not have data attached to it`);

        const tr = document.createElement("tr");

        params.columns.forEach((column, index) => {
            if(!column.body && !column.field) throw new Error(`The column number ${index + 1} does not have data associated with it`);

            if(column.body && column.field) throw new Error(`The column number ${index + 1} can only have one type of data associated`);

            const td = document.createElement("td");

            if(column.field){
                const keyValue = rowData[column.field];
                if(!keyValue) throw new Error(`The key ${column.field} does not exist in the data object`);
                td.innerText = keyValue;
            };

            if(column.body){
                const rowContent = column.body(rowData);
                if(typeof rowContent === "string"){
                    td.innerHTML = rowContent;
                }else{
                    td.appendChild(rowContent);
                };
            };

            if(td.innerHTML.length > 30) td.innerHTML = td.innerHTML.slice(0, 30) + "...";

            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    };

    return tbody;
};