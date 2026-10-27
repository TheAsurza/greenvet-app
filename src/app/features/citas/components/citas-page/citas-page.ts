import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CitasService, MascotasService } from '../../../../core/services';
import { Cita, EstadoCita, MotivoConsulta, Mascota, Canino, Felino, Exotico, EspecieMascota, SexoMascota, Propietario } from '../../../../core/models';

export interface DiaCalendarioMes {
  fecha: Date;
  fechaIso: string;
  diaNumero: number;
  esMesActual: boolean;
  esHoy: boolean;
  citas: Cita[];
}

export interface DiaCalendarioSemana {
  fecha: Date;
  fechaIso: string;
  nombreDia: string;
  diaNumero: number;
  esHoy: boolean;
  citas: Cita[];
}

export interface SlotHorarioDia {
  hora: string;
  citas: Cita[];
  disponible: boolean;
}

@Component({
  selector: 'app-citas-page',
  templateUrl: './citas-page.html',
  styleUrls: ['./citas-page.scss'],
  standalone: false
})
export class CitasPageComponent implements OnInit {
  public citas$!: Observable<Cita[]>;
  public mascotas$!: Observable<Mascota[]>;

  // Modos de Visualización de la Agenda
  public vistaPrincipal: 'CALENDARIO' | 'LISTA' = 'CALENDARIO';
  public modoCalendario: 'MES' | 'SEMANA' | 'DIA' = 'SEMANA';
  public fechaCalendarioActual: Date = new Date();

  // Filtro por Período en Rango (Fecha Inicio y Fin)
  public fechaInicio: string = new Date().toISOString().slice(0, 10);
  public fechaFin: string = new Date().toISOString().slice(0, 10);
  public filtroEstado: string = 'TODAS';

  // Horas de atención GreenVet (08:00 a 18:00 hrs)
  public horasDisponibles: string[] = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];
  public fechaMinima: string = new Date().toISOString().slice(0, 10);

  // Propietarios y Mascotas en cascada
  public propietarios: Propietario[] = [];
  public mascotasDelPropietario: Mascota[] = [];

  // Sub-modal Lookup de Dueños
  public mostrarModalBuscarDueno: boolean = false;
  public busquedaDuenoTexto: string = '';

  // Modales principales
  public mostrarModalAgendar: boolean = false;
  public citaSeleccionada: Cita | null = null;
  public errorConflicto: boolean = false;
  public guardadoExitoso: boolean = false;

  // Registro rápido de mascota/dueño
  public modoRegistroRapido: boolean = false;
  public registroRapidoForm!: FormGroup;

  public citaForm!: FormGroup;
  public EstadoCita = EstadoCita;
  public MotivoConsulta = MotivoConsulta;
  public EspecieMascota = EspecieMascota;
  public SexoMascota = SexoMascota;

  public motivosDisponibles = Object.values(MotivoConsulta);
  public veterinarios = [
    'Dra. Camila Soto (Médica Veterinaria)',
    'Dr. Alejandro Rivas (Especialista Felino y Cirugía)',
    'Dra. Andrea Beltrán (Medicina Preventiva)'
  ];

  constructor(
    private citasService: CitasService,
    private mascotasService: MascotasService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.citas$ = this.citasService.citas$;
    this.mascotas$ = this.mascotasService.mascotas$;

    this.actualizarListasCascada();
    this.inicializarFormularios();

    this.route.queryParams.subscribe(params => {
      if (params['mascotaId']) {
        this.abrirModalAgendar(params['mascotaId'], params['fecha'], params['hora']);
      } else if (params['accion'] === 'nueva-cita' || params['abrirModal'] === 'true') {
        this.abrirModalAgendar(undefined, params['fecha'], params['hora']);
      }
    });
  }

  private actualizarListasCascada(): void {
    this.propietarios = this.mascotasService.getPropietarios();
  }

  private inicializarFormularios(): void {
    const hoyStr = new Date().toISOString().slice(0, 10);

    this.citaForm = this.fb.group({
      propietarioId: ['', [Validators.required]],
      mascotaId: ['', [Validators.required]],
      fecha: [hoyStr, [Validators.required]],
      hora: ['09:00', [Validators.required]],
      motivo: [MotivoConsulta.CONSULTA_GENERAL, [Validators.required]],
      veterinarioAsignado: [this.veterinarios[0], [Validators.required]],
      notas: ['']
    });

    this.citaForm.get('propietarioId')?.valueChanges.subscribe(propId => {
      if (propId) {
        this.mascotasDelPropietario = this.mascotasService.getMascotasPorPropietario(propId);
        const primeraMascota = this.mascotasDelPropietario[0]?.id || '';
        this.citaForm.get('mascotaId')?.setValue(primeraMascota);
      } else {
        this.mascotasDelPropietario = [];
        this.citaForm.get('mascotaId')?.setValue('');
      }
    });

    this.registroRapidoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      especie: [EspecieMascota.CANINO, [Validators.required]],
      raza: ['', [Validators.required]],
      sexo: [SexoMascota.MACHO, [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      pesoActualKg: [null, [Validators.required, Validators.min(0.2)]],
      usarDuenoExistente: [false],
      propietarioNombre: ['', [Validators.required]],
      propietarioDni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      propietarioTelefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      propietarioEmail: ['', [Validators.required, Validators.email]],
      propietarioDireccion: ['']
    });
  }

  // --- Métodos de Navegación y Vistas de Calendario ---
  public getTituloCalendario(): string {
    const d = this.fechaCalendarioActual;
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    if (this.modoCalendario === 'MES') {
      return `${meses[d.getMonth()]} ${d.getFullYear()}`;
    }
    if (this.modoCalendario === 'SEMANA') {
      const lunes = this.getMonday(d);
      const domingo = new Date(lunes);
      domingo.setDate(domingo.getDate() + 6);
      return `Semana del ${lunes.getDate()} de ${meses[lunes.getMonth()]} al ${domingo.getDate()} de ${meses[domingo.getMonth()]} ${domingo.getFullYear()}`;
    }
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return `${dias[d.getDay()]}, ${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
  }

  public irFechaAnterior(): void {
    const d = new Date(this.fechaCalendarioActual);
    if (this.modoCalendario === 'MES') {
      d.setMonth(d.getMonth() - 1);
    } else if (this.modoCalendario === 'SEMANA') {
      d.setDate(d.getDate() - 7);
    } else {
      d.setDate(d.getDate() - 1);
    }
    this.fechaCalendarioActual = d;
  }

  public irFechaSiguiente(): void {
    const d = new Date(this.fechaCalendarioActual);
    if (this.modoCalendario === 'MES') {
      d.setMonth(d.getMonth() + 1);
    } else if (this.modoCalendario === 'SEMANA') {
      d.setDate(d.getDate() + 7);
    } else {
      d.setDate(d.getDate() + 1);
    }
    this.fechaCalendarioActual = d;
  }

  public irFechaHoy(): void {
    this.fechaCalendarioActual = new Date();
  }

  public irADia(fecha: Date): void {
    this.fechaCalendarioActual = new Date(fecha);
    this.modoCalendario = 'DIA';
  }

  public getMonday(d: Date): Date {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    date.setDate(diff);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  public toIsoDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  public getDiasMes(citas: Cita[]): DiaCalendarioMes[] {
    const d = this.fechaCalendarioActual;
    const year = d.getFullYear();
    const month = d.getMonth();
    const hoyIso = this.toIsoDate(new Date());

    const primerDia = new Date(year, month, 1);
    const inicioGrid = this.getMonday(primerDia);

    const resultado: DiaCalendarioMes[] = [];
    const fechaIter = new Date(inicioGrid);

    // 35 celdas para cubrir el mes completo
    for (let i = 0; i < 35; i++) {
      const iso = this.toIsoDate(fechaIter);
      const citasDelDia = citas
        .filter(c => c.fechaHora && c.fechaHora.slice(0, 10) === iso)
        .sort((a, b) => a.fechaHora.localeCompare(b.fechaHora));

      resultado.push({
        fecha: new Date(fechaIter),
        fechaIso: iso,
        diaNumero: fechaIter.getDate(),
        esMesActual: fechaIter.getMonth() === month,
        esHoy: iso === hoyIso,
        citas: citasDelDia
      });
      fechaIter.setDate(fechaIter.getDate() + 1);
    }
    return resultado;
  }

  public getDiasSemana(citas: Cita[]): DiaCalendarioSemana[] {
    const lunes = this.getMonday(this.fechaCalendarioActual);
    const hoyIso = this.toIsoDate(new Date());
    const nombres = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    const resultado: DiaCalendarioSemana[] = [];
    const fechaIter = new Date(lunes);

    for (let i = 0; i < 7; i++) {
      const iso = this.toIsoDate(fechaIter);
      const citasDelDia = citas
        .filter(c => c.fechaHora && c.fechaHora.slice(0, 10) === iso)
        .sort((a, b) => a.fechaHora.localeCompare(b.fechaHora));

      resultado.push({
        fecha: new Date(fechaIter),
        fechaIso: iso,
        nombreDia: nombres[i],
        diaNumero: fechaIter.getDate(),
        esHoy: iso === hoyIso,
        citas: citasDelDia
      });
      fechaIter.setDate(fechaIter.getDate() + 1);
    }
    return resultado;
  }

  public getSlotsDia(citas: Cita[]): SlotHorarioDia[] {
    const iso = this.toIsoDate(this.fechaCalendarioActual);
    const citasDelDia = citas.filter(c => c.fechaHora && c.fechaHora.slice(0, 10) === iso);

    return this.horasDisponibles.map(h => {
      const horaPrefix = h.slice(0, 2);
      const citasEnHora = citasDelDia.filter(c => c.fechaHora.slice(11, 13) === horaPrefix);
      return {
        hora: h,
        citas: citasEnHora,
        disponible: citasEnHora.length === 0
      };
    });
  }

  // --- Filtros por Rango de Período y Estado (Vista Lista) ---
  public limpiarFiltros(): void {
    this.fechaInicio = '';
    this.fechaFin = '';
    this.filtroEstado = 'TODAS';
  }

  public setFiltroHoy(): void {
    const hoy = this.toIsoDate(new Date());
    this.fechaInicio = hoy;
    this.fechaFin = hoy;
  }

  public setFiltroSemana(): void {
    const lunes = this.getMonday(new Date());
    const domingo = new Date(lunes);
    domingo.setDate(domingo.getDate() + 6);
    this.fechaInicio = this.toIsoDate(lunes);
    this.fechaFin = this.toIsoDate(domingo);
  }

  public setFiltroMes(): void {
    const ahora = new Date();
    const firstDay = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
    const lastDay = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 0);
    this.fechaInicio = this.toIsoDate(firstDay);
    this.fechaFin = this.toIsoDate(lastDay);
  }

  public getCitasPorPeriodo(citas: Cita[]): Cita[] {
    if (!this.fechaInicio && !this.fechaFin) {
      return citas;
    }
    return citas.filter(c => {
      const f = c.fechaHora.slice(0, 10);
      if (this.fechaInicio && this.fechaFin) {
        return f >= this.fechaInicio && f <= this.fechaFin;
      }
      if (this.fechaInicio) {
        return f >= this.fechaInicio;
      }
      return f <= this.fechaFin;
    });
  }

  public filtrarCitas(citas: Cita[]): Cita[] {
    const citasPeriodo = this.getCitasPorPeriodo(citas);
    if (this.filtroEstado === 'TODAS') {
      return citasPeriodo;
    }
    return citasPeriodo.filter(c => c.estado === this.filtroEstado);
  }

  public getConteoContextual(citas: Cita[], estado?: EstadoCita): number {
    const citasPeriodo = this.getCitasPorPeriodo(citas);
    if (!estado) return citasPeriodo.length;
    return citasPeriodo.filter(c => c.estado === estado).length;
  }

  // --- Sub-modal Lookup de Dueños ---
  public abrirModalBuscarDueno(): void {
    this.busquedaDuenoTexto = '';
    this.mostrarModalBuscarDueno = true;
  }

  public cerrarModalBuscarDueno(): void {
    this.mostrarModalBuscarDueno = false;
  }

  public getPropietariosFiltrados(): Propietario[] {
    if (!this.busquedaDuenoTexto.trim()) {
      return this.propietarios;
    }
    const q = this.busquedaDuenoTexto.toLowerCase().trim();
    return this.propietarios.filter(p =>
      p.nombreCompleto.toLowerCase().includes(q) ||
      p.documentoIdentidad.includes(q) ||
      p.telefono.includes(q)
    );
  }

  public seleccionarPropietario(prop: Propietario): void {
    this.citaForm.patchValue({
      propietarioId: prop.id
    });
    this.cerrarModalBuscarDueno();
  }

  public getPropietarioSeleccionado(): Propietario | undefined {
    const propId = this.citaForm.get('propietarioId')?.value;
    return this.propietarios.find(p => p.id === propId);
  }

  // --- Modal Agendar ---
  public abrirModalAgendar(mascotaIdPreseleccionada?: string, fechaPreseleccionada?: string, horaPreseleccionada?: string): void {
    this.errorConflicto = false;
    this.guardadoExitoso = false;
    this.modoRegistroRapido = false;
    this.actualizarListasCascada();

    const hoyStr = new Date().toISOString().slice(0, 10);
    const fechaFinal = fechaPreseleccionada || hoyStr;
    const horaFinal = horaPreseleccionada || '09:00';

    if (mascotaIdPreseleccionada) {
      const mascota = this.mascotasService.getMascotaById(mascotaIdPreseleccionada);
      if (mascota) {
        this.mascotasDelPropietario = this.mascotasService.getMascotasPorPropietario(mascota.propietario.id);
        this.citaForm.patchValue({
          propietarioId: mascota.propietario.id,
          mascotaId: mascota.id,
          fecha: fechaFinal,
          hora: horaFinal,
          motivo: fechaPreseleccionada ? MotivoConsulta.CONTROL_RUTINA : MotivoConsulta.CONSULTA_GENERAL,
          veterinarioAsignado: this.veterinarios[0],
          notas: fechaPreseleccionada ? 'Control derivado de atención médica previa' : ''
        });
        this.mostrarModalAgendar = true;
        return;
      }
    }

    // Iniciar con formulario limpio
    this.mascotasDelPropietario = [];
    this.citaForm.patchValue({
      propietarioId: '',
      mascotaId: '',
      fecha: fechaFinal,
      hora: horaFinal,
      motivo: MotivoConsulta.CONSULTA_GENERAL,
      veterinarioAsignado: this.veterinarios[0],
      notas: ''
    });

    this.mostrarModalAgendar = true;
  }

  public cerrarModalAgendar(): void {
    this.mostrarModalAgendar = false;
    this.errorConflicto = false;
    this.modoRegistroRapido = false;
    this.cerrarModalBuscarDueno();
  }

  // --- Registro Rápido ---
  public activarRegistroRapido(): void {
    this.cerrarModalBuscarDueno();
    const propActual = this.getPropietarioSeleccionado();

    if (propActual) {
      this.registroRapidoForm.patchValue({
        usarDuenoExistente: true,
        propietarioNombre: propActual.nombreCompleto,
        propietarioDni: propActual.documentoIdentidad,
        propietarioTelefono: propActual.telefono,
        propietarioEmail: propActual.email,
        propietarioDireccion: propActual.direccion
      });
    } else {
      this.registroRapidoForm.reset({
        especie: EspecieMascota.CANINO,
        sexo: SexoMascota.MACHO,
        usarDuenoExistente: false
      });
    }

    this.modoRegistroRapido = true;
  }

  public cancelarRegistroRapido(): void {
    this.modoRegistroRapido = false;
  }

  public guardarRegistroRapido(): void {
    if (this.registroRapidoForm.invalid) {
      this.registroRapidoForm.markAllAsTouched();
      return;
    }

    const rfv = this.registroRapidoForm.value;
    const propActual = this.getPropietarioSeleccionado();
    let propietario: Propietario;

    if (rfv.usarDuenoExistente && propActual) {
      propietario = propActual;
    } else {
      propietario = {
        id: 'prop-' + Date.now(),
        nombreCompleto: rfv.propietarioNombre.trim(),
        documentoIdentidad: rfv.propietarioDni.trim(),
        telefono: rfv.propietarioTelefono.trim(),
        email: rfv.propietarioEmail.trim(),
        direccion: rfv.propietarioDireccion ? rfv.propietarioDireccion.trim() : 'Lima',
        fechaRegistro: new Date()
      };
    }

    const nuevoMascotaId = 'masc-' + Date.now();
    let nuevaMascota: Mascota;

    if (rfv.especie === EspecieMascota.CANINO) {
      nuevaMascota = new Canino(
        nuevoMascotaId,
        rfv.nombre.trim(),
        rfv.raza.trim(),
        rfv.sexo,
        new Date(rfv.fechaNacimiento),
        Number(rfv.pesoActualKg),
        propietario
      );
    } else if (rfv.especie === EspecieMascota.FELINO) {
      nuevaMascota = new Felino(
        nuevoMascotaId,
        rfv.nombre.trim(),
        rfv.raza.trim(),
        rfv.sexo,
        new Date(rfv.fechaNacimiento),
        Number(rfv.pesoActualKg),
        propietario
      );
    } else {
      nuevaMascota = new Exotico(
        nuevoMascotaId,
        rfv.nombre.trim(),
        rfv.raza.trim(),
        rfv.sexo,
        new Date(rfv.fechaNacimiento),
        Number(rfv.pesoActualKg),
        propietario
      );
    }

    this.mascotasService.agregarMascota(nuevaMascota);
    this.actualizarListasCascada();

    this.citaForm.patchValue({
      propietarioId: propietario.id,
      mascotaId: nuevaMascota.id
    });
    this.mascotasDelPropietario = this.mascotasService.getMascotasPorPropietario(propietario.id);
    this.modoRegistroRapido = false;
  }

  public guardarCita(): void {
    if (this.citaForm.invalid) {
      this.citaForm.markAllAsTouched();
      return;
    }

    this.errorConflicto = false;
    const fv = this.citaForm.value;
    const mascota = this.mascotasService.getMascotaById(fv.mascotaId);

    const fechaHoraFinal = `${fv.fecha}T${fv.hora}`;

    const nuevaCita: Cita = {
      id: 'cita-' + Date.now(),
      mascotaId: fv.mascotaId,
      mascotaNombre: mascota ? mascota.nombre : 'Paciente',
      propietarioNombre: mascota ? mascota.propietario.nombreCompleto : 'Cliente',
      especie: mascota ? mascota.especie : 'General',
      fechaHora: fechaHoraFinal,
      motivo: fv.motivo,
      estado: EstadoCita.PENDIENTE,
      notas: fv.notas?.trim(),
      veterinarioAsignado: fv.veterinarioAsignado
    };

    const exito = this.citasService.agendarCita(nuevaCita);
    if (!exito) {
      this.errorConflicto = true;
      return;
    }

    this.guardadoExitoso = true;
    setTimeout(() => {
      this.cerrarModalAgendar();
    }, 900);
  }

  // --- Modal Detalle / Inspección (Sin Mutar) ---
  public abrirDetalleCita(cita: Cita): void {
    this.citaSeleccionada = { ...cita };
  }

  public cerrarDetalleCita(): void {
    this.citaSeleccionada = null;
  }

  public cambiarEstadoEnDetalle(nuevoEstado: EstadoCita): void {
    if (!this.citaSeleccionada) return;
    this.citasService.cambiarEstado(this.citaSeleccionada.id, nuevoEstado);
    this.citaSeleccionada.estado = nuevoEstado;
  }

  public iniciarAtencion(cita: Cita): void {
    this.cerrarDetalleCita();
    this.router.navigate(['/admin/historial'], {
      queryParams: {
        mascotaId: cita.mascotaId,
        citaId: cita.id,
        motivo: cita.motivo,
        abrirModal: 'true'
      }
    });
  }

  public getMascota(mascotaId: string): Mascota | undefined {
    return this.mascotasService.getMascotaById(mascotaId);
  }

  public esInvalido(campo: string): boolean {
    const c = this.citaForm.get(campo);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  public esInvalidoRapido(campo: string): boolean {
    const c = this.registroRapidoForm.get(campo);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }
}
