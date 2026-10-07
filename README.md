# Di Grecco — sitio oficial

## Ejecutar en local

Requisitos: Node.js 20.19+ (rama 20) o 22.12+.

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. Para habilitar las respuestas de Gemini en el chatbot,
define `GEMINI_API_KEY` en un archivo `.env` local. Sin esa clave, el chatbot usa
respuestas de respaldo.

## Publicar en Vercel desde GitHub

Importa este repositorio en Vercel y conserva estos valores de compilación:

- Comando de instalación: `npm install`
- Comando de compilación: `npm run build`
- Directorio de salida: `dist`

La configuración está guardada en `vercel.json`. No se debe añadir una reescritura
global a `/index.html`: los apartados del sitio se navegan con hashes (`#/musicas`,
`#/debutantes`, `#/biografia`) y los vídeos, portadas y audios son archivos estáticos
de `public/`. Una reescritura global haría que esas solicitudes recibieran HTML en
vez del archivo solicitado.

Los enlaces a WhatsApp, Spotify, YouTube, Instagram, TikTok y Facebook abren sus
destinos externos. Los vídeos y las canciones de vista previa se sirven desde
`public/videos/` y `public/audio/` tanto en Vercel como en la versión local.

El endpoint de Vercel para el chatbot está en `api/chat.ts`. Para habilitar respuestas
con Gemini, agrega `GEMINI_API_KEY` como variable de entorno del proyecto en Vercel
y vuelve a desplegar. Sin esa variable, el chatbot conserva sus respuestas de
respaldo. En local, el servidor también ofrece esas respuestas sin clave.
