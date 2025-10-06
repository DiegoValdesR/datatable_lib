import { Table } from "./dist/Table.js";

const request = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000")
if(!request.ok){
    console.error("Error de conexión con la API")
};

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

tableObj.create("#container")

tableObj.on({
    selector: "tbody button",
    eventName: 'click',
    event : (e) => {
        const button = e.target;
        alert(button.dataset.id)
    }
})

