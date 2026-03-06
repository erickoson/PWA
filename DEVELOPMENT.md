# 🚀 Guía de Desarrollo - Landing Page PWA

## Estructura del Proyecto

```
paginaweb/
├── index.html                    # Estructura HTML principal
├── styles.css                    # Estilos CSS (responsivo)
├── script.js                     # JavaScript (lógica e interactividad)
├── sw.js                         # Service Worker (offline)
├── manifest.json                 # Configuración PWA
├── server-example.js             # Ejemplo de backend Node.js
├── EMAILJS_CONFIG.html          # Guía de configuración EmailJS
├── README.md                     # Documentación principal
├── DEVELOPMENT.md                # Este archivo
└── .gitignore                   # Archivos ignorados
```

## 🔧 Stack Tecnológico

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **PWA**: Service Workers, Web App Manifest
- **Email**: EmailJS o backend propio
- **Backend (opcional)**: Node.js + Express
- **Hosting**: Vercel, Netlify, GitHub Pages, etc.

## 💻 Desarrollo Local

### Requisitos Previos

- Node.js 14+ (opcional, si usas backend)
- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Editor de código (VS Code recomendado)
- Git (opcional)

### Ambiente de Desarrollo

#### Opción 1: Servidor Simple (Sin Node.js)

```powershell
# Usar el servidor integrado de Python
python -m http.server 8000

# O si tienes Python 2.x
python -m SimpleHTTPServer 8000
```

#### Opción 2: HTTP Server (Requiere Node.js)

```powershell
# Instalar globalmente
npm install -g http-server

# Ejecutar
http-server
```

#### Opción 3: Live Server (VS Code)

1. Instalar extensión "Live Server"
2. Click derecho en `index.html`
3. Seleccionar "Open with Live Server"

#### Opción 4: Con Backend Node.js

```powershell
# Instalar dependencias
npm install

# Crear archivo .env
# EMAIL_USER=tu_email@gmail.com
# EMAIL_PASSWORD=contraseña
# RECIPIENT_EMAIL=tu_email@ejemplo.com
# NODE_ENV=development
# PORT=3000

# Ejecutar servidor
node server-example.js

# En otra terminal, servir frontend en puerto 8000
http-server -p 8000
```

## 📝 Editar Contenido

### Cambiar Nombre y Textos

**Archivo: `index.html`**

```html
<!-- Línea ~8: Cambiar titulo -->
<title>Blanca - Desarrolladora de PWA | Landing Page</title>

<!-- Línea ~26: Cambiar logo -->
<div class="logo">Blanca Dev</div>

<!-- Línea ~34-36: Cambiar titulo principal -->
<h1 class="main-title">Especialista en Aplicaciones Web Progresivas</h1>
<p class="subtitle">Transformando ideas en experiencias web modernas...</p>
```

### Agregar/Editar Proyectos

**Archivo: `index.html` - Sección Projects (línea ~80)**

```html
<!-- Duplicar esta tarjeta y cambiar contenido -->
<div class="project-card">
    <div class="project-image">
        <img src="https://tu-imagen.com/proyecto.jpg" alt="Mi Proyecto">
    </div>
    <div class="project-content">
        <h3>Nombre del Proyecto</h3>
        <p>Descripción breve del proyecto...</p>
        <span class="tech-tag">Tecnología 1</span>
        <span class="tech-tag">Tecnología 2</span>
    </div>
</div>
```

### Cambiar Colores

**Archivo: `styles.css` - Líneas 1-12**

```css
:root {
    --primary-color: #2563eb;      /* Azul -> Cambiar aquí */
    --secondary-color: #1e40af;    /* Azul oscuro -> Cambiar aquí */
    --accent-color: #10b981;       /* Verde -> Cambiar aquí */
    --text-color: #1f2937;         /* Texto gris -> Cambiar aquí */
    --light-bg: #f9fafb;           /* Fondo gris claro */
    /* ... */
}
```

### Cambiar Fuente

**Archivo: `styles.css` - Línea 18**

```css
body {
    font-family: 'Tu Fuente', Arial, sans-serif;
    /* ... */
}
```

Para usar Google Fonts, agregar en `index.html` antes del `</head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
```

Luego en CSS:
```css
body {
    font-family: 'Roboto', sans-serif;
}
```

## 🔌 Integrar Email

### Método 1: EmailJS (Recomendado para Principiantes)

1. **Registrarse**: https://www.emailjs.com/
2. **Obtener Public Key** desde Dashboard
3. **Crear Email Service** (conectar Gmail, Outlook, etc.)
4. **Crear Template** con variables
5. **Editar `index.html`** (antes de `</body>`):

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
<script>
    emailjs.init("TU_PUBLIC_KEY_AQUI");
</script>
```

6. **Editar `script.js`** (línea ~45, descomenta y actualiza):

```javascript
await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', {
    to_email: 'tu_email@ejemplo.com',
    from_name: datos.nombre,
    from_email: datos.email,
    subject: datos.asunto,
    message: datos.mensaje,
    date: datos.fecha
});
```

### Método 2: Backend Propio (Más Control)

**Crear archivo `server.js`:**

```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu_email@gmail.com',
        pass: 'tu_contraseña_app'
    }
});

app.post('/api/send-email', async (req, res) => {
    const { nombre, email, asunto, mensaje } = req.body;
    
    try {
        await transporter.sendMail({
            from: 'tu_email@gmail.com',
            to: 'tu_email@gmail.com',
            replyTo: email,
            subject: `[Contacto] ${asunto}`,
            html: `<p><strong>${nombre}</strong></p><p>${mensaje}</p>`
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));
```

**Editar `script.js`** (línea ~45, descomenta):

```javascript
const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, asunto, mensaje })
});
```

## 🔍 Testing y Validación

### Verificar PWA Correctamente Configurada

1. Abrir DevTools (`F12`)
2. Ir a **Application** → **Manifest**
3. Debes ver tu `manifest.json` sin errores
4. Ir a **Application** → **Service Workers**
5. Debe mostrar "activated and running"

### Test Offline

1. En DevTools → **Network**
2. Marcar checkbox **Offline**
3. Recargar página (`Ctrl+R`)
4. Debe cargar desde caché y funcionar

### Lighthouse Audit

1. En DevTools → **Lighthouse**
2. Click "Analyze page load"
3. Revisar puntuación PWA (debe ser ≥ 90)

### Pruebas de Formulario

```javascript
// En consola del navegador, verificar mensajes guardados:
JSON.parse(localStorage.getItem('mensajes'))

// Enviar mensaje de prueba manualmente:
const testData = {
    nombre: 'Test User',
    email: 'test@ejemplo.com',
    asunto: 'Prueba',
    mensaje: 'Este es un mensaje de prueba'
};
fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testData)
});
```

## 📊 Optimizaciones

### Imágenes

- Usar formatos modernos: WebP, AVIF
- Comprimir: https://tinypng.com/
- Lazy loading: `<img loading="lazy">`

### CSS y JavaScript

```html
<!-- Minificar en producción -->
<link rel="stylesheet" href="styles.min.css">
<script src="script.min.js"></script>
```

### Fuentes

```html
<!-- Precargar fuentes importantes -->
<link rel="preload" as="font" href="font.woff2" type="font/woff2" crossorigin>
```

### Caché

En `sw.js`, actualizar nombre de caché cuando cambies recursos:

```javascript
const CACHE_NAME = 'blanca-pwa-v2'; // Incrementar versión
```

## 🐛 Debugging

### Ver errores de Service Worker

```javascript
// En script.js
navigator.serviceWorker.ready.then(registration => {
    console.log('SW listo:', registration);
});

navigator.serviceWorker.onerror = (error) => {
    console.error('Error en SW:', error);
};
```

### Revisar caché

```javascript
// En consola
caches.keys().then(names => console.log(names));
caches.open('blanca-pwa-v1').then(cache => cache.keys()).then(requests => console.log(requests));
```

### Limpiar todo

```javascript
// En consola para borrar todo y reiniciar
caches.keys().then(names => Promise.all(names.map(name => caches.delete(name))));
localStorage.clear();
navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(r => r.unregister());
});
```

## 📤 Deployment

### A Vercel

```powershell
npm install -g vercel
vercel login
vercel
```

### A Netlify

```powershell
npm install -g netlify-cli
netlify deploy --prod --dir .
```

### A GitHub Pages

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/usuario/repo.git
git push -u origin main

# Luego en Settings → Pages → Deploy from branch → main
```

## 📚 Recursos Útiles

- [MDN - Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Google - PWA Checklist](https://web.dev/pwa-checklist/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [EmailJS Docs](https://www.emailjs.com/docs/)

## ✅ Checklist Antes de Publicar

- [ ] Cambiar "Blanca" por tu nombre en todos lados
- [ ] Personalizar colores según tu marca
- [ ] Reemplazar imágenes placeholder
- [ ] Configurar email (EmailJS o backend)
- [ ] Probar formulario completamente
- [ ] Actualizar links de redes sociales
- [ ] Verificar que funcione offline
- [ ] Ejecutar Lighthouse audit
- [ ] Probar en móvil
- [ ] Instalar como app en dispositivo
- [ ] Configurar HTTPS en producción
- [ ] Actualizar manifest.json con datos reales
- [ ] Crear icons reales (no SVG placeholder)

## 🎨 Personalización Avanzada

### Agregar Dark Mode Persistente

```javascript
// En script.js
const darkModeToggle = document.createElement('button');
darkModeToggle.textContent = '🌙';
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Al cargar
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
```

### Agregar Animaciones Personalizadas

En `styles.css`:

```css
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.animate-slide-in {
    animation: slideIn 0.6s ease forwards;
}
```

---

**Última actualización**: Enero 2025
**Versión**: 1.0.0
