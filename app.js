import { filtrarPorCategoria } from "./js/filtrar-por-categoria.js";
import { obtenerCategorias } from "./js/obtener-categorias.js";

const iniciarApp = () => {
    //obtener y renderizar las categorias en el select
    obtenerCategorias();

    //funcion para filtrar por categoria
    filtrarPorCategoria();

}















//comenzar la aplicacion
iniciarApp();