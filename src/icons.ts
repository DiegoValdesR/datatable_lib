const getIcons = (iconName : string) : string | void =>{
    let icon
    fetch(`./icons/${iconName}.svg`)
    .then(res => res.text())
    .then(res => {
        icon = res
    })
    .catch(err => {
        console.error(err)
        return;
    })

    return icon 
}

export const icons = {
    arrowUp : getIcons("chevron-double-up"),
    arrowDown : getIcons("chevron-double-down")
}