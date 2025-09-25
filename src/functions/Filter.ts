type filterType = "contains" | "equals"

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

    public clearFilters(tableId : string){
        const table = document.querySelector(`#${tableId}`);

        if(!table) throw new Error("The table with the id: "+ tableId + " could not be found");
        const headers = table.querySelectorAll('thead th');

        if(!headers) throw new Error("The table has no headers");

        headers.forEach((th) => {
            const select = th.querySelector("select");
            if(select){
                select.innerHTML = ""
            };

        });


    }
};