import { sortData } from "../../functions/sort.js";
import icons from "../../icons.js";
import type { ISortingEvent } from "../../interfaces/events.interface.js";

const sortingActions : Record<numberOfClicks, (button : HTMLButtonElement) => sorting > = {
    1: (button) : sorting => {
        button.innerText = icons.sortUp;
        return "desc";
    },
    2: (button) : sorting => {
        button.innerText = icons.sortDown;
        return "asc";
    }
};

export const sortingEvent = (params : ISortingEvent) => {
    const htmElement = params.target as HTMLElement;
    if(htmElement.tagName === "SELECT") return params.data;

    const element = htmElement.querySelector('th button');
    if(!element) return params.data;

    const button = element as HTMLButtonElement;
    const targetField = button.dataset.target;
    if(!targetField) return params.data;

    if(!sortingActions[params.numberOfClicks]) return params.data;
    
    const sortValue = sortingActions[params.numberOfClicks](button);

    const sortedData = sortData({
        data : params.data,
        targetField: targetField,
        sortValue: sortValue
    });

    return sortedData;
};