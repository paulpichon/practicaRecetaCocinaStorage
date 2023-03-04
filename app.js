import { filtrarPorCategoria } from "./js/filtrar-por-categoria.js";
//recetas desde storage
import { mostrarFavoritos } from "./js/mostrar-favoritos.js";
import { obtenerCategorias } from "./js/obtener-categorias.js";

const iniciarApp = () => {
    //obtener y renderizar las categorias en el select
    obtenerCategorias();

    //funcion para filtrar por categoria
    filtrarPorCategoria();

    //mostrar favoritos en la pagina favoritos.html storage
    const favoritosPagina = document.querySelector('.favoritos');
    //si existe favoritosPagina quiere decir que estamos en la pagina de favoritos.html y mostramos los resultados
    if (favoritosPagina) {
        //mostrar los favoritos
        mostrarFavoritos();
    }

}


//comenzar la aplicacion
iniciarApp();