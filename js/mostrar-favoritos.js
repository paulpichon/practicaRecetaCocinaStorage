import { mostrarRecetas } from "./filtrar-por-categoria.js";

const mostrarFavoritos = () => {
    //storage
    const favoritos = JSON.parse( localStorage.getItem('recetas') );

    mostrarRecetas( favoritos );

}


export { 
    mostrarFavoritos
}