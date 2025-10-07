export interface IEventHandler{
    selector : string
    eventName: string
    event : (event : Event) => void
}