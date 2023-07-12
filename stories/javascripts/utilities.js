

export function svgHandler(svg){
    let icon = document.createElement('svg');
    icon.innerHTML = svg;
    icon = icon.firstChild;
    console.log(icon);
    return icon;
}   