
export class Filter{
    private data : Data = []
    private filteredData : Data = []

    constructor(data : Data){
        this.data = data
    }

    public filterData(searchValue : string){
        if(searchValue.length === 0) return this.data
        
        this.filteredData = this.data.filter((obj) => {
            for(const key in obj){
                const strValue : string = obj[key].toString()
                if(strValue.toLowerCase().includes(searchValue.toLowerCase())) return obj
            }
        })

        return this.filteredData.length > 0 ? this.filteredData : this.data
    }

    public filterBySelect(value : string){
        if(value.length === 0) return this.data
        
        this.filteredData = this.data.filter((obj) => {
            for(const key in obj){
                const strValue : string = obj[key].toString()
                if(strValue.toLowerCase() === value.toLowerCase()) return obj
            }
        })

        return this.filteredData.length > 0 ? this.filteredData : this.data
    }
    
}