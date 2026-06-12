# 🎮 Programación I Quest

Plataforma gamificada para el curso de Programación I: misiones, quizzes,
ejercicios interactivos (incluida una consola Python en el navegador),
progreso guardado en la nube y panel de profesor con calificaciones y
exportación a Excel.

## Tecnologías

- **React + Vite** — interfaz
- **Supabase** — autenticación (correo/contraseña) y base de datos
- **Pyodide** — Python en el navegador para los ejercicios de consola
- **Vercel** — hosting

---

## 1. Configurar Supabase (una sola vez)

1. Crea una cuenta gratuita en [supabase.com](https://supabase.com) y un proyecto nuevo.
2. En el panel del proyecto abre **SQL Editor**, pega el contenido completo de
   [`supabase/schema.sql`](supabase/schema.sql) y presiona **Run**.
3. Ve a **Authentication → Sign In / Up → Email** y (recomendado para empezar)
   **desactiva "Confirm email"** para que los alumnos entren sin confirmar correo.
4. Ve a **Settings → API** y copia:
   - `Project URL`
   - `anon public key`

### Variables de entorno locales

Copia `.env.example` como `.env` y llena tus valores:

```
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_ANON_KEY
VITE_DOMINIO_INSTITUCIONAL=@tuescuela.edu.mx   (opcional)
```

Si `VITE_DOMINIO_INSTITUCIONAL` tiene valor, solo se podrán registrar correos
que terminen con ese dominio.

### Hacerte profesora

1. Regístrate en la app con tu correo.
2. En el SQL Editor de Supabase ejecuta:

```sql
update public.perfiles set rol = 'profesor' where correo = 'TU_CORREO@ejemplo.com';
```

3. Cierra sesión y vuelve a entrar: verás el botón **Panel de profesor**.

---

## 2. Correr en local

```bash
npm install
npm run dev
```

---

## 3. Subir a Git y desplegar en Vercel

```bash
git add .
git commit -m "Plataforma con login, 10 sesiones y panel de profesor"
git push origin main
```

1. Entra a [vercel.com](https://vercel.com), **Add New → Project** e importa el
   repositorio de GitHub.
2. Vercel detecta Vite automáticamente. Antes de desplegar, en
   **Environment Variables** agrega:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_DOMINIO_INSTITUCIONAL` (opcional)
3. Presiona **Deploy**. El archivo `vercel.json` ya incluye la configuración
   para que las rutas internas (`/sesion/3`, `/profesor`, etc.) funcionen.

> **Importante:** el archivo `.env` nunca se sube a git (está en `.gitignore`).
> Las claves se configuran directamente en Vercel.

---

## Estructura del proyecto

```
src/
  pages/
    Login.jsx           — registro e inicio de sesión
    Dashboard.jsx       — las 10 sesiones del curso
    SesionUno.jsx       — Sesión 1 (contenido construido en código)
    SesionGenerica.jsx  — Sesiones 2-10 (contenido cargado por la profesora)
    PanelProfesor.jsx   — alumnos, calificaciones y Excel
  components/
    profesor/EditorSesion.jsx   — editor de contenido por sesión
    generico/                   — ejercicios configurables (ordenar / Python)
  hooks/useProgresoSesion.js    — guarda el avance en Supabase
  utils/calificaciones.js       — cálculo de calificaciones compartido
  utils/exportarExcel.js        — exportación a Excel (individual y general)
supabase/schema.sql             — esquema de base de datos + seguridad (RLS)
```

## Cómo carga contenido la profesora

En **Panel de profesor → Contenido de sesiones**:

1. Elige la sesión (2 a 10).
2. Agrega temas: título, icono, link de microclase (Gamma), preguntas del quiz
   y ejercicios (tipo *ordenar pasos* o *consola Python*).
3. En los ejercicios de consola, la calificación se valida comparando la
   **salida esperada exacta**.
4. Marca la sesión como **Publicada** y guarda: los alumnos la verán al instante
   con el mismo diseño que la Sesión 1.
