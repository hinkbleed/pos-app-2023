import booksDBPoli231 from './db/uevents.mjs/poli231.mjs'

const invTable = document.getElementById('invTable');


export function createInvForm() {

    let id = 1;
    booksDBPoli231.libros.forEach(libro => {
        invTable.innerHTML += `
        <div class="storage-item">
                <div class="stg-item-prop item-list-option">${id}</div>
                <div class="stg-item-prop item-name">${libro.name}</div>
                <div class="stg-item-prop item-barcode">${libro.barcode}</div>
                <div class="stg-item-prop item-spec">${libro.kind}</div>
                <div class="stg-item-prop item-providor">${libro.providor}</div>
                <div class="stg-item-prop item-price">${libro.price}</div>
                <div class="stg-item-prop last-item-inserc">${obtenerFechaActual()}</div>
                <div class="stg-item-prop item-init-cant">${libro.amount}</div>
                <div class="stg-item-prop item-current-cant">${libro.amount > 0 ? libro.amount : 'Agotado'}</div>
            </div>
        `
    
        id++;
    });

}

function obtenerFechaActual() {
    const fecha = new Date();
    return `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`;
}