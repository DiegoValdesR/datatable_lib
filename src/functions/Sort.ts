type sorting = "asc" | "desc" | "normal"

export class Sort{
    private sortValue : sorting = "asc"
    private data : Data = []
    private sortedData : Data = []

    constructor(data: Data){
        this.data = data
    }

    public sortData(target : string){
        const temporalData = [...this.data]
        let valueType = ""

        temporalData.forEach((row) => {
            if(!row[target]){
                valueType = ""
                return
            }

            valueType = typeof row[target]
            return
        })

        switch (this.sortValue) {
            case "asc":
                this.sortValue = "desc"
                break;

            case "desc":
                this.sortValue = "normal"
                break;
            
            default:
                this.sortValue = "asc"
                break;
        }
        
        //Sorting depending of the type of the target value
        if(this.sortValue !== "normal"){
            switch (valueType) {
                case "number":
                    this.sortedData = temporalData.sort((a,b) => this.sortValue === "asc" ? a[target] - b[target] : b[target] - a[target])
                    break;

                case "string":
                    this.sortedData = temporalData.sort((a,b) => this.sortValue === "asc" ? a[target].localeCompare(b[target]) : b[target].localeCompare(a[target]))
                    break;
                
                default:
                    this.sortedData = this.data
                    break;
            }

        }else{
            this.sortedData = this.data
        }

        return this.sortedData
    }
}