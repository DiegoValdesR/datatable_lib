import icons from "../icons.js";

export const drawTop = (recordsPerPage : number)=> {
    //We create the container for the rest of the elements
    const datatableTop = document.createElement("div");
    datatableTop.classList.add("tablelib-top");

    //Container for the selector of the number of pages displayed per page
    const selectContainer = document.createElement("div");
    selectContainer.classList.add("tablelib-select-cont");

    //Elements for the select entries per page section
    const spanEntries = document.createElement("span");
    spanEntries.innerText = "records per page";

    //Select element
    const selectEntries = document.createElement("select");
    selectEntries.classList.add("tablelib-select");
    selectEntries.title = "Select an option!";

    //Creating the button that clears the filters
    const clearFiltersButton = document.createElement('button');
    clearFiltersButton.type = "button";
    clearFiltersButton.classList.add('tablelib-button');
    clearFiltersButton.title = "Click to clear all the active filters";
    clearFiltersButton.innerHTML = icons.clearFilters;
        
    selectContainer.appendChild(clearFiltersButton);
    selectContainer.appendChild(selectEntries);
    selectContainer.appendChild(spanEntries);

    //Array with the different numbers of records per page selector
    const arrEntries = [5, 10, 20, 50, 100];

    arrEntries.forEach(num => {
        const option = document.createElement("option");
        option.value = num.toString();
        option.innerText = num.toString();

        if(num === recordsPerPage) option.selected = true;

        selectEntries.appendChild(option);
    });

    //Drawing the input for the searchbar
    const inputSearch  = document.createElement("input");
    inputSearch.classList.add("tablelib-input")
    inputSearch.placeholder = "Search anything...";
    inputSearch.setAttribute("type","search");
    inputSearch.name = "searchbar";

    datatableTop.appendChild(selectContainer);
    datatableTop.appendChild(inputSearch);

    return datatableTop;
};