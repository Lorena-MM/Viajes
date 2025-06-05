document.addEventListener('DOMContentLoaded', function() {
    const reservaForm = document.getElementById('reservaForm');
    
    // Cargar datos previos si existen
    const cargarDatosPrevios = () => {
        const reservaData = JSON.parse(localStorage.getItem('reservaData'));
        if (reservaData) {
            document.getElementById('origen').value = reservaData.origen;
            document.getElementById('destino').value = reservaData.destino;
            document.getElementById('fecha-salida').value = reservaData.fechaSalida;
            document.getElementById('fecha-vuelta').value = reservaData.fechaVuelta;
            document.getElementById('personas').value = reservaData.personas;
        }
    };
    
    // Validar fechas
    const validarFechas = (fechaSalida, fechaVuelta) => {
        if (new Date(fechaVuelta) <= new Date(fechaSalida)) {
            return {
                valido: false,
                mensaje: 'La fecha de vuelta debe ser posterior a la fecha de salida.'
            };
        }
        return { valido: true };
    };
    
    // Validar formulario completo
    const validarFormulario = (formData) => {
        const camposRequeridos = ['origen', 'destino', 'fechaSalida', 'fechaVuelta'];
        
        for (const campo of camposRequeridos) {
            if (!formData[campo]) {
                return {
                    valido: false,
                    mensaje: 'Por favor, completa todos los campos obligatorios.'
                };
            }
        }
        
        return validarFechas(formData.fechaSalida, formData.fechaVuelta);
    };
    
    // Manejar envío del formulario
    reservaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            origen: document.getElementById('origen').value,
            destino: document.getElementById('destino').value,
            fechaSalida: document.getElementById('fecha-salida').value,
            fechaVuelta: document.getElementById('fecha-vuelta').value,
            personas: document.getElementById('personas').value
        };
        
        const validacion = validarFormulario(formData);
        
        if (!validacion.valido) {
            alert(validacion.mensaje);
            return;
        }
        
        // Guardar datos en localStorage
        localStorage.setItem('reservaData', JSON.stringify(formData));
        
        // Redirigir a la página de confirmación
        window.location.href = 'confirmacion.html';
    });
    
    // Establecer fecha mínima (hoy) para los campos de fecha
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fecha-salida').min = hoy;
    document.getElementById('fecha-vuelta').min = hoy;
    
    // Actualizar fecha mínima de vuelta cuando cambia la fecha de salida
    document.getElementById('fecha-salida').addEventListener('change', function() {
        const fechaSalida = this.value;
        document.getElementById('fecha-vuelta').min = fechaSalida;
        
        // Si la fecha de vuelta es anterior a la nueva fecha de salida, resetearla
        if (document.getElementById('fecha-vuelta').value && 
            new Date(document.getElementById('fecha-vuelta').value) < new Date(fechaSalida)) {
            document.getElementById('fecha-vuelta').value = '';
        }
    });
    
    // Cargar datos previos al cargar la página
    cargarDatosPrevios();
});