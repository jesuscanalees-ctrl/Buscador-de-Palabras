import Swal from 'sweetalert2';

export const msj_error = (mensaje) => {
    Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: mensaje,
        confirmButtonText: 'Aceptar'
    });
};

export const msj_exito = (mensaje) => {
    Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: mensaje,
        confirmButtonText: 'Aceptar'
    });
};
