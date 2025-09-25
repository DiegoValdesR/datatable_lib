interface SortingParams{
    targetField: string
    sortValue : sorting
}

export class Sort{
    private sortedData : Data = []
    private data : Data = []

    constructor(data : Data){
        this.data = data
    };

    public sortData(params : SortingParams){
        const temporalData = [...this.data]
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
                    this.sortedData = this.data
                    break;
            }

        }else{
            this.sortedData = this.data
        }

        return this.sortedData
    };
    
};