import { Pagination } from "./../functions/Pagination.js";
import type { IDrawTableFooter } from "./../interfaces/table.interface.js";

export const drawFooter = (params : IDrawTableFooter) => {
    const paginationObj = new Pagination();
    const footerContainer = params.tableContainer.querySelector(`.datatable-footer`) || document.createElement('div');

    if(footerContainer.innerHTML.length > 0) footerContainer.innerHTML = "";
    else footerContainer.classList.add('datatable-footer');

    const paginationContainer = paginationObj.drawPagination({
        numPages: params.numPages, 
        currentPage: params.currentPage
    });

    footerContainer.appendChild(paginationContainer);

    return footerContainer;
};