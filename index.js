import { Table } from "./dist/Table.js";

const data = [
    {id: 1, name: "Pacho", age: 18},
    {id: 2, name: "Manolo", age: 32},
    {id: 3, name: "Michael", age: 44},
    {id: 3, name: "Michael", age: 44},
    {id: 3, name: "Michael", age: 44},
    {id: 3, name: "Michael", age: 44},
    {id: 3, name: "Michael", age: 44},
    {id: 3, name: "Michael", age: 44},
    {id: 3, name: "Michael", age: 44},
    {id: 3, name: "Michael", age: 44},
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
    {header: "AGE", field: "age"},
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