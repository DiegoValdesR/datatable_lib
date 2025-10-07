import { Pagination } from "../functions/Pagination.js";
import { ITableFooter } from "../interfaces/table.interfaces.js";
import { TableBody } from "./TableBody.js";

export class TableFooter{
    private tableContainer : HTMLDivElement;

    constructor(tableContainer : HTMLDivElement){
        this.tableContainer = tableContainer;
    };

    public drawFooter(params : ITableFooter){
        //Drawing the pagination
        const paginationObj = new Pagination();
        const oldPag = this.tableContainer.querySelector(`.pagination-cont`);

        //If the pagination of a table already exists, then we just remove all of it's content and replaced it with the new pagination
        if(oldPag){
           oldPag.innerHTML = ""
           const newPag = paginationObj.drawPagination({
                numPages: params.numPages, 
                currentPage: params.currentPage
           });
           oldPag.innerHTML = newPag.innerHTML;
           return;
        };

        const paginationContainer = paginationObj.drawPagination({
            numPages: params.numPages, 
            currentPage: params.currentPage
        });


        //Pagination events
        paginationContainer.addEventListener('click',({target}) => {
            const targetElement = target as HTMLElement;
            if(!targetElement) return;

            const button = targetElement.closest("button");
            if(!button) return;

            const dataAction = button.dataset.action;
            if(!dataAction) return;
            
            switch (dataAction) {
                case "first":
                    if(params.currentPage === 1) return;
                    params.currentPage = 1;
                    break;

                case "previous":
                    if(params.currentPage <= 1) return;
                    params.currentPage -= 1
                    break;

                case "next":
                    if(params.currentPage >= params.numPages) return;
                    params.currentPage += 1
                    break;

                case "last":
                    if(params.currentPage < 1 || params.currentPage >= params.numPages) return;
                    params.currentPage = params.numPages
                    break;

                case "changePage":
                    const pageNumber = button.dataset.numPage
                    if(!pageNumber) throw new Error("The number of the page was not found");
                    params.currentPage = parseInt(pageNumber)
                    break;
            
                default:
                    break;
            };
        });

        return paginationContainer;
    };
}