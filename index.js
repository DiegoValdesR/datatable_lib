import { Table } from "./dist/Table.js";

const data = [
    {id: 1, name: "Pacho", age: 18},
    {id: 2, name: "Manolo", age: 32},
    {id: 3, name: "Michael", age: 44},
    {id: 4, name: "Michael", age: 44},
    {id: 5, name: "Michael", age: 44},
    {id: 6, name: "Michael", age: 44},
    {id: 7, name: "Michael", age: 44},
    {id: 8, name: "Michael", age: 44},
    {id: 9, name: "Michael", age: 44},
    {id: 10, name: "Michael", age: 44},
    {id: 11, name: "Michael", age: 44},
    {id: 12, name: "Michael", age: 44},
    {id: 13, name: "Michael", age: 44},
    {id: 14, name: "Michael", age: 44},
    {id: 15, name: "Michael", age: 44},
    {id: 16, name: "Michael", age: 44},
    {id: 17, name: "Michael", age: 44},
    {id: 18, name: "Michael", age: 44},
    {id: 19, name: "Michael", age: 44},
    {id: 20, name: "Michael", age: 44},
    {id: 21, name: "Michael", age: 44},
    {id: 22, name: "Michael", age: 44},
    {id: 23, name: "Michael", age: 44},
    {id: 24, name: "Michael", age: 44},
    {id: 25, name: "Michael", age: 44},
    {id: 26, name: "Michael", age: 44},
    {id: 27, name: "Michael", age: 44},
    {id: 28, name: "Michael", age: 44},
    {id: 29, name: "Michael", age: 44},
    {id: 30, name: "Michael", age: 44},
    {id: 31, name: "Michael", age: 44},
    {id: 32, name: "Michael", age: 44},
    {id: 33, name: "Michael", age: 44},
    {id: 34, name: "Michael", age: 44},
    {id: 35, name: "Michael", age: 44},
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