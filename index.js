import { Table } from "./dist/Table.js";

let data = [
    {id:1, name: "A" , date: "24/08/2025"},
    {id:5, name: "Z" , date: "24/08/2025"},
    {id:6, name: "H" , date: "24/08/2025"},
    {id:41, name: "U" , date: "24/08/2025"},
    {id:52, name: "E" , date: "24/08/2025"},
    {id:6, name: "F" , date: "24/08/2025"},
    {id:74, name: "G" , date: "24/08/2025"},
    {id:8, name: "H" , date: "24/08/2025"},
    {id:9, name: "I" , date: "24/08/2025"},
    {id:10, name: "J" , date: "24/08/2025"},
    {id:11, name: "K" , date: "24/08/2025"},
    {id:12, name: "L" , date: "24/08/2025"},
    {id:13, name: "M" , date: "24/08/2025"},
    {id:14, name: "N" , date: "24/08/2025"},
    {id:15, name: "Ñ" , date: "24/08/2025"},
    {id:16, name: "O" , date: "24/09/2025"},
]

const body = (rowData) => {
    return  `
        <div class="actions">
            <button type="button" data-id="${rowData.id}" id="view">
                Ver detalles
            </button>
            <button type="button" data-id="${rowData.id}" id="update">
                Actualizar
            </button>
        </div>
    `
}

const columns = [
    {header: "ID", field: "id"},
    {header: "NAME", field: "name"},
    {header: "DATE", field: "date"},
    {header: "ACCIONES", body: body}
]

const tableObj = new Table({
    data : data,
    columns : columns,
    tableId: "table1"
})

const table = tableObj.getTable()
document.body.appendChild(table)

document.addEventListener("DOMContentLoaded",() => {
    document.querySelector("#view").addEventListener('click',(e) => console.log(e))
})