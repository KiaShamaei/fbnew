import API from "API";

function search(value: string, onIsinSelect: (isin: string, name: string) => void, button: any) {
    API.get(`/instrument/search/${value}`).then((res) => {
        const data = res.data.data;
        dropdown(data, onIsinSelect, button);
    })
}

function dropdown(items: any[], onIsinSelect: (isin: string, name: string) => void, button: any) {
    let itemsElements = button.children[2];
    items.forEach((symbol) => {
        const li = document.createElement('li')
        li.style.padding  = '8px';
        li.onclick = function() {
            onIsinSelect(symbol[0], symbol[1]);
        }
        li.innerText = symbol[1];
        itemsElements.appendChild(li)
    })
    return itemsElements
}

export function craeteSearch(button: any) {
    const input = document.createElement('input');
    input.onchange = (ev: any) => {
        const value = ev.target.value;
        search(value, () => {}, button);
    };
    const list = document.createElement('ul')
    list.style.left = '15%';
    list.style.position = 'fixed';
    list.style.top = '25px';
    list.style.width = '250px';
    list.style.overflowY = 'auto';
    list.style.height = '350px';
    list.style.backgroundColor = '#fff';

    list.id = 'list';
    button.appendChild(input);
    button.appendChild(list);
} 