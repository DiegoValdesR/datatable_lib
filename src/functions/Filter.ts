type filterType = "contains" | "equals";

interface IFilterData{
    searchValue : string
    action : filterType
    data : Data
}

export const filterData = (params : IFilterData) => {
    if(params.searchValue.length === 0) return params.data;
        
    const filteredData = params.data.filter((obj) => {
        for(const key in obj){
            const strValue : string = obj[key].toString();

            switch (params.action) {
                case "contains":
                    if(strValue.toLowerCase().includes(params.searchValue.toLowerCase())) return obj;
                break;

                case "equals":
                    if(strValue.toLowerCase() === params.searchValue.toLowerCase()) return obj;
                break;
                
                default: throw new Error("Unexpected value while filtering the data");
            };
        };
    });

    return filteredData.length > 0 ? filteredData : params.data;
};