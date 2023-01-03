//crear ufuncion para inicar el proyecto
function inicarApp() {
    
    //llamamos funcion para obtener las categorias
    obtenerCategorias();

    //funcion para obtener todas las categorias
    function obtenerCategorias() {
        //url para llamar todas las categorias
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        //fetchApi
        fetch(url)
            //retornamos usando el metodo de JSON
            //el return es implicito
            .then( respuesta => respuesta.json() )
            //podemos poner el resultado con cualquier nombre en este caso lo ponemos como resultado
            .then( resultado => console.log( resultado ) )

    }

}   

//inicar funcion iniciarApp()
document.addEventListener('DOMContentLoaded', inicarApp);