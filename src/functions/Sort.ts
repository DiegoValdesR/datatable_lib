interface SortingParams{
    targetField: string
    sortValue : sorting
    data : Data
}

export class Sort{
    private sortedData : Data = []

    public sortData(params : SortingParams){
        const temporalData = [...params.data]
        const target = params.targetField
        const sortValue = params.sortValue

        let valueType = ""

        temporalData.forEach((row) => {
            if(!row[target]){
                valueType = ""
                return
            }

            valueType = typeof row[target]
            return
        })

        //Sorting depending of the type of the target value
        if(params.sortValue !== "normal"){
            switch (valueType) {
                case "number":
                    this.sortedData = temporalData.sort((a,b) => sortValue === "asc" ? a[target] - b[target] : b[target] - a[target])
                    break;

                case "string":
                    this.sortedData = temporalData.sort((a,b) => sortValue === "asc" ? a[target].localeCompare(b[target]) : b[target].localeCompare(a[target]))
                    break;
                
                default:
                    this.sortedData = params.data
                    break;
            }

        }else{
            this.sortedData = params.data
        }

        return this.sortedData
    }
}