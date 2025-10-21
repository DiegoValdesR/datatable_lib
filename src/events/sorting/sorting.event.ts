import { sortData } from "../../functions/sort.js";
import icons from "../../icons.js";
import type { ISortingEvent } from "../../interfaces/events.interface.js";

const sortingActions : Record<numberOfClicks, (button : HTMLButtonElement) => sorting > = {
    1: (button) : sorting => {
        button.innerHTML = icons.sortUp;
        return "desc";
    },
    2: (button) : sorting => {
        button.innerHTML = icons.sortDown;
        return "asc";
    },
    3: (button) => {
        button.innerHTML = icons.sortNormal;
        return "normal";
    }
};

export const sortingEvent = (params : ISortingEvent) => {
    const htmlElement = params.target as HTMLElement;
    const th = htmlElement.closest('th');
    if(!th || htmlElement.tagName.toLowerCase() === "select") return;

    const closestButton = th.querySelector('button');
    if(!closestButton) return;

    const targetField = closestButton.dataset.target;
    if(!targetField) return;

    const sortValue = sortingActions[params.numberOfClicks](closestButton);
    const data = params.numberOfClicks >= 3 ? params.data : params.mutadedData;

    const sortedData = sortData({
        data : data,
        targetField: targetField,
        sortValue: sortValue
    });

    return sortedData;
};