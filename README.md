# Landing Page PWA - Blanca Dev

## 📋 Descripción

Landing Page profesional para una especialista en Aplicaciones Web Progresivas (PWA). Este proyecto es una PWA completa que incluye todas las características modernas de una aplicación web progresiva.

## ✨ Características Principales

### 1. **Hero Section (Inicio)**
- Título principal impactante
- Subtítulo descriptivo
- Animaciones fluidas
- Llamada a la acción prominente
- Diseño responsivo

### 2. **Histórico de Proyectos**
- Grid de proyectos destacados
- Tarjetas interactivas con efecto hover
- Imágenes con transiciones
- Tags de tecnologías utilizadas
- Animaciones al hacer scroll

### 3. **Elementos Visuales**
- Animaciones CSS3
- Gradientes modernos
- Transiciones suaves
- Efectos de parallax
- Iconografía consistente
- Videos embebidos

### 4. **Formulario de Contacto**
- Validación de datos
- Campos requeridos
- Validación de email
- Mensajes de confirmación/error
- Almacenamiento en localStorage
- Integración lista para EmailJS o backend

### 5. **Funcionalidades PWA**
- Service Worker registrado
- Cacheo offline-first
- Instalable en dispositivos
- Funciona sin conexión
- Manifest.json configurado
- Icons SVG escalables
- Shortcuts de aplicación
- Compatible con dark mode

## 📂 Estructura de Archivos

```
paginaweb/
├── index.html           # Estructura HTML
├── styles.css          # Estilos y diseño responsivo
├── script.js           # Lógica JavaScript y funcionalidad
├── sw.js               # Service Worker para PWA
├── manifest.json       # Configuración de la PWA
├── README.md           # Este archivo
└── .gitignore          # Archivos ignorados en git
```

## 🚀 Instalación y Uso

### Requisitos
- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Servidor web (para acceso HTTPS)
- Editor de código (opcional)

### Pasos de Instalación

1. **Descargar los archivos**
   ```
   Coloca todos los archivos en tu servidor web
   ```

2. **Configurar HTTPS**
   ```
   Las PWA requieren HTTPS en producción
   Para desarrollo local, puedes usar http://localhost
   ```

3. **Servir los archivos**
   ```powershell
   # Opción 1: Usar Python
   python -m http.server 8000
   
   # Opción 2: Usar Node.js (http-server)
   npx http-server
   
   # Opción 3: Usar Live Server en VS Code
   # Instalar la extensión y hacer clic en "Go Live"
   ```

4. **Acceder a la página**
   ```
   Abre http://localhost:8000 en tu navegador
   ```

## ⚙️ Configuración

### Personalización de Contenido

1. **Editar HTML (index.html)**
   - Cambiar nombre: Reemplazar "Blanca" por tu nombre
   - Actualizar proyectos en la sección `.projects-grid`
   - Modificar habilidades en `.skills-grid`
   - Cambiar enlaces de redes sociales

2. **Personalizar Estilos (styles.css)**
   - Colores: Modificar variables CSS en `:root`
   - Fuentes: Cambiar en `body { font-family: ... }`
   - Espaciado: Ajustar padding y margin

3. **Actualizar JavaScript (script.js)**
   - Integrar servicio de email real
   - Configurar EmailJS o backend propio
   - Personalizar mensajes

### Variables CSS Principales

```css
:root {
    --primary-color: #2563eb;      /* Azul principal */
    --secondary-color: #1e40af;    /* Azul secundario */
    --accent-color: #10b981;       /* Verde acento */
    --text-color: #1f2937;         /* Color de texto */
    --light-bg: #f9fafb;           /* Fondo claro */
}
```

## 📧 Configurar Envío de Emails

### Opción 1: EmailJS (Recomendado)

1. Registrarse en [EmailJS](https://www.emailjs.com/)
2. Obtener las credenciales (Service ID, Template ID)
3. Descomenta el código en `script.js`:

```javascript
// En script.js, línea ~50
await emailjs.send('service_id', 'template_id', {
    to_email: 'tu_email@ejemplo.com',
    from_name: datos.nombre,
    from_email: datos.email,
    subject: datos.asunto,
    message: datos.mensaje,
    date: datos.fecha
});
```

4. Agregar en `index.html`, antes del cierre de body:

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
<script type="text/javascript">
    emailjs.init('YOUR_PUBLIC_KEY');
</script>
```

### Opción 2: Backend Propio

1. Crear endpoint en tu servidor: `POST /api/send-email`
2. Descomenta el código en `script.js`:

```javascript
const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
});
```

## 🔧 Características del Service Worker

- **Caching Strategy**: Cache First, Network Fallback
- **Offline Support**: Funciona completamente sin conexión
- **Background Sync**: Sincronización automática
- **Push Notifications**: Preparado para notificaciones push

## 📱 Instalar como Aplicación

### En Escritorio (Windows/Mac/Linux)
1. Abre la página en Chrome/Edge
2. Haz clic en el icono de instalación (arriba a la derecha)
3. Confirma la instalación
4. La app se abre en una ventana independiente

### En Móvil (Android/iOS)
1. Abre la página en Chrome/Safari
2. Toca el menú (⋮ en Android, compartir en iOS)
3. Selecciona "Instalar aplicación" o "Agregar a pantalla de inicio"
4. Confirma la instalación

## 🎨 Personalización Visual

### Cambiar Colores Principales

Edita en `styles.css`:

```css
:root {
    --primary-color: #TU_COLOR_AQUI;      /* Cambiar azul */
    --accent-color: #TU_COLOR_AQUI;       /* Cambiar verde */
    /* ... otros colores ... */
}
```

### Cambiar Fuentes

En `styles.css`, línea `body`:

```css
body {
    font-family: 'Tu Fuente Aqui', Arial, sans-serif;
}
```

### Agregar Tus Propias Imágenes

1. Reemplaza las URLs de `placeholder.com` con tus imágenes
2. Sube las imágenes a un servidor o CDN
3. Actualiza las rutas en `index.html`

## 🧪 Testing y Validación

### Verificar que es PWA
1. En DevTools (F12) → Application → Manifest
2. Debes ver tu `manifest.json` cargado correctamente
3. En ServiceWorkers, debe estar "activated and running"

### Testing Offline
1. En DevTools → Network
2. Marca "Offline"
3. Recarga la página - debe funcionar

### Audit de Lighthouse
1. En DevTools → Lighthouse
2. Click "Analyze page load"
3. Busca la sección "PWA" para ver el score

## 📊 Optimizaciones Aplicadas

- ✅ Responsive Design
- ✅ Mobile-First Approach
- ✅ Lazy Loading
- ✅ CSS Minificado (recomendado en producción)
- ✅ Service Worker
- ✅ Web App Manifest
- ✅ Animaciones GPU-aceleradas
- ✅ Dark Mode Support
- ✅ Semantic HTML5
- ✅ Accesibilidad WCAG

## 🚀 Deployment

### Opciones de Hosting

1. **Vercel** (Recomendado)
   - Deployment automático desde Git
   - HTTPS automático
   - Soporte PWA completo

2. **Netlify**
   - Sencillo y rápido
   - HTTPS por defecto
   - Built-in PWA support

3. **GitHub Pages**
   - Gratuito y simple
   - Perfecto para portfolios

4. **Firebase Hosting**
   - Escalable
   - HTTPS automático
   - Análisis integrados

### Deploy a Vercel

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Autenticarse
vercel login

# 3. Deploy
vercel
```

## 🐛 Solución de Problemas

### El Service Worker no se registra
- Asegúrate de usar HTTPS (o localhost)
- Verifica que `sw.js` esté en la raíz

### Formulario no envía emails
- Verifica la configuración de EmailJS
- Revisa la consola del navegador para errores
- Asegúrate de haber incluido el script de EmailJS

### Cambios de CSS no se aplican
- Limpia el caché: Ctrl+Shift+Delete
- Hard refresh: Ctrl+Shift+R

### PWA no se instala
- Asegúrate de tener HTTPS
- Verifica que `manifest.json` sea válido
- Abre la consola (F12) para ver errores

## 📝 Licencia

Este proyecto está disponible bajo licencia MIT. Siéntete libre de usarlo, modificarlo y distribuirlo.

## 📞 Soporte

Para preguntas o sugerencias, contacta a través del formulario en la página web.

## 🎯 Próximas Mejoras Sugeridas

- [ ] Blog de artículos
- [ ] Sistema de comentarios
- [ ] Integración con redes sociales
- [ ] Newsletter
- [ ] Dashboard de administración
- [ ] Analytics avanzado
- [ ] Modo oscuro persistente
- [ ] Multi-idioma

---

**Última actualización**: Enero 2025
**Versión**: 1.0.0
