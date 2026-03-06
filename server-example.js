/**
 * EJEMPLO DE BACKEND PARA ENVÍO DE EMAILS
 * 
 * Tecnologías: Node.js + Express + Nodemailer
 * 
 * INSTALACIÓN:
 * npm init -y
 * npm install express nodemailer cors dotenv body-parser
 * 
 * VARIABLES DE ENTORNO (.env):
 * EMAIL_USER=tu_email@gmail.com
 * EMAIL_PASSWORD=tu_contraseña_aplicacion
 * RECIPIENT_EMAIL=tu_email@ejemplo.com
 * PORT=3000
 */

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar transportador de email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Verificar conexión
transporter.verify((error, success) => {
    if (error) {
        console.log('Error en la configuración del email:', error);
    } else {
        console.log('Servidor de email listo:', success);
    }
});

/**
 * ENDPOINT: POST /api/send-email
 * Recibe datos del formulario y envía email
 */
app.post('/api/send-email', async (req, res) => {
    try {
        const { nombre, email, asunto, mensaje, fecha } = req.body;

        // Validaciones
        if (!nombre || !email || !asunto || !mensaje) {
            return res.status(400).json({
                success: false,
                message: 'Campos requeridos faltantes'
            });
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Email inválido'
            });
        }

        // Límite de longitud
        if (mensaje.length > 5000) {
            return res.status(400).json({
                success: false,
                message: 'El mensaje es demasiado largo'
            });
        }

        // Construir contenido HTML del email
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f9fafb;
                        padding: 20px;
                    }
                    .container {
                        max-width: 600px;
                        background-color: white;
                        padding: 30px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .header {
                        border-bottom: 3px solid #2563eb;
                        padding-bottom: 15px;
                        margin-bottom: 20px;
                    }
                    h2 {
                        color: #1f2937;
                        margin: 0;
                    }
                    .field {
                        margin-bottom: 15px;
                    }
                    .label {
                        font-weight: bold;
                        color: #2563eb;
                        margin-bottom: 5px;
                    }
                    .value {
                        color: #4b5563;
                        padding: 10px;
                        background-color: #f3f4f6;
                        border-radius: 4px;
                    }
                    .message-content {
                        background-color: #f9fafb;
                        padding: 15px;
                        border-left: 4px solid #2563eb;
                        margin-top: 20px;
                        white-space: pre-wrap;
                        word-wrap: break-word;
                    }
                    .footer {
                        margin-top: 20px;
                        padding-top: 15px;
                        border-top: 1px solid #e5e7eb;
                        color: #6b7280;
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>📧 Nuevo Mensaje de Contacto</h2>
                    </div>
                    
                    <div class="field">
                        <div class="label">👤 Nombre</div>
                        <div class="value">${escapeHtml(nombre)}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">📧 Email</div>
                        <div class="value"><a href="mailto:${email}">${email}</a></div>
                    </div>
                    
                    <div class="field">
                        <div class="label">📝 Asunto</div>
                        <div class="value">${escapeHtml(asunto)}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">🕒 Fecha</div>
                        <div class="value">${fecha}</div>
                    </div>
                    
                    <div class="label">💬 Mensaje</div>
                    <div class="message-content">${escapeHtml(mensaje)}</div>
                    
                    <div class="footer">
                        <p>Este email fue enviado desde el formulario de contacto de tu Landing Page PWA.</p>
                        <p>Responde a este email para contactar directamente con el visitante.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Configurar opciones de email
        const mailOptions = {
            from: `"Formulario de Contacto" <${process.env.EMAIL_USER}>`,
            to: process.env.RECIPIENT_EMAIL,
            replyTo: email,
            subject: `[Formulario] ${asunto}`,
            html: htmlContent,
            text: `
Nuevo mensaje de contacto:

Nombre: ${nombre}
Email: ${email}
Asunto: ${asunto}
Fecha: ${fecha}

Mensaje:
${mensaje}
            `
        };

        // Enviar email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email enviado exitosamente:', info.response);

        // Respuesta exitosa
        res.json({
            success: true,
            message: 'Email enviado correctamente',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('Error al enviar email:', error);
        
        res.status(500).json({
            success: false,
            message: 'Error al enviar el email. Intenta más tarde.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

/**
 * ENDPOINT: GET /api/health
 * Verificar que el servidor está funcionando
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

/**
 * Función para escapar HTML y prevenir XSS
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Manejo de errores 404
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

/**
 * Manejo global de errores
 */
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📧 Endpoint de email: POST http://localhost:${PORT}/api/send-email`);
    console.log(`💚 Health check: GET http://localhost:${PORT}/api/health`);
});

module.exports = app;

/**
 * INSTRUCCIONES PARA USAR GMAIL:
 * 
 * 1. Habilitar "Aplicaciones menos seguras"
 *    - Ir a https://myaccount.google.com/security
 *    - Scroll down a "Aplicaciones menos seguras"
 *    - Activar
 * 
 * 2. O mejor: Usar "Contraseña de aplicación"
 *    - Habilitar autenticación de 2 factores en tu cuenta Google
 *    - Ir a https://myaccount.google.com/apppasswords
 *    - Generar una contraseña para "Mail" en "Windows Computer"
 *    - Usar esa contraseña en EMAIL_PASSWORD del .env
 * 
 * 3. Crear archivo .env:
 *    EMAIL_USER=tu_email@gmail.com
 *    EMAIL_PASSWORD=tu_contraseña_de_aplicacion
 *    RECIPIENT_EMAIL=tu_email@ejemplo.com
 *    NODE_ENV=production
 *    PORT=3000
 * 
 * 4. Ejecutar:
 *    node server.js
 * 
 * 5. Probar con curl:
 *    curl -X POST http://localhost:3000/api/send-email \
 *      -H "Content-Type: application/json" \
 *      -d '{
 *        "nombre": "Juan",
 *        "email": "juan@ejemplo.com",
 *        "asunto": "Test",
 *        "mensaje": "Mensaje de prueba",
 *        "fecha": "2025-01-28"
 *      }'
 */
