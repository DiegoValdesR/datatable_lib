import { drawPagination } from "../functions/pagination.js";
import type { IDrawTableFooter } from "./../interfaces/table.interface.js";

export const drawFooter = (params : IDrawTableFooter) => {
    const footerContainer = params.tableContainer.querySelector(`.tablelib-footer`) || document.createElement('div');

    if(footerContainer.innerHTML.length > 0) footerContainer.innerHTML = "";
    else footerContainer.classList.add('tablelib-footer');

    const paginationContainer = drawPagination({
        numPages: params.numPages, 
        currentPage: params.currentPage
    });

    footerContainer.appendChild(paginationContainer);

    return footerContainer;
};