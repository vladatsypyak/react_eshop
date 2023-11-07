export    function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
        return str;
    } else {
        return str.substring(0, maxLength) + "...";
    }
}

export function capitalize(str){
    return  [...str][0].toUpperCase() + [...str].slice(1).join('').toLowerCase();
}