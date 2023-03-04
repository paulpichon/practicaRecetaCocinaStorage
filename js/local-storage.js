
//funcion para verificar si existe en el storage
const verificarStorage = ( id ) => {
    //traer el storage
    const existeStorage = JSON.parse( localStorage.getItem('recetas') ) || [];
    //buscar coincidencias por ID en caso de que haya retornara un TRUE
    return existeStorage.some( receta => receta.id === id );//true or false
}


//funcion para agregar la receta en el storage
const agregarLStorage = ( objLS ) => {

    //traer el storage 
    //en caso de que esta vacio lo declaramos como un arreglo vacio
    const favoritos = JSON.parse( localStorage.getItem('recetas') ) ?? [];
    //agregar a storage la nueva receta
    //agregamos lo que trae favoritos mas OBJLS que es la nueva receta
    localStorage.setItem('recetas', JSON.stringify( [...favoritos, objLS] ) );

}



//export
export {
    verificarStorage,
    agregarLStorage
}