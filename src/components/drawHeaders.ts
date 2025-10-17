import icons from "../icons.js";
import type { IDrawTableHeader, ISelectOptions } from "./../interfaces/table.interface.js";

export const drawHeaders = (params : IDrawTableHeader) => {
    const thead = params.table.querySelector("thead") || document.createElement('thead');

    //If the element already exists, we only redraw the select options elements
    if(thead.innerHTML.length > 0) thead.innerHTML = "";

    const tr = document.createElement('tr');

    params.columns.forEach((column) => {
        const targetField = column.field;

        const th = document.createElement("th");

        const headerContainer = document.createElement('div');
        headerContainer.classList.add('header-cont');

        const spanHeader = document.createElement("span");
        spanHeader.innerText = column.header;

        headerContainer.appendChild(spanHeader);
        th.appendChild(headerContainer);

        if(targetField){
            //Creating the buttons for the sorting feature
            const buttonOrder = document.createElement("button");
            buttonOrder.type = "button";
            buttonOrder.title = "Sort elements";
            buttonOrder.classList.add("sort");
            buttonOrder.innerHTML = icons.sortDown;
            buttonOrder.dataset.target = targetField;

            //Creating the select element for filter feature
            const selectFilter = document.createElement("select");
            selectFilter.title = "Select an option";
            selectFilter.name = "select-filter";

            //Creating the select options for each column
            const uniqueOptions = drawSelectOptions({
                data: params.data,
                offset: params.offset,
                limit: params.limit,
                targetField: targetField
            });

            uniqueOptions.forEach(value => selectFilter.appendChild(value));

            headerContainer.appendChild(buttonOrder);
            th.appendChild(selectFilter);
        };
        
        tr.appendChild(th);
    });

    thead.appendChild(tr);
    return thead;
};

export const drawSelectOptions = (params : ISelectOptions) => {
    const options : HTMLOptionElement[] = [];
    const values : string[] = [];

    for(let i = params.offset; i < params.limit; i++){
        const object = params.data[i];
        if(!object) continue;

        const keyValue = object[params.targetField];

        if(!values.some(value => value === keyValue)){
            const option = document.createElement("option");
            option.innerText = keyValue.toUpperCase();
            option.value = keyValue;
            options.push(option);
        };
    };

    return options;
};