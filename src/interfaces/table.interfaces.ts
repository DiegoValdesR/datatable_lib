export interface ITableColumn{
    header: string
    field?: string
    body? : (rowData? : Record<string,any>) => string | HTMLElement
}

export interface ITableBody{
    data? : Data
    recordsPerPage : number
    currentPage : number
}

export interface ITableHeader{
    data? : Data
    
}

export interface ITableRow{
    offset : number
    limit: number
    data : Data
}