function iniciarApp() {

    //variable que representa select
    const selectCategorias = document.querySelector('#categorias');
    //añadir un listener a selectCategorias
    selectCategorias.addEventListener('change', seleccionarCategoria);

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

    //funcion para limpiar el HTML anterior
    //se pasa como paramtro el selector de donde queremos que limpie
    function limpiarHTML( selector ) {
        while( selector.firstChild ) {
            selector.removeChild( selector.firstChild );
        }
    }
    

}


document.addEventListener('DOMContentLoaded', iniciarApp);
