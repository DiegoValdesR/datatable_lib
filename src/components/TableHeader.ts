import icons from "../icons/icons.js";
import { ITableColumn } from "../interfaces/table.interfaces.js";

export class TableHeader{
    private columns : ITableColumn[] = [];

    constructor(columns : ITableColumn[]){
        this.columns = columns;
    };

    public drawHeader(){
        if(!this.columns || this.columns.length < 1) throw new Error("The headers were not send");
        const thead = document.createElement("thead");
        const headerCells = this.drawHeaderCells();
        const tr = document.createElement("tr");
        headerCells.forEach((th) => tr.appendChild(th));
        thead.appendChild(tr);

        //Click event for sorting
        thead.addEventListener('click',({target}) => {
            const targetClicked = target as HTMLElement;
            const closestBtn = targetClicked.closest('button');

            if(!closestBtn) return; 

            console.log(closestBtn);
        });

        return thead;
    };

    private drawHeaderCells(){
        const headCells : HTMLTableCellElement[] = [];

        this.columns.forEach((column) => {
            const headerContainer = document.createElement('div');
            headerContainer.classList.add('header-cont');

            const th = document.createElement("th");

            //Span with the name of the column
            const spanHeader = document.createElement("span");
            spanHeader.innerText = column.header;
            
            //Sorting button
            const sortButton = document.createElement('button')
            sortButton.type = "button";
            sortButton.innerHTML = icons.sortDown;
            
            headerContainer.appendChild(spanHeader);
            headerContainer.appendChild(sortButton);

            th.appendChild(headerContainer);

            headCells.push(th);
        });

        return headCells;
    };

};