import booksDB from './db/books.mjs'

//Hace falta escribir la lógica para crear el nuevo archivo que será la base de datos que se usará a lo largo de una feria del libro
//Implementar la lógica para crear o no el archivo o añadir o no objetos, sólo la información que se necesita
import fs from 'node:fs'

let inventario = booksDB.libros.map(libro => {
    
    let newType = 'outlet'
    let newPrice = 650
    let newExistence = 8

    return {
        "name": libro.name,
        "barcode": libro.barcode,
        "type": libro.type,
        "providor": libro.providor,
        "editorial": libro.editorial,
        "year": libro.year,
        "authors": libro.authors.toString(),
        "kind": `${newType.toString()}`,
        "price": `${newPrice}`,
        "amount": `${newExistence}`
    }


})