export interface IColumn{
    header: string
    field?: string
    body? : (rowData? : Record<string, any>) => string | HTMLElement
};

export interface ITable {
    data : Data
    columns : IColumn[]
};

export interface IDrawTableBody{
    data : Data
    columns : IColumn[]
    table : HTMLTableElement
    offset : number
    limit : number
};

export interface IDrawTableFooter{
    tableContainer : HTMLElement
    numPages : number
    currentPage : number
}

export interface IDrawTableHeader{
    columns : IColumn[]
    data : Data
    offset : number
    limit : number
    table: HTMLTableElement
}

export interface ISelectOptions{
    data : Data
    offset : number
    limit : number
    targetField : string
}