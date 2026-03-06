% QUICK START - Landing Page PWA

# 🚀 INICIO RÁPIDO (5 minutos)

## 1️⃣ Descargar y Organizar

Los archivos deben estar en la misma carpeta:
```
paginaweb/
├── index.html
├── styles.css
├── script.js
├── sw.js
├── manifest.json
└── otros archivos...
```

## 2️⃣ Ejecutar Localmente

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
# Opción A: Python (si lo tienes)
python -m http.server 8000

# Opción B: Descargar http-server
npm install -g http-server
http-server
```

Luego abre en tu navegador:
```
http://localhost:8000
```

## 3️⃣ Personalizar en 2 Minutos

Edita `index.html` y busca estos campos:

```html
<!-- Línea 8: Cambiar título -->
<title>Blanca - Desarrolladora de PWA</title>

<!-- Línea 26: Cambiar nombre -->
<div class="logo">Blanca Dev</div>

<!-- Línea 34-36: Cambiar heading principal -->
<h1>Tu Especialidad Aquí</h1>
<p>Tu tagline aquí</p>
```

## 4️⃣ Configurar Email (Recomendado)

### Opción Fácil: EmailJS (3 pasos)

1. Ir a https://www.emailjs.com/ → Sign Up (gratuito)
2. Copiar tu "Public Key" desde Dashboard
3. En `index.html`, antes de `</body>`, reemplaza `TU_PUBLIC_KEY`:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
<script>
    emailjs.init("TU_PUBLIC_KEY_AQUI");
</script>
```

4. En `script.js` línea ~50, descomenta y actualiza:

```javascript
await emailjs.send('SERVICE_ID_AQUI', 'TEMPLATE_ID_AQUI', {
    to_email: 'tu_email@ejemplo.com',
    from_name: datos.nombre,
    from_email: datos.email,
    subject: datos.asunto,
    message: datos.mensaje,
    date: datos.fecha
});
```

**Obtener IDs:**
- Crear "Email Service" conectando tu Gmail/Outlook
- Crear "Template" con variables {{variable_name}}
- Copiar los IDs

## 5️⃣ Cambiar Imágenes

Busca `https://via.placeholder.com/` en `index.html` y reemplaza con tus URLs:

```html
<!-- Cambiar esto -->
<img src="https://via.placeholder.com/300x200?text=Mi+Proyecto" alt="Mi Proyecto">

<!-- Por tu imagen -->
<img src="https://mi-servidor.com/mi-imagen.jpg" alt="Mi Proyecto">
```

O sube imágenes a un servicio gratuito:
- [Imgur](https://imgur.com/)
- [Imgbb](https://imgbb.com/)
- [Cloudinary](https://cloudinary.com/)

## 6️⃣ Cambiar Colores Principales

En `styles.css` línea 1-12, cambia los valores:

```css
:root {
    --primary-color: #2563eb;    /* Tu color principal aquí */
    --accent-color: #10b981;     /* Tu color acento aquí */
    /* ... */
}
```

Generadores de paletas:
- [Coolors.co](https://coolors.co/)
- [Color.adobe.com](https://color.adobe.com/)

## 7️⃣ Instalar como Aplicación

Una vez corriendo localmente:

### En Escritorio (Windows/Mac)
1. Abre en Chrome/Edge
2. Haz clic en el icono de instalación (arriba a la derecha)
3. ¡Listo! Funciona como app nativa

### En Móvil (Android)
1. Abre en Chrome
2. Toca ⋮ (tres puntos)
3. "Instalar aplicación"

### En Móvil (iOS)
1. Abre en Safari
2. Toca compartir
3. "Agregar a pantalla de inicio"

## 8️⃣ Verificar que es PWA

1. Abre **DevTools** (F12)
2. Ve a **Application**
3. Debes ver:
   - ✅ Manifest cargado
   - ✅ Service Worker "activated and running"

## 9️⃣ Publicar en Internet

### Vercel (Recomendado - 2 minutos)

```powershell
npm install -g vercel
vercel login
vercel
```

Sigue las instrucciones en consola. ¡Listo!

### Netlify (También fácil)

```powershell
npm install -g netlify-cli
netlify deploy --prod --dir .
```

### GitHub Pages (Gratuito)

1. Crea repositorio en GitHub
2. Sube los archivos
3. En Settings → Pages → selecciona "Deploy from a branch"
4. Elige rama "main"
5. ¡Publicado en github.com/usuario/repo!

## ❓ Solucionar Problemas

### "No se registra el Service Worker"
- Asegúrate usar HTTPS (o localhost en desarrollo)
- Verifica que `sw.js` esté en la carpeta raíz

### "El formulario no envía emails"
- ¿Configuraste EmailJS? Verifica Public Key
- Abre Consola (F12) para ver errores específicos
- Verifica que SERVICE_ID y TEMPLATE_ID sean correctos

### "Los cambios de CSS no aparecen"
- Presiona Ctrl+Shift+R (hard refresh) para limpiar caché

### "No se puede instalar como app"
- Requiere HTTPS en producción
- En localhost funciona sin HTTPS
- Verifica que manifest.json sea válido (sin errores)

## 📚 Próximos Pasos

Una vez funcionando:

1. **Reemplazar contenido**: Tus proyectos, habilidades, foto
2. **Configurar email**: EmailJS o backend propio
3. **Agregar más secciones**: Blog, portafolio, testimonios
4. **Optimizar imágenes**: Usar WebP, comprimir
5. **Publicar en dominio**: Comprar dominio y configurar
6. **Analytics**: Agregar Google Analytics

## 🎓 Documentación Completa

Lee estos archivos para más detalles:
- **README.md** - Guía completa
- **DEVELOPMENT.md** - Desarrollo avanzado
- **EMAILJS_CONFIG.html** - Configuración de email

## 💡 Tips Extras

```javascript
// Ver mensajes guardados localmente
JSON.parse(localStorage.getItem('mensajes'))

// Limpiar todo (devtools consola)
localStorage.clear();
caches.keys().then(names => Promise.all(names.map(n => caches.delete(n))));
```

## ✅ Checklist Básico

- [ ] Cambié el nombre por el mío
- [ ] Personalicé los colores
- [ ] Agregué mis proyectos
- [ ] Configuré el formulario de contacto
- [ ] Probé que funcione offline
- [ ] Instalé como app en mi dispositivo
- [ ] Publiqué en internet

---

**¿Preguntas?** Revisa los archivos de documentación o abre la consola (F12) para ver errores específicos.

**Última actualización**: Enero 2025
