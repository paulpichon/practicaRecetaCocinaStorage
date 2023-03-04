
const mostrarToast = ( mensaje ) => {
    //creamos instancias
    let myToastEl = document.getElementById('toast')
    let myToast = bootstrap.Toast.getOrCreateInstance(myToastEl) // Returns a Bootstrap toast instance bootstrap 5
    
    //
    const toastBody = document.querySelector('.toast-body');
    toastBody.textContent = mensaje;

    myToast.show();
}

//exportar 
export {
    mostrarToast
}