//funcion para limpiar el HTML nterior
export const limpiarHTML = ( selector ) => {
    while ( selector.firstChild ) {
        selector.removeChild( selector.firstChild );
    }
}

