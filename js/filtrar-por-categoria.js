//funcion para mostrar a receta en el modal
import { obtenerRecetas } from "./receta-modal.js";
//funcion para limpiar el HTML anterior
import { limpiarHTML } from "./limpiar-html.js";


//funcion para filtrar por categoria
const filtrarPorCategoria = () => {
    //select categorias
    const selectCategorias = document.querySelector('#categorias');
    //listener
    if (selectCategorias) {
        selectCategorias.addEventListener('change', buscarPorCategoria);
    }

}

//fucnion para seleccionar la categoria clickeada
const buscarPorCategoria = async( e ) => {
    //categoria
    const categoria = e.target.value;

    //consultar API
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${ categoria }`;
    //fetch
    try {
        await fetch( url )
        .then( response => response.json() )
            .then( data => mostrarRecetas( data.meals ) )
    } catch (error) {
        console.log( error );
    }
}
//funcion para renderizar las recetas
//podemos poner recetas como un arreglo vacio
const mostrarRecetas = ( recetas = [] ) => {
    //donde se mostraran los resultados
    const resultado = document.querySelector('#resultado');

    //limpiar el HTML anterior
    limpiarHTML( resultado );

    //iterar sobre el arreglo para acceder a cada receta
    recetas.forEach( receta => {
        //destructuring
        const { idMeal, strMeal, strMealThumb } = receta;

        //html
        //construir el html
        const recetaContenedor = document.createElement('DIV');
        //estilos
        recetaContenedor.classList.add('col-md-4');
        //card
        const recetaCard = document.createElement('DIV');
        //estilos
        recetaCard.classList.add('card', 'mb-4');
        //imagen
        const recetaImagen = document.createElement('IMG');
        //estilos
        recetaImagen.classList.add('card-img-top');
        //imagen alt
        recetaImagen.alt = `La imagen de la receta es ${ strMeal ?? receta.titulo  }`;
        //imagen src
        recetaImagen.src = strMealThumb ?? receta.img;

        
        //body del card
        const recetaCardBody = document.createElement('DIV');
        //estilos
        recetaCardBody.classList.add('card-body');

        //heading
        const recetaHeading = document.createElement('H3');
        //estilos
        recetaHeading.classList.add('card-title', 'mb-3');
        //textcontent
        //si viene desde la API muestra strMeal o desde si viene de localstorage muestra receta.title
        recetaHeading.textContent = strMeal ?? receta.titulo;


        //button de enlace
        const recetaButton = document.createElement('BUTTON');
        //estilos
        recetaButton.classList.add('btn', 'btn-danger', 'w-100');
        //textcontent
        recetaButton.textContent = 'Ver Receta';
        //llama un o unas funcion dentro de un archivo de javasctipt en este caso = data-bs-toggle="modal"
        //recetaButton.dataset.bsToggle = 'modal';
        recetaButton.onclick = function() {
            obtenerRecetas( idMeal ?? receta.id );
        }

        //inyectar en el html
        //heading
        recetaCardBody.appendChild( recetaHeading );
        //button
        recetaCardBody.appendChild( recetaButton );
        
        //receta card
        //imagen
        recetaCard.appendChild( recetaImagen );
        //cardbody
        recetaCard.appendChild( recetaCardBody );

        //card completo
        recetaContenedor.appendChild( recetaCard );

        //renderizar
        resultado.appendChild( recetaContenedor );

    });


}


export {
    filtrarPorCategoria,
    mostrarRecetas
}