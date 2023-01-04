function iniciarApp() {

    //variable que representa select
    const selectCategorias = document.querySelector('#categorias');
    //añadir un listener a selectCategorias
    selectCategorias.addEventListener('change', seleccionarCategoria);

    //variable que representa donde se mostraran las recetas
    const resultado = document.querySelector('#resultado');

    //llamar funcion
    cargarCategorias();

    //funcion cargar categorias
    function cargarCategorias() {
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

    //funcion para mostrar recetas
    function mostrarRecetas( recetas = []) {
        //iterar el arreglo de recetas
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
            recetaImagen.alt = `La imagen de la receta ${strMeal}`;
            recetaImagen.src = strMealThumb;

            /***************CARD BODY****************/
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

            //inyectar en el codigo HTML
            recetaCardBody.appendChild( recetaHeading );
            recetaCardBody.appendChild( recetaButton );

            //receta card
            recetaCard.appendChild( recetaImagen );
            recetaCard.appendChild( recetaCardBody );

            //agregar al contenedor principal
            recetaContenedor.appendChild( recetaCard );

            //renderizar
            resultado.appendChild( recetaContenedor );

        });
    }

}


document.addEventListener('DOMContentLoaded', iniciarApp);
