
//funcion para filtrar por categoria
const filtrarPorCategoria = () => {
    //select categorias
    const selectCategorias = document.querySelector('#categorias');
    //listener
    selectCategorias.addEventListener('change', buscarPorCategoria);

}

//fucnion para seleccionar la categoria clickeada
const buscarPorCategoria = async( e ) => {
    //categoria
    const categoria = e.target.value;

    //consultar API
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${ categoria }`
    console.log( url );
    //fetch
    try {
        await fetch( url )
        .then( response => response.json() )
            .then( data => console.log( data.meals ) )
    } catch (error) {
        console.log( error );
    }
}



export {
    filtrarPorCategoria
}