//funcion para obtener las cartegorias y mostrarlas en el SELECT
const obtenerCategorias = async() => {
    //consultar la API
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    //fetch
    await fetch( url )
                .then( response => response.json() )
                    .then( data => mostrarCategoriasSelect( data.categories ) )
    
}
//renderizar las caetgorias en el SELECT
const mostrarCategoriasSelect = ( categorias ) => {
    //select
    const selectCategorias = document.querySelector('#categorias');
    // si existe selectCategorias
    if (selectCategorias) {
        categorias.forEach( categoria => {
            //destructuring
            const { strCategory } = categoria;
            //html
            const option = document.createElement('OPTION');
            option.value = strCategory;
            option.textContent = strCategory;
    
            //renderizar
            selectCategorias.appendChild( option );
    
        });   
    }

}
//exports
export { 
    obtenerCategorias 
}
