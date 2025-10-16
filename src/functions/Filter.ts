type filterType = "contains" | "equals";

interface IFilterData{
    searchValue : string
    action : filterType
    data : Data
}

type filterActionsParams = {
    value : string
    searchValue : string
}

const filterActions : Record<filterType, (params : filterActionsParams) => boolean> = {
    contains : ({value ,searchValue}) => {
        if(value.toLowerCase().includes(searchValue.toLowerCase())) return true;
        return false;
    },
    equals : ({value, searchValue}) => {
        if(value.toLowerCase() === searchValue.toLowerCase()) return true;
        return false
    }
};

export const filterData = (params : IFilterData) => {
    if(params.searchValue.length === 0) return params.data;
        
    const filteredData = params.data.filter((obj) => {
        for(const key in obj){
            const strValue : string = obj[key].toString();

            if(!filterActions[params.action]) return;

            const action = filterActions[params.action]({
                searchValue: params.searchValue,
                value: strValue
            });

            if(action) return obj;

        };
    });

    return filteredData.length > 0 ? filteredData : params.data;
};