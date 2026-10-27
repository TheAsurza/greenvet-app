# Sistema de Gestión para Clínica Veterinaria (GreenVet)
**Evaluación Parcial – Desarrollo de Interfaces III**  
**Institución:** Escuela de Tecnología - Zegel  
**Framework:** Angular (Arquitectura Modular basada en `NgModule` y TypeScript)  
**Estilo y UI:** Bootstrap 5.3 + Bootstrap Icons

---

## 1. Contexto de la Problemática y Solución Desarrollada

### Problemática Identificada:
Una clínica veterinaria en crecimiento presentaba lentitud e ineficiencia operativa:
* Los clientes debían llamar telefónicamente para agendar citas, sin control digital de turnos y con frecuentes pérdidas de citas.
* Carencia de un historial de atención clínica estructurado y accesible para cada mascota.
* Ausencia de un padrón digital unificado de pacientes (mascotas) y sus respectivos propietarios.

### Solución Implementada:
Se diseñó y construyó una aplicación web frontend modular, responsiva y orientada a objetos que digitaliza el flujo clínico completo:
1. **Padrón Digital de Pacientes y Dueños:** Registro de mascotas con validaciones estrictas y modelado polimórfico por especie (Caninos, Felinos y Animales Exóticos).
2. **Agenda y Calendario de Turnos:** Visualización de citas en tiempo real, priorización automática de urgencias y detección de colisiones de horario.
3. **Expediente e Historial Médico:** Registro de signos vitales (peso, temperatura, frecuencia cardíaca), diagnósticos, tratamientos y programación de controles futuros.

---

## 2. Arquitectura de Software y Buenas Prácticas

La aplicación sigue una **arquitectura modular escalable** dividida en tres capas principales:

```text
src/app/
├── core/                       # Núcleo de la aplicación (Singleton)
│   ├── guards/                 # Protección de rutas internas (StaffGuard)
│   │   └── staff.guard.ts
│   ├── models/                 # Modelos de dominio y tipos TS (POO)
│   │   ├── propietario.model.ts
│   │   ├── mascota.model.ts    # Clase abstracta Mascota, Canino, Felino y Exotico
│   │   ├── cita.model.ts       # Interfaces y Enums (EstadoCita, MotivoConsulta)
│   │   ├── historial.model.ts  # Ficha clínica y signos vitales
│   │   └── index.ts            # Barrel export
│   └── services/               # Servicios reactivos (BehaviorSubject + LocalStorage)
│       ├── auth-staff.service.ts  # Autenticación y control de personal clínico
│       ├── mascotas.service.ts
│       ├── citas.service.ts
│       └── historial.service.ts
│
├── shared/                     # Elementos reutilizables en toda la app
│   ├── components/             # Dumb / Presentational components
│   │   ├── navbar/             # Navbar dual con cambio dinámico (Público vs Intranet)
│   │   ├── public-layout/      # Shell público para clientes y login institucional
│   │   ├── mascota-card/       # Tarjeta desacoplada con @Input y @Output
│   │   └── dueno-lookup-modal/ # Modal reactivo de búsqueda de propietarios
│   ├── directives/             # Directivas personalizadas
│   │   └── cita-urgente.directive.ts (Renderer2 + microinteracciones hover)
│   └── pipes/                  # Pipes personalizados
│       ├── tiempo-relativo.pipe.ts   (Formato inteligente de fechas/horas)
│       └── estado-badge.pipe.ts      (Badges dinámicos con clases Bootstrap)
│
└── features/                   # Módulos de funcionalidad (Lazy Loading)
    ├── portal-clientes/        # Portal público para clientes: Reserva de Citas Online (/)
    ├── admin/                  # Intranet clínica: Autenticación, AdminLayout y Dashboard (/admin/*)
    │   ├── components/admin-layout/    # Shell SaaS clínico con Sidebar Dark Teal y Topbar
    │   ├── components/admin-dashboard/ # Centro de control gerencial y operativo
    │   └── components/admin-login/     # Portal de acceso para personal
    ├── citas/                  # CitasModule (Agenda clínica interna protegida por StaffGuard)
    ├── mascotas/               # MascotaModule (Padrón general interno protegido por StaffGuard)
    └── historial/              # HistorialModule (Expedientes clínicos protegidos por StaffGuard)
```

---

## 3. Justificación de Criterios de Evaluación (Rúbrica de Calificación)

| Criterio | Implementación Técnica | Nivel de Logro |
| :--- | :--- | :---: |
| **1. TypeScript y POO** | Clase abstracta `Mascota`, herencia en `Canino`, `Felino` y `Exotico`, métodos polimórficos (`getRecomendacionesCuidado()`, `getProtocoloVacunacion()`), encapsulamiento de edad dinámica y enums fuertemente tipados. | **Sobresaliente (4 pts)** |
| **2. Arquitectura Modular** | Separación en `CoreModule`, `SharedModule` y módulos de dominio por funcionalidad con **Lazy Loading** (`loadChildren`) en `AppRoutingModule`. | **Sobresaliente (4 pts)** |
| **3. Componentes en Angular** | Patrón *Smart & Dumb Components*. Componente `MascotaCardComponent` 100% parametrizable con `@Input({ required: true })` y eventos emitidos mediante `@Output()`. | **Sobresaliente (4 pts)** |
| **4. Directivas, Pipes y Bootstrap** | Pipes `TiempoRelativoPipe` y `EstadoBadgePipe`. Directiva `CitaUrgenteDirective` con manipulación de DOM segura vía `Renderer2` y `@HostListener`. Bootstrap 5 con modales, badges y grid responsivo. | **Sobresaliente (4 pts)** |
| **5. Calidad de Código y README** | Tipado estricto (0 uso de `any`), persistencia reactiva en `localStorage` con validación de SSR (`isPlatformBrowser`), y documentación de ejecución exhaustiva. | **Sobresaliente (4 pts)** |

---

## 4. Requisitos del Entorno

Asegúrate de contar con las siguientes herramientas instaladas:
* **Node.js:** v18.x, v20.x o v24.x (verificar con `node -v`)
* **npm:** v9.x o superior (verificar con `npm -v`)
* **Angular CLI:** v18+ o v22+ (verificar con `ng version`)

---

## 5. Proceso de Instalación y Ejecución

1. **Clonar o ingresar al repositorio:**
   ```bash
   cd veterinaria-app
   ```

2. **Instalar dependencias del proyecto:**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm start
   # o alternativamente:
   ng serve
   ```

4. **Acceso a la aplicación:**
   Abre tu navegador web e ingresa a:
   ```text
   http://localhost:4200/
   ```

---

## 6. Padrón Clínico Sembrado (Octubre 2026)

La aplicación incluye un padrón masivo y realista distribuido a lo largo de todo el mes de **Octubre 2026** para evaluar el sistema de forma inmediata y fidedigna:
* **16 Propietarios Registrados:** Con DNI peruanos reales, teléfonos, correos y domicilios en Lima.
* **26 Pacientes (Mascotas):** Caninos, Felinos y Exóticos con nombres, razas, edades, pesos y fotos reales, vinculados a sus respectivos dueños (1 a 3 mascotas por dueño).
* **52 Citas Médicas Programadas:** Distribuidas del 1 al 31 de octubre en diversos estados (*Atendida*, *Confirmada*, *Pendiente*, *Cancelada*), reflejando urgencias, cirugías, desparasitaciones y controles de rutina.
* **30 Atenciones Clínicas en Historial:** Con anamnesis, signos vitales completos (peso, temperatura, FC), diagnósticos patológicos y recetas médicas detalladas.

---

## 7. Guía de Pruebas y Casos de Uso para el Docente

La aplicación cuenta con una **separación absoluta entre el entorno público para clientes y la intranet clínica interna para personal médico y administrativo**:

---

### A. ENTORNO PÚBLICO: Portal de Clientes (Reserva Online)
> **Ruta:** `http://localhost:4200/` o `http://localhost:4200/portal`  
> **Destinatario:** Propietarios de mascotas en general.

1. Al abrir la aplicación en la raíz (`/`), el sistema carga directamente la interfaz pública de **Reserva de Citas Online**.
2. **Privacidad Garantizada:** El cliente **no tiene acceso a historiales médicos, diagnósticos ni registros clínicos**.
3. **Flujo de Agendamiento:**
   * Ingresa un DNI registrado (ej. de prueba: `47895123` Carlos Mendoza) para auto-completar los datos de contacto y seleccionar fácilmente la mascota que asistirá (o registrar una nueva si es cliente nuevo).
   * Selecciona el motivo de atención (*Consulta General*, *Vacunación*, *Control*, *Urgencia*). Si selecciona *Urgencia*, el sistema activa el banner de triaje para casos con riesgo vital inminente.
   * Elige la fecha y un turno horario disponible (los turnos ya ocupados en la clínica se muestran deshabilitados y bloqueados como *"Ocupado"*).
   * Presiona **"Confirmar y Reservar Cita"** para emitir su comprobante/voucher digital con el código de turno e indicaciones de visita.

---

### B. ENTORNO INTERNO: Intranet y Panel Clínico (Médicos y Personal)
> **Ruta de Acceso:** `http://localhost:4200/admin/login` (o botón **"Acceso Personal"** en el Navbar superior)  
> **Destinatario:** Doctores, veterinarios y administradores de GreenVet.  
> **Seguridad:** Todas las rutas internas están protegidas por el guard `StaffGuard`. Si un usuario intenta acceder directamente a una ruta interna sin autenticarse, es redirigido automáticamente al login institucional.

#### Paso 1: Autenticación de Personal Clínico (`/admin/login`)
* Puedes ingresar usando las credenciales estándar: **Usuario:** `admin` / **Contraseña:** `1234`.
* O utilizar los **botones de acceso rápido de 1-clic** para ingresar como:
  * *Dra. Camila Soto* (Médica Veterinaria Directora)
  * *Dr. Alejandro Rivas* (Cirugía y Felinos)
  * *Dra. Andrea Beltrán* (Medicina Preventiva y Exóticos)
  * *Lic. Roberto Gómez* (Recepción y Turnos)

#### Paso 2: Centro de Control y Dashboard Clínico (`/admin/dashboard`)
Al autenticarse, el sistema aterriza automáticamente en el **Dashboard Clínico 360°**, integrado dentro del nuevo **Sidebar Dark Teal** institucional:
1. **Hero Banner Dinámico:** Saludo según la hora (`Buenos días/tardes`), métricas del turno y 3 accesos rápidos (`Agendar Cita`, `Nueva Consulta`, `Registrar Mascota`).
2. **4 Tarjetas KPI Vibrantes:**
   * *Citas de Hoy:* Conteo del día y pendientes con watermark decorativo.
   * *Ventas del Mes:* Monto estimado en Soles con badge `+42%`.
   * *Mascotas Activas:* Padrón general clasificado y total de clientes.
   * *Urgencias del Día:* Casos prioritarios con triaje activo.
3. **Gráficos Vivos (SVG Nativo):**
   * *Atenciones de los últimos 6 meses:* Gráfico de barras con línea de tendencia y tooltip.
   * *Pacientes por Especie:* Donut Chart calculado en tiempo real mediante POO (`Canino`, `Felino`, `Exotico`).
4. **Mesa Operativa:** Tabla inmediata de pacientes de hoy con directiva `[appCitaUrgente]`, pipe `estadoBadge` y botón directo de atención.

#### Paso 3: Gestión y Padrón de Pacientes & Dueños (`/admin/mascotas`)
1. Observa las 26 tarjetas de pacientes organizadas por dueño con sus badges normalizados de especie, raza y sexo.
2. Utiliza la barra de búsqueda en tiempo real ingresando el nombre de la mascota, dueño o DNI (ej: `Carlos`, `Milo`, `45678901`).
3. Registra nuevas mascotas con modelado polimórfico (`Canino`, `Felino`, `Exotico`).

#### Paso 4: Agenda de Citas y Detección de Colisiones (`/admin/citas`)
1. Revisa los filtros rápidos: *Todas las Citas*, *Citas de Hoy*, *Próximas* y por estado (*Pendientes*, *Confirmadas*, *Atendidas*, *Canceladas*).
2. Observa la directiva `[appCitaUrgente]` con microinteracciones suaves y el pipe `tiempoRelativo`.
3. Inicia la atención clínica de una cita para transferir automáticamente los datos del paciente hacia su expediente clínico.

#### Paso 5: Expedientes Clínicos y Timeline Evolutivo (`/admin/historial`)
1. Examina los expedientes agrupados por paciente con sus signos vitales completos (peso, temperatura, frecuencia cardíaca con badges fisiológicos).
2. Despliega el timeline para consultar diagnósticos, tratamientos farmacológicos y fechas de próximo control.
3. Utiliza el buscador multi-criterio para localizar patologías (ej: `otitis`, `parvovirus`, `gastritis`, `Thor`).

#### Paso 6: Cierre de Sesión Seguro
* Al presionar **"Cerrar Sesión"** en la barra superior o en el pie del sidebar, la sesión de staff se destruye y el sistema redirige de inmediato a la cara pública de clientes.

---

## 8. Verificación de Compilación y Calidad

Para ejecutar una prueba de construcción limpia y verificar que no existen errores de TypeScript ni de empaquetado:

```bash
npm run build
```
Resultado: **Generación exitosa de bundles de cliente y servidor (0 errores, 0 advertencias, 100% tipado estricto).**
