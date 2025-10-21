interface ISortingParams{
    sortValue : sorting
    data : Data
    targetField : string
}

export const sortData = (params : ISortingParams) => {
    const unsortedData = [...params.data];
    const target = params.targetField;
    const sortValue = params.sortValue;
    let typeofValue = "";

    unsortedData.forEach((row) => {
        if(!row[target]) return;
        typeofValue = typeof row[target];
    });

    //Sorting depending of the type of the target value
    if(typeofValue.length === 0 || sortValue === "normal") return unsortedData;

    let sortedData : Data = [];
    
    switch (typeofValue) {
        case "number":
            sortedData = unsortedData.sort((a,b) => sortValue === "asc" ? a[target] - b[target] : b[target] - a[target]);
        break;

        case "string":
            sortedData = unsortedData.sort((a,b) => sortValue === "asc" ? a[target].localeCompare(b[target]) : b[target].localeCompare(a[target]));
        break;
                
        default:
            break;
    };

    return sortedData
};