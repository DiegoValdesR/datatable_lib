import { Table } from "./dist/Table.js";

let data = [
    {id:1, name: "A"},
    {id:2, name: "B"},
    {id:3, name: "C"},
    {id:4, name: "D"},
    {id:5, name: "E"},
    {id:6, name: "F"},
    {id:7, name: "G"},
    {id:8, name: "H"},
    {id:9, name: "I"},
    {id:10, name: "J"},
    {id:11, name: "K"},
    {id:12, name: "L"},
    {id:13, name: "M"},
    {id:14, name: "N"},
    {id:15, name: "Ñ"},
    {id:16, name: "O"},
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