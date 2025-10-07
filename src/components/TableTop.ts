import { Filter } from "../functions/Filter.js";
import icons from "../icons/icons.js";

export class TableTop{

    public drawTop(recordsPerPage : number){
        //We create the container for the rest of the elements
        const searchbarContainer = document.createElement("div");
        searchbarContainer.classList.add("searchbar-cont");

        //Container for the selector of the number of pages displayed per page
        const selectContainer = document.createElement("div");
        selectContainer.classList.add("select-container");
        
        //Elements for the select entries per page section
        const spanEntries = document.createElement("span");
        spanEntries.innerText = "records per page";
        const selectEntries = document.createElement("select");
        selectEntries.title = "Select an option";

        //Creating the button that clears the filters
        const clearFiltersButton = document.createElement('button')
        clearFiltersButton.type = "button"
        clearFiltersButton.classList.add('clear-filters')
        clearFiltersButton.title = "Click to clear all the active filters"
        clearFiltersButton.innerHTML = icons.clearFilters
        
        selectContainer.appendChild(clearFiltersButton);
        selectContainer.appendChild(selectEntries);
        selectContainer.appendChild(spanEntries);

        //Array with the different numbers of records per page selector
        const arrEntries = [5,10,20,50,100];

        arrEntries.forEach(num => {
            const option = document.createElement("option");
            option.value = num.toString();
            option.innerText = num.toString();

            if(num === recordsPerPage) option.selected = true;

            selectEntries.appendChild(option);
        });
    
        const inputSearch  = document.createElement("input");
        inputSearch.setAttribute("type","search");

        //Creating the corresponding events
        // selectEntries.addEventListener("change",({target}) => {
        //     const option = target as HTMLOptionElement
        //     this.recordsPerPage = parseInt(option.value)
        //     this.currentPage = 1
        //     //this.currentPage = Math.min(this.currentPage, Math.ceil(this.config.data.length / this.recordsPerPage))
        //     //Render the table body and footer content again
        //     this.update()
        //     this.drawFooter()
        // });

        // const filter = new Filter(this.config.data)
        // inputSearch.addEventListener("input",() => {
        //     this.currentPage = 1
        //     const newData = filter.filterData(inputSearch.value, "contains")
        //     this.update(newData)
        //     this.drawFooter()
        // });

        // clearFiltersButton.addEventListener('click',() => {
        //     this.mutatedData = [];
        //     filter.clearFilters(this.tableContainer);
        //     this.update();
        //     this.drawFooter();
        // })

        //Appending all the of the created elements to the main container
        searchbarContainer.appendChild(selectContainer);
        searchbarContainer.appendChild(inputSearch);

        return searchbarContainer;
    };
};