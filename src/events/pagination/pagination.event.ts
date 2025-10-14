import type { IPaginationEvent } from "../../interfaces/events.interface.js";

export const paginationEvent = (params: IPaginationEvent) =>{
    const action = params.button.dataset.action;

    switch (action) {
        case "first":
            params.currentPage = 1;
        break;

        case "previous":
            if(params.currentPage <= 1) return 1;
            params.currentPage -= 1
        break;

        case "next":
            if(params.currentPage >= params.numPages) return params.numPages;
            params.currentPage += 1
        break;

        case "last":
            params.currentPage = params.numPages;
        break;

        case "changePage":
            const pageNumber = params.button.dataset.numPage
            if(!pageNumber) throw new Error("The number of the page was not found");
            params.currentPage = parseInt(pageNumber)
        break;
            
        default:
            break;
    };

    return params.currentPage;
};