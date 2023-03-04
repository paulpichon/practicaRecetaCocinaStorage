import { limpiarHTML } from "./limpiar-html.js";
//agregar a storage
import { agregarLStorage, verificarStorage } from "./local-storage.js";
//exportar funcion para mostrar toast
import { mostrarToast } from "./mostrar-toast.js";

//fucnion para mostrar la receta en el MODAL
const obtenerRecetas = async( id ) => {
    // url
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ id }`;
    //fetch
    await fetch( url )
        .then( response => response.json() )
            .then( respuesta => mostrarReceta( respuesta.meals[0] ) )

}
//fucnion para mostrar la receta en el modal
const mostrarReceta = ( receta ) => {
    //seleccionamos el modal
    const myModal = document.getElementById('modal');
    //creamos una instancia del modal
    const modal = new bootstrap.Modal(myModal, {})

    //destructuring
    const { idMeal, strInstructions, strMeal, strMealThumb } = receta;

    //html
    //titulo del modal
    const modalTitle = document.querySelector('h1.modal-title');
    modalTitle.textContent = strMeal;
   
    //ingredientes
    const modalBody = document.querySelector('.modal-body');

    //imagen de la receta
    modalBody.innerHTML = `
        <img class="img-fluid" src="${ strMealThumb }" >
        <h2 class="fs-3 font-bold">Instrucciones</h2>
        <p>${ strInstructions }</p>
        <h2 class="fs-3 font-bold">Ingredientes</h2>
    `;

    //UL para crear un ORDER LIST
    const listGroup = document.createElement('UL');
    //agregar estilos a UL
    listGroup.classList.add('list-group');

    for (let i = 1; i < 20; i++) {
        //verificar que no esten vacios los ingredientes
        if ( receta[`strIngredient${i}`] ) {
            const ingrediente = receta[`strIngredient${i}`];
            const cantidad = receta[`strMeasure${i}`];
            
            // modalBody.textContent= `${ingredientes} - ${ cantidades }`;

            const ingredienteLi = document.createElement('LI');
            //estilos
            ingredienteLi.classList.add('list-group-item');
            //textcontent
            ingredienteLi.textContent = `${ ingrediente } - ${ cantidad }`;

            //agregamos a listGroup cada ingredienteLi
            listGroup.appendChild( ingredienteLi );

        }
    }
    //renderizamos los ingredientes
    //agregamos a modalBody el listGroup
    modalBody.appendChild( listGroup );

    //botones
    //variable que representa donde se renderizara el boton guardar favorito y de cancelar
    const modalFooter = document.querySelector('.modal-footer');


    //limpiar botones
    limpiarHTML( modalFooter );
    //BOTON FAVORITOS
    //botones de cerrar y favorito
    const btnFavorito = document.createElement('BUTTON');
    //estilos
    btnFavorito.classList.add('btn', 'btn-danger', 'col');
    //textcontent
    btnFavorito.textContent = 'Agregar Favorito';
    //agregar a favoritos
    btnFavorito.onclick = () => {
        //objeto storage
        const objLS = {
            id: idMeal,
            titulo: strMeal, 
            img: strMealThumb
        }
        
        //verificar si existe la receta en el storage
        if ( verificarStorage( objLS.id ) ) {

            //mostrar mensaje

            return;
        }

        //agregar a storage junto con el objeto
        agregarLStorage( objLS );
        
        //mostrar mensaje de agregado a favoritos
        mostrarToast('Receta agregada a Favoritos');
        

    }

    //renderizar
    modalFooter.appendChild( btnFavorito );

    //BOTON CERRAR MODAL
    //botones de cerrar y favorito
    const btnCerrarModal = document.createElement('BUTTON');
    //estilos
    btnCerrarModal.classList.add('btn', 'btn-secondary', 'col');
    //textcontent
    btnCerrarModal.textContent = 'Cerrar';
    //cerrar el modal
    btnCerrarModal.onclick = () => {
        modal.hide();
    }
    //renderizar
    //renderizar boton favoritos
    modalFooter.appendChild( btnFavorito );
    //renderizar boton cerrar modal
    modalFooter.appendChild( btnCerrarModal );


    //mostrar modal
    modal.show();
}

//EXPORTS
export {
    obtenerRecetas
}