# DevMaK3 — Digital Creative Engineering & Innovation Lab

> *"Make your ideas, develop your dreams"*

Sitio web interactivo y plataforma de presentación de marca para **DevMaK3**, construido con HTML5, Tailwind CSS, Three.js y audio sintético procedural.

---

## 🚀 Inicio Rápido Local

Para iniciar el servidor de desarrollo local:

```bash
# Opción 1: Con Node.js
npm start

# Opción 2: En Windows haciendo doble click en:
start.bat
```

Abre tu navegador en `http://localhost:3000`.

---

## 🗄️ 1. Configuración de Supabase (Base de Datos para Contactos)

El formulario de contacto está preparado para guardar los mensajes directamente en Supabase con Row Level Security (RLS).

### Pasos:
1. Crea una cuenta o inicia sesión en [supabase.com](https://supabase.com).
2. Crea un nuevo proyecto llamado `DevMaK3`.
3. Ve a **SQL Editor** en el panel lateral izquierdo de Supabase.
4. Abre o copia el contenido del archivo [`supabase_schema.sql`](./supabase_schema.sql) y haz click en **Run**. Esto creará:
   - La tabla `public.contact_messages`.
   - Las políticas RLS de seguridad (permite envíos anónimos seguros desde la web).
5. Ve a **Project Settings > API**:
   - Copia la **Project URL**.
   - Copia la **anon / public key**.
6. Abre el archivo [`assets/js/supabase-config.js`](./assets/js/supabase-config.js) y pega tus credenciales:
   ```javascript
   window.DEVMAK3_CONFIG = {
     supabaseUrl: 'https://TU-PROYECTO.supabase.co',
     supabaseAnonKey: 'TU-CLAVE-ANON-PUBLICA'
   };
   ```

---

## ▲ 2. Despliegue en Vercel (Frontend)

El proyecto incluye [`vercel.json`](./vercel.json) configurado para servir la aplicación con URLs limpias y encabezados de seguridad.

### Pasos:
1. Inicia sesión en [vercel.com](https://vercel.com) con tu cuenta de GitHub (`DevMaK3`).
2. Haz click en **"Add New..." > "Project"**.
3. Selecciona el repositorio **`DevMaK3/DevMak3`**.
4. En **Framework Preset**, selecciona **Other** (o déjalo automático).
5. Haz click en **Deploy**. ¡Tu sitio estará en vivo en segundos con SSL automático!

---

## 🟣 3. Despliegue en Render (Servidor Web / API)

El repositorio incluye [`render.yaml`](./render.yaml) (Render Blueprint) y soporte para `package.json`.

### Pasos:
1. Inicia sesión en [render.com](https://render.com).
2. Haz click en **New + > Blueprint** y conecta tu repositorio `DevMaK3/DevMak3` (Render leerá automáticamente el archivo `render.yaml`).
   - *Alternativamente:* Puedes crear un **Web Service**, seleccionar `DevMaK3/DevMak3`, elegir **Runtime: Node**, Build Command: `npm install`, Start Command: `npm start`.
3. En **Environment Variables** en Render (opcional si usas endpoints de backend):
   - `PORT`: `10000`
   - `SUPABASE_URL`: Tu URL de Supabase
   - `SUPABASE_ANON_KEY`: Tu clave anónima
4. Haz click en **Create Web Service**.

---

## 🔒 4. Configuración Segura de Git

Este repositorio local está configurado exclusivamente para la cuenta:
- **Email:** `devmavenk3@gmail.com`
- **Usuario:** `DevMaK3`
- **PAT (Personal Access Token):** Configurado directamente en el remote origin, anulando gestores de credenciales externos de Windows para evitar mezclar cuentas del equipo.
