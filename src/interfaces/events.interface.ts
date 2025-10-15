export interface ICustomEvent{
    selector : string
    eventName: string
    event : (event : Event, data : Data) => void
};

export interface IPaginationEvent{
    currentPage : number
    numPages: number
    button: HTMLButtonElement
};

export interface ISortingEvent{
    target : EventTarget
    data : Data
    numberOfClicks : numberOfClicks
}

