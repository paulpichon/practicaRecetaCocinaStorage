
//funcion para agregar la receta en el storage
const agregarLStorage = ( objLS ) => {
    //traer el storage 
    //en caso de que esta vacio lo declaramos como un arreglo vacio
    const favoritos = JSON.parse( localStorage.getItem('recetas') ) ?? [];
    //agregar a storage la nueva receta
    //agregamos lo que trae favoritos mas OBJLS que es la nueva receta
    localStorage.setItem('recetas', JSON.stringify( [...favoritos, objLS] ) );
    console.log( favoritos );
}



//export
export {
    agregarLStorage
}