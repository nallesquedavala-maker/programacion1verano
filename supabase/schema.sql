-- ============================================================
-- PROGRAMACIÓN I QUEST — Esquema de base de datos (Supabase)
--
-- CÓMO USARLO:
--   1. Crea un proyecto gratuito en https://supabase.com
--   2. En el panel de Supabase ve a "SQL Editor"
--   3. Pega TODO este archivo y presiona "Run"
--   4. Al final, cambia 'TU_CORREO@ejemplo.com' por tu correo
--      y ejecuta la última línea para volverte profesora.
-- ============================================================

-- ---------- TABLA: perfiles ----------
create table if not exists public.perfiles (
  id uuid primary key references auth.users (id) on delete cascade,
  correo text not null,
  nombre text not null,
  rol text not null default 'alumno' check (rol in ('alumno', 'profesor')),
  creado_en timestamptz not null default now()
);

-- ---------- TABLA: sesiones ----------
create table if not exists public.sesiones (
  id int primary key,
  titulo text not null,
  subtitulo text not null default '',
  publicada boolean not null default false,
  contenido jsonb not null default '{"temas": []}'::jsonb,
  actualizada_en timestamptz not null default now()
);

-- ---------- TABLA: progreso ----------
-- Una fila por (alumno, sesión). "datos" guarda todo el avance:
-- { temas: { "1": { quiz: {...}, ejercicios: {...} } }, minijuego: {...} }
create table if not exists public.progreso (
  user_id uuid not null references auth.users (id) on delete cascade,
  sesion_id int not null references public.sesiones (id),
  datos jsonb not null default '{}'::jsonb,
  actualizado_en timestamptz not null default now(),
  primary key (user_id, sesion_id)
);

-- ---------- Crear perfil automáticamente al registrarse ----------
create or replace function public.manejar_nuevo_usuario()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.perfiles (id, correo, nombre)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'nombre', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists al_crear_usuario on auth.users;
create trigger al_crear_usuario
  after insert on auth.users
  for each row execute function public.manejar_nuevo_usuario();

-- ---------- Función auxiliar: ¿el usuario actual es profesor? ----------
create or replace function public.es_profesor()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.perfiles
    where id = auth.uid() and rol = 'profesor'
  );
$$;

-- ---------- Seguridad a nivel de fila (RLS) ----------
alter table public.perfiles enable row level security;
alter table public.sesiones enable row level security;
alter table public.progreso enable row level security;

-- Perfiles: cada quien ve el suyo; el profesor ve todos.
drop policy if exists perfiles_select on public.perfiles;
create policy perfiles_select on public.perfiles
  for select using (id = auth.uid() or public.es_profesor());

drop policy if exists perfiles_update on public.perfiles;
create policy perfiles_update on public.perfiles
  for update using (id = auth.uid());

-- Sesiones: cualquier usuario autenticado puede leerlas;
-- solo el profesor puede crearlas / editarlas.
drop policy if exists sesiones_select on public.sesiones;
create policy sesiones_select on public.sesiones
  for select using (auth.uid() is not null);

drop policy if exists sesiones_insert on public.sesiones;
create policy sesiones_insert on public.sesiones
  for insert with check (public.es_profesor());

drop policy if exists sesiones_update on public.sesiones;
create policy sesiones_update on public.sesiones
  for update using (public.es_profesor());

-- Progreso: el alumno lee y escribe el suyo; el profesor lee todos.
drop policy if exists progreso_select on public.progreso;
create policy progreso_select on public.progreso
  for select using (user_id = auth.uid() or public.es_profesor());

drop policy if exists progreso_insert on public.progreso;
create policy progreso_insert on public.progreso
  for insert with check (user_id = auth.uid());

drop policy if exists progreso_update on public.progreso;
create policy progreso_update on public.progreso
  for update using (user_id = auth.uid());

-- ---------- Sembrar las 10 sesiones ----------
insert into public.sesiones (id, titulo, subtitulo, publicada) values
  (1,  'Sesión 1',  'Fundamentos + primeros programas en Python', true),
  (2,  'Sesión 2',  '', false),
  (3,  'Sesión 3',  '', false),
  (4,  'Sesión 4',  '', false),
  (5,  'Sesión 5',  '', false),
  (6,  'Sesión 6',  '', false),
  (7,  'Sesión 7',  '', false),
  (8,  'Sesión 8',  '', false),
  (9,  'Sesión 9',  '', false),
  (10, 'Sesión 10', '', false)
on conflict (id) do nothing;

-- ============================================================
-- ¡IMPORTANTE! Después de registrarte en la app con tu correo,
-- ejecuta esta línea (cambiando el correo) para ser profesora:
-- ============================================================
-- update public.perfiles set rol = 'profesor' where correo = 'TU_CORREO@ejemplo.com';
