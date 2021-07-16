import Swal from 'sweetalert2';

// Common configs
const alerts = Swal.mixin({
    confirmButtonColor: '#18A0FB',
    cancelButtonColor: '#db5752'
});

const notifications = Swal.mixin({
    toast: true,
    padding: '0.5rem',
    position: 'top-end',
    showConfirmButton: false,
    width: '30%'
});

// Success alert
// Alert.success(titulo, texto, OPCIONAL texto_boton_confirmacion (DEFAULT: OK))
const success = (title, text, confirmButtonText = 'OK') => {
    alerts.fire({
        title,
        text,
        icon: 'success',
        confirmButtonText
    });
}
// Error alert
// Alert.error(titulo, texto, OPCIONAL texto_boton_confirmacion (DEFAULT: Volver))
const error = (title, text, confirmButtonText = 'Volver') => {
    alerts.fire({
        title,
        text,
        icon: 'error',
        confirmButtonText
    });
}
// Confirm alert
// Alert.confirm(titulo, texto, OPCI0NAL texto_boton_confirmacion? (DEFAULT: Seguro), OPCIONAL texto_al_confirmar? (DEFAULT: Hecho))
const confirm = async (title, text, confirmButtonText = 'Yes', doneText = 'Done') => {
    return alerts.fire({
        title,
        text,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText: 'Cancel',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            return true;
        } else
            return false;
    })
}
// confirm example
/* Alert.confirm('Esta seguro de eliminar esto?', 'Esta accion no puede deshacerse', 'Estoy seguro')
        .then((result) => {
          if(result){
            console.log('Fue eliminado');
            ...acciones al confirmar
          }else{
            console.log('No se elimino');
            ...accciones al cancelar
          }
        });
*/

// Notificación permanente
// Alert.notify(titulo, OPCIONAL icono_error? (DEFAULT: false))
const notify = (title, error = false) => {
    notifications.fire({
        title,
        showCloseButton: true,
        icon: error ? 'error' : 'success'
    });
}

// Notificacion temporal
// Alert.tempNotify(titulo, OPCIONAL icono_error? (DEFAULT: false))
const tempNotify = (title, error = false) => {
    notifications.fire({
        title,
        icon: error ? 'error' : 'success',
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
}


const Alert = {
    success,
    error,
    confirm,
    notify,
    tempNotify
}


export default Alert;