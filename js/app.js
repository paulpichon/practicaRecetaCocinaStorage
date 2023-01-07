function iniciarApp() {

    //variable que representa select
    const selectCategorias = document.querySelector('#categorias');
    //añadir un listener a selectCategorias
    selectCategorias.addEventListener('change', seleccionarCategoria);

    //variable donde se renderizaran los resultados
    const resultado = document.querySelector('#resultado');
    
    //creando una instancia del modal
    //como primer parametro va el ID del modal en este caso es #modal
    //como segundo modal va un arreglo vacio que son las propiedades que se le pueden dar
    const modal = new bootstrap.Modal('#modal', {});

    //llamar funcion
    obtenerCategorias();

    //funcion cargar categorias
    function obtenerCategorias() {
        //url
        const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

        fetch( url )
            .then( respuesta => respuesta.json() )
                .then( resultado => mostrarCategorias( resultado.categories ) )
    }

    //funcion mostrar categorias en el select
    function mostrarCategorias( categorias ) {
        
        //iterar
        categorias.forEach(categoria => {
            //destruturing
            const { strCategory } = categoria;
            
            //html
            const option = document.createElement('OPTION');
            option.value = strCategory;
            option.textContent = strCategory;
            //renderizar
            selectCategorias.appendChild( option );
        });

    }

    //funcion para seleccionar una categoria
    function seleccionarCategoria( e ) {
        const categoria = e.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${ categoria }`;

        fetch( url ) 
            .then( respuesta => respuesta.json() )
                .then( resultado => mostrarRecetas( resultado.meals ) )

    }

    //funcion para renderizar las recetas al seleccionar una categoria
    function mostrarRecetas( recetas = [] ) {

        //limpiar el HTML anterior
        limpiarHTML( resultado );

        //heading para mostrar resultados o si no hay resultados
        const heading = document.createElement('h2');
        heading.classList.add('text-center', 'text-black', 'my-5');
        //operador ternario
        //en caso de que si hay resultados se muestra RESULTADOS de lo contrario NO HAY RESULTADOS
        heading.textContent = recetas.length ? 'Resultados' : 'No hay resultados';
        //renderizar
        resultado.appendChild( heading );

        //iterar sobre el arreglo de recetas
        recetas.forEach( receta => {
            //destructuring
            const { idMeal, strMeal, strMealThumb } = receta;
            //html
            //contenedor
            const recetaContenedor = document.createElement('DIV');
            recetaContenedor.classList.add('col-md-4');

            //card
            const recetaCard = document.createElement('DIV');
            recetaCard.classList.add('card', 'mb-4');

            //imagen
            const recetaImagen = document.createElement('IMG');
            recetaImagen.classList.add('card-img-top');
            recetaImagen.alt = `Imagen de la receta ${strMeal}`;
            recetaImagen.src = strMealThumb;

            //card body
            const recetaCardBody = document.createElement('DIV');
            recetaCardBody.classList.add('card-body');

            //heading
            const recetaHeading = document.createElement('H3');
            recetaHeading.classList.add('card-title', 'mb-3');
            recetaHeading.textContent = strMeal;

            //button
            const recetaButton = document.createElement('BUTTON');
            recetaButton.classList.add('btn', 'btn-danger', 'w-100');
            recetaButton.textContent = 'Ver Receta';
            
            //para llamar al modal
            //recetaButton.dataset.bsTarget = "#modal";
            //recetaButton.dataset.bsToggle = "modal";

            //agregar un onclick
            //callback
            recetaButton.onclick = function() {
                //funcion con argumento del idMeal
                seleccionarReceta( idMeal );
            }            

            
            //recetaCardBody
            //heading
            recetaCardBody.appendChild( recetaHeading );
            //button
            recetaCardBody.appendChild( recetaButton );

            //recetaCard
            recetaCard.appendChild( recetaImagen );
            recetaCard.appendChild( recetaCardBody );

            //contenedor
            recetaContenedor.appendChild( recetaCard );

            //renderizar en el html
            resultado.appendChild( recetaContenedor );

        });
    }

    //funcion para seleccionar ID de la receta
    function seleccionarReceta( id ) {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ id }`;

        fetch( url )
            .then( respuesta => respuesta.json() )
                .then( resultado => mostrarRecetaModal(resultado.meals[0]) )
    }

    //funcion para mostrar la receta en el modal
    function mostrarRecetaModal( receta ) {
        //destructuring
        const { idMeal, strInstructions, strMeal, strMealThumb } = receta;
        
        //añadir contenido al modal
        //seleccionando algunos selectores del HTML
        const modalTitle = document.querySelector('.modal .modal-title');
        const modalBody = document.querySelector('.modal .modal-body');

        //Titulo del modal
        modalTitle.textContent = strMeal;
        //cuerpo del modal
        modalBody.innerHTML = `
            <img class="img-fluid" src="${ strMealThumb }" alt="Receta ${strMeal}" >
            <h3 class="my-3">Instrucciones</h3>
            <p>${strInstructions}</p>
            <h3 class="my-3">Ingredientes y Cantidades</h3>
        `;

        const listGroup = document.createElement('UL');
        listGroup.classList.add('list-group');

        //mostrar ingredientes y cantidades
        //con un for iteramos sobre los 20 ingredientes que trae la API
        for( let i = 1; i <= 20; i++ ){
            //si receta[`strIngredient${i}`] viene con un valor entonces se muestra 
            if (receta[`strIngredient${i}`]) {
                //variables ingredientes
                const ingrediente = receta[`strIngredient${i}`];
                //cantidades
                const cantidad = receta[`strMeasure${i}`];

                //crear html
                const ingredienteLi = document.createElement('LI');
                ingredienteLi.classList.add('list-group-item');
                ingredienteLi.textContent = `${ingrediente} - ${cantidad}`;

                //se agrega ingredienteLi a listGroup
                listGroup.appendChild( ingredienteLi );
            }
        }

        //agregar la lista de ingredientes y cantidades a modalBody
        modalBody.appendChild( listGroup );


        //variable
        const modalFooter = document.querySelector('.modal-footer');
        //limpiar el modal footer para que no se agreguen cada qeu se abra un modal mas botones
        limpiarHTML(modalFooter);

        //botones de cerrar y favorito
        const btnFavorito = document.createElement('BUTTON');
        btnFavorito.classList.add('btn', 'btn-danger', 'col');
        btnFavorito.textContent = 'Guardar Favorito';

        //agregar a favorito
        btnFavorito.onclick = function () {
            //comprobar si existe una receta repetida
            //si existe la receta ya no se agrega la receta
            //pero si no existe se salta el if y agrega la receta
            if (existeStorage( idMeal )) {
                return;
            }

            //se pasa como argumento un objeto con informacion de la receta seleccionada
            agregarFavorito({
                id: idMeal,
                titulo: strMeal,
                img: strMealThumb
            });
        }


        const btnCerrarModal = document.createElement('BUTTON');
        btnCerrarModal.classList.add('btn', 'btn-secondary', 'col');
        btnCerrarModal.textContent = 'Cerrar';
        //cerrar modal presionando el boton
        btnCerrarModal.onclick = function() {
            //cerrar modal
            modal.hide();
        }

        //renderizar
        modalFooter.appendChild(btnFavorito);
        modalFooter.appendChild(btnCerrarModal);

        //muestra el modal
        modal.show();
    }
    //funcion para agregar Favorito
    //se pasa como parametro el objeto
    function agregarFavorito( receta ) {
        //local storage
        //obtenemos las recetas almacenadas
        //Nullish coalescing operator ---> ??
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        //convertimos el arreglo con stringify
        localStorage.setItem('favoritos', JSON.stringify([...favoritos, receta]));
    }
    //funcion para verificar que no haya una receta repetida en el storage
    function existeStorage(id) {
        //obtenemos las recetas almacenadas en storage
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        //retornamos mediante un some()
        return favoritos.some( favorito => favorito.id === id );
    }


    //funcion para limpiar el HTML anterior
    //se pasa como paramtro el selector de donde queremos que limpie
    function limpiarHTML( selector ) {
        while( selector.firstChild ) {
            selector.removeChild( selector.firstChild );
        }
    }
    

}


document.addEventListener('DOMContentLoaded', iniciarApp);