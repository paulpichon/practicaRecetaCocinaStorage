//crear ufuncion para inicar el proyecto
function iniciarApp() {

    //variable que representa el input donde se mostraran las categorias 
    const selectCategorias = document.querySelector('#categorias');

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
            //pasamos el resultado a la funcion para mostrarCategorias
            .then( resultado => mostrarCategorias( resultado.categories ) )

    }

    //funcion para mostrarCategorias
    //le pasamos como parametro las categorias y lo definimos como un arreglo vacio
    function mostrarCategorias( categorias = []) {
        //meidante un foreach accedemos a cada uno de los elementos
        categorias.forEach( categoria => {
            //destructuring
            const {strCategory} = categoria;
            //crear el html del option
            const option = document.createElement('OPTION');
            //valor del option que se va a leer una vez el usuario haya elegido una option
            option.value = strCategory;
            //textcontent
            option.textContent = strCategory;
            //renderizar
            selectCategorias.appendChild( option );


        });
    }
}   

//inicar funcion iniciarApp()
document.addEventListener('DOMContentLoaded', iniciarApp);