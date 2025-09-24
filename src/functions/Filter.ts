type filterType = "contains" | "equals"

export class Filter{
    private data : Data = [];
    private filteredData : Data = [];

    constructor(data : Data){
        this.data = data
    };

    public filterData(searchValue : string, action : filterType){
        if(searchValue.length === 0) return this.data
        
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
};