// Service Worker Registration para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(registration => {
            console.log('Service Worker registrado:', registration);
        }).catch(error => {
            console.log('Error al registrar Service Worker:', error);
        });
    });
}

// Manejo del formulario de contacto
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Obtener los datos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const asunto = document.getElementById('asunto').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    
    // Validaciones básicas
    if (!nombre || !email || !asunto || !mensaje) {
        mostrarMensaje('Por favor, completa todos los campos', 'error');
        return;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarMensaje('Por favor, ingresa un email válido', 'error');
        return;
    }
    
    // Simular envío de email (en producción usarías un servicio backend)
    try {
        // Aquí se puede integrar un servicio de email como EmailJS o tu propio backend
        await enviarEmail({
            nombre: nombre,
            email: email,
            asunto: asunto,
            mensaje: mensaje,
            fecha: new Date().toLocaleString('es-ES')
        });
        
        mostrarMensaje('¡Mensaje enviado exitosamente! Me pondré en contacto pronto.', 'success');
        contactForm.reset();
    } catch (error) {
        mostrarMensaje('Error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
        console.error('Error:', error);
    }
});

// Función para mostrar mensajes
function mostrarMensaje(texto, tipo) {
    formMessage.textContent = texto;
    formMessage.className = `form-message ${tipo}`;
    formMessage.style.display = 'block';
    
    // Desaparecer el mensaje después de 5 segundos
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Función para enviar email (integración con servicio backend)
async function enviarEmail(datos) {
    // Opción 1: Usando EmailJS (requiere cuenta gratuita)
    // Descomentar y configurar si usas EmailJS
    
    /*
    await emailjs.send('service_id', 'template_id', {
        to_email: 'tu_email@ejemplo.com',
        from_name: datos.nombre,
        from_email: datos.email,
        subject: datos.asunto,
        message: datos.mensaje,
        date: datos.fecha
    });
    */
    
    // Opción 2: Usando tu propio backend
    // const response = await fetch('/api/send-email', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(datos)
    // });
    // return response.json();
    
    // Opción 3: Simulación local (para desarrollo)
    return new Promise((resolve) => {
        console.log('Email a enviar:', datos);
        // Guardar en localStorage para pruebas
        const mensajes = JSON.parse(localStorage.getItem('mensajes') || '[]');
        mensajes.push(datos);
        localStorage.setItem('mensajes', JSON.stringify(mensajes));
        resolve({ success: true });
    });
}

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos con clase de animación
document.querySelectorAll('.project-card, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Detectar cambios en el tema (dark/light)
const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');

function handleDarkMode(isDark) {
    if (isDark.matches) {
        document.documentElement.style.setProperty('--text-color', '#f9fafb');
        document.documentElement.style.setProperty('--light-bg', '#1f2937');
    } else {
        document.documentElement.style.setProperty('--text-color', '#1f2937');
        document.documentElement.style.setProperty('--light-bg', '#f9fafb');
    }
}

darkModePreference.addEventListener('change', handleDarkMode);
handleDarkMode(darkModePreference);

// Inicialización
console.log('Landing Page PWA cargada correctamente');
