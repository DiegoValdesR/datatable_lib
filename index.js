import { Table } from "./dist/Table.js";

const data = [
    {id: 1, name: "Pacho", age: 18},
    {id: 2, name: "Manolo", age: 32},
    {id: 3, name: "Michael", age: 44},
    {id: 4, name: "Leonardo", age: 99},
    {id: 5, name: "Lopez", age: 12},
    {id: 6, name: "Lopez", age: 12},
    {id: 7, name: "Lopez", age: 12},
    {id: 8, name: "Lopez", age: 12},
    {id: 9, name: "Lopez", age: 12},
    {id: 10, name: "Lopez", age: 12},
    {id: 11, name: "Lopez", age: 12},
    {id: 12, name: "Lopez", age: 12},
    {id: 13, name: "Lopez", age: 12},
    {id: 14, name: "Lopez", age: 12},
]

const body = `
    <div class="actions">
        <button type="button">
            Ver detalles
        </button>
        <button type="button">
            Actualizar
        </button>
    </div>
`

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