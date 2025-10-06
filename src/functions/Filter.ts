type filterType = "contains" | "equals"

interface SelectFilter{
    data : Data
    parent: HTMLElement
    offset: number
    limit : number
    targetField? : string 
}

export class Filter{
    private data : Data = [];
    private filteredData : Data = [];

    constructor(data : Data){
        this.data = data
    };

    public filterData(searchValue : string, action : filterType){
        if(searchValue.length === 0) return this.data;
        
        this.filteredData = this.data.filter((obj) => {
            for(const key in obj){
                const strValue : string = obj[key].toString();

                switch (action) {
                    case "contains":
                        if(strValue.toLowerCase().includes(searchValue.toLowerCase())) return obj
                        break;

                    case "equals":
                        if(strValue.toLowerCase() === searchValue.toLowerCase()) return obj
                        break
                
                    default: throw new Error("Unexpected value while filtering the data")
                };
            };
        });

        return this.filteredData.length > 0 ? this.filteredData : this.data
    };

    public createSelectFilter(params : SelectFilter){
        const headers = params.parent.querySelectorAll('table thead th')
        if(!headers) throw new Error("The table does not have the 'head' section");
        const uniqueOptions : any[] = [];

        headers.forEach((th) => {
            //Checking if the select container already exists, in that case we remove it
            let selectContainer = th.querySelector(".select-container");
            if(selectContainer) th.removeChild(selectContainer);

            selectContainer = document.createElement("div");
            selectContainer.classList.add('select-cont');
            

            // for(let i = params.offset; i < params.limit; i++){
            //     const object = params.data[i];
            //     if(!object) continue;

            //     const keyValue = params.targetField ? object[params.targetField] : null;
            //     if(!keyValue) continue;

            //     if(!uniqueOptions.some(value => value === keyValue)){
            //         uniqueOptions.push(keyValue)
            //         const option = document.createElement("option");
            //         option.innerText = keyValue.toString().toUpperCase();
            //         option.value = keyValue.toString();
            //         selectFilter.appendChild(option);
            //     };
            // };        
        });
    };

    public clearFilters(parent : HTMLElement){
        const table = parent.querySelector(`table`);

        if(!table) throw new Error("The table does not exist");
        const headers = table.querySelectorAll('thead th');

        if(!headers) throw new Error("The table has no headers");

        headers.forEach((th) => {
            const select = th.querySelector("select");
            if(select) select.innerHTML = "";
        });
    };

};