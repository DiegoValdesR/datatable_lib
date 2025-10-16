import { Table } from "./dist/Table.js";

const request = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0')
if(!request.ok) console.error(request.status);

const data = await request.json();

const body = (rowData) => {
    return  `
        <div class="actions">
            <button type="button" data-id="${rowData.name}" id="view">
                Ver detalles
            </button>
            <button type="button" data-id="${rowData.name}" id="update">
                Actualizar
            </button>
        </div>
    `;
};

const columns = [
    { header: "NAME", field: "name"},
    { header: "URL", field: "url"},
    { header: "ACCIONES", body: body}
];

const tableObj = new Table({
    data : data.results,
    columns : columns,
});

tableObj.createTable();



