interface Config{
    tableId : string
    numPages : number
    currentPage : number
}

export class Pagination{
    private config : Config

    constructor({numPages, currentPage, tableId} : Config){
        this.config = {
            numPages: numPages,
            currentPage: currentPage,
            tableId: tableId
        }
    }

    public drawPagination(){
        const paginationContainer = document.createElement('div')
        paginationContainer.classList.add('pagination-cont')

        const pagesContainer = document.createElement("div")
        pagesContainer.classList.add('pages-cont') 

        const firstPageButton = document.createElement("button")
        firstPageButton.dataset.action = "first"

        const previousPageButton = document.createElement("button")
        previousPageButton.dataset.action = "previous"
        previousPageButton.innerHTML = "<i class='fa-solid fa-arrow-left'></>"

        const nextPageButton = document.createElement("button")
        nextPageButton.dataset.action = "next"

        const lastPageButton = document.createElement("button")
        lastPageButton.dataset.action = "last"

        const arrButtons = [firstPageButton,previousPageButton,pagesContainer,nextPageButton,lastPageButton]

        arrButtons.forEach(element => paginationContainer.appendChild(element))

        return paginationContainer
    }

    public updatePagination(){
        const footer = document.querySelector(`#${this.config.tableId} .datatable-footer`)
        if(!footer) return;

        footer.innerHTML = ""
    }
}