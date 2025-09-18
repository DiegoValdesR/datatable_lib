type sorting = "asc" | "desc"

export class Sort{
    private sortValue : sorting = "desc"

    public sortData(data : Data, target : string){
        let valueType = ""
        data.forEach((row) => {
            if(row[target]){
                valueType = typeof row[target]
                return;
            }
        })
        
        //Sorting depending of the type of the target value
        switch (valueType) {
            case "number":
                data.sort((a,b) => this.sortValue === "asc" ? a[target] - b[target] : b[target] - a[target])
                break;

            case "string":
                data.sort((a,b) => this.sortValue === "asc" ? a[target].localeCompare(b[target]) : b[target].localeCompare(a[target]))
                break;
        
            default:
                break;
        }
        
        switch (this.sortValue) {
            case "asc":
                this.sortValue = "desc"
                break;
            
            default:
                this.sortValue = "asc"
                break;
        }
        return data
    }
}