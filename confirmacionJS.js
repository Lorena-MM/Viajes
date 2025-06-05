document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const resumenReserva = document.getElementById('resumenReserva');
    const totalReserva = document.getElementById('totalReserva');
    const btnPagar = document.getElementById('btnPagar');
    const btnCancelar = document.getElementById('btnCancelar');
    const btnEditar = document.getElementById('btnEditar');
    
    // Datos de la reserva
    let reservaData = JSON.parse(localStorage.getItem('reservaData'));
    
    // Mapeo de ciudades para nombres legibles
    const ciudades = {
        'madrid': 'Madrid',
        'barcelona': 'Barcelona',
        'valencia': 'Valencia',
        'sevilla': 'Sevilla',
        'bilbao': 'Bilbao',
        'paris': 'París, Francia',
        'tokyo': 'Tokio, Japón',
        'new-york': 'Nueva York, USA',
        'roma': 'Roma, Italia',
        'bali': 'Bali, Indonesia',
        'cancun': 'Cancún, México'
    };
    
    // Precios por destino
    const preciosDestinos = {
        'paris': 1200,
        'tokyo': 1800,
        'new-york': 1500,
        'roma': 1100,
        'bali': 1400,
        'cancun': 1000
    };
    
    // Función para formatear fecha
    const formatDate = (dateStr) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString('es-ES', options);
    };
    
    // Función para calcular el total
    const calcularTotal = () => {
        if (!reservaData || !reservaData.destino || !reservaData.personas) return 0;
        
        const precioBase = preciosDestinos[reservaData.destino] || 0;
        const numPersonas = parseInt(reservaData.personas) || 1;
        
        return precioBase * numPersonas;
    };
    
    // Función para mostrar los datos de la reserva
    const mostrarResumenReserva = () => {
        if (!reservaData) {
            resumenReserva.innerHTML = '<p class="text-red-500">No hay datos de reserva disponibles.</p>';
            return;
        }
        
        const html = `
            <div class="flex justify-between py-2 border-b border-gray-100">
                <span class="text-gray-600">Origen:</span>
                <span class="font-medium">${ciudades[reservaData.origen] || reservaData.origen}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-100">
                <span class="text-gray-600">Destino:</span>
                <span class="font-medium">${ciudades[reservaData.destino] || reservaData.destino}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-100">
                <span class="text-gray-600">Fecha de salida:</span>
                <span class="font-medium">${reservaData.fechaSalida ? formatDate(reservaData.fechaSalida) : 'No especificada'}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-100">
                <span class="text-gray-600">Fecha de vuelta:</span>
                <span class="font-medium">${reservaData.fechaVuelta ? formatDate(reservaData.fechaVuelta) : 'No especificada'}</span>
            </div>
            <div class="flex justify-between py-2">
                <span class="text-gray-600">Número de personas:</span>
                <span class="font-medium">${reservaData.personas || '1'}</span>
            </div>
        `;
        
        resumenReserva.innerHTML = html;
        totalReserva.textContent = `$${calcularTotal().toLocaleString('es-ES')}`;
    };
    
    // Función para manejar el pago
    const manejarPago = () => {
        // Simular procesamiento de pago
        btnPagar.disabled = true;
        btnPagar.innerHTML = '<span class="animate-pulse">Procesando pago...</span>';
        
        setTimeout(() => {
            // Simular éxito en el pago
            alert('¡Pago realizado con éxito! Hemos enviado los detalles de tu reserva por correo electrónico.');
            
            // Limpiar datos de reserva
            localStorage.removeItem('reservaData');
            
            // Redirigir a la página de inicio
            window.location.href = 'index.html';
        }, 2000);
    };
    
    // Función para manejar la cancelación
    const manejarCancelacion = () => {
        if (confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
            // Limpiar datos de reserva
            localStorage.removeItem('reservaData');
            
            // Redirigir a la página de destinos
            window.location.href = 'destinos.html';
        }
    };
    
    // Función para manejar la edición
    const manejarEdicion = () => {
        window.location.href = 'reserva.html';
    };
    
    // Verificar si hay datos de reserva
    if (!reservaData) {
        alert('No hay datos de reserva. Serás redirigido a la página de reserva.');
        window.location.href = 'reserva.html';
        return;
    }
    
    // Mostrar resumen de la reserva
    mostrarResumenReserva();
    
    // Event listeners
    btnPagar.addEventListener('click', manejarPago);
    btnCancelar.addEventListener('click', manejarCancelacion);
    btnEditar.addEventListener('click', manejarEdicion);
    
    // Mostrar enlace de confirmación en el nav
    document.getElementById('navConfirmacion').classList.remove('hidden');


    //Dejar marcado una opcion
    const paymentOptions = document.querySelectorAll('.payment-option');

    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Quitar clase activa de todas
            paymentOptions.forEach(o => o.classList.remove('border-blue-500', 'ring', 'ring-blue-300'));

            // Añadir clase activa a la seleccionada
            option.classList.add('border-blue-500', 'ring', 'ring-blue-300');

            // (Opcional) Guardar método seleccionado
            const metodoSeleccionado = option.dataset.method;
            localStorage.setItem('metodoPago', metodoSeleccionado);
        });
    });

});