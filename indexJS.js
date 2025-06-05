
document.addEventListener('DOMContentLoaded', function() {
    // Ejemplo: Cambiar el estilo del menú activo
    const currentPage = location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('nav a');
    
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('font-semibold');
        }
    });
});