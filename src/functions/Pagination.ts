import icons from "../icons.js";

interface IPages{
    currentPage : number
    numPages: number
};

export const drawPagination = (params : IPages) => {
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('tablelib-pagination');

    const pagesContainer = document.createElement("div");
    pagesContainer.classList.add('tablelib-pages');

    //Setting up the pagination window style
    const maxButtons = 3;
    const half = Math.floor(maxButtons / 2);
    let start = Math.max(1,params.currentPage - half);
    const end = Math.min(params.numPages, start + maxButtons - 1);
    //Re-assigning the start value with the end value
    start = Math.max(1, end - maxButtons + 1);

    //Drawing the buttons
    for(let i = start; i <= end; i++){
        const button = document.createElement('button');
        button.dataset.action = "changePage";
        button.dataset.numPage = i.toString();
        button.type = "button";
        button.title = "Click to change the number of the current page"
        button.classList.add('tablelib-button')
        button.innerText = i.toString();

        if(i === params.currentPage) button.classList.add('active');

        pagesContainer.appendChild(button);
    };

    const firstPageButton = document.createElement("button");
    firstPageButton.title = "First Page";
    firstPageButton.innerHTML = icons.first;
    firstPageButton.dataset.action = "first";

    const previousPageButton = document.createElement("button");
    previousPageButton.title = "Previous Page";
    previousPageButton.innerHTML = icons.prev;
    previousPageButton.dataset.action = "previous";

    if(params.currentPage < 2){
        firstPageButton.classList.add("disabled");
        firstPageButton.disabled = true;

        previousPageButton.classList.add('disabled');
        previousPageButton.disabled = true;
    };

    const nextPageButton = document.createElement("button");
    nextPageButton.title = "Next Page";
    nextPageButton.innerHTML = icons.next;
    nextPageButton.dataset.action = "next";

    const lastPageButton = document.createElement("button");
    lastPageButton.title = "Last Page";
    lastPageButton.innerHTML = icons.last;
    lastPageButton.dataset.action = "last";

    if(params.currentPage >= params.numPages){
        nextPageButton.classList.add('disabled');
        nextPageButton.disabled = true;

        lastPageButton.classList.add('disabled');
        lastPageButton.disabled = true;
    };

    const arrButtons = [
        firstPageButton,
        previousPageButton,
        pagesContainer,
        nextPageButton,
        lastPageButton
    ];

    arrButtons.forEach(element => {
        
        if(element instanceof HTMLButtonElement){
            element.setAttribute("type","button");
            element.classList.add("tablelib-button");
        };
        
        paginationContainer.appendChild(element);
    });

    return paginationContainer;
};