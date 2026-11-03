import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CitasService, MascotasService } from '../../../../core/services';
import {
  Cita,
  EstadoCita,
  MotivoConsulta,
  Mascota,
  Canino,
  Felino,
  Exotico,
  EspecieMascota,
  SexoMascota,
  Propietario
} from '../../../../core/models';

interface HorarioSlot {
  hora: string;
  disponible: boolean;
  motivoOcupado?: string;
}

@Component({
  selector: 'app-portal-page',
  templateUrl: './portal-page.html',
  styleUrls: ['./portal-page.scss'],
  standalone: false
})
export class PortalPageComponent implements OnInit, OnDestroy {
  public reservaForm!: FormGroup;
  public fechaMinima: string = '';
  public fechaSeleccionada: string = '';
  public horaSeleccionada: string = '';
  public slotsHorarios: HorarioSlot[] = [];

  // Propietario reconocido (solo para auto-completar contacto y mascotas en el formulario)
  public propietarioEncontrado: Propietario | null = null;
  public busquedaDniRealizada: boolean = false;
  public dniConsultado: string = '';
  public mascotasDelPropietario: Mascota[] = [];
  public esNuevaMascota: boolean = false;

  // Estado del flujo
  public guardandoCita: boolean = false;
  public citaConfirmada: Cita | null = null;
  public mensajeError: string = '';

  // Enums para selectores
  public EstadoCita = EstadoCita;
  public MotivoConsulta = MotivoConsulta;
  public EspecieMascota = EspecieMascota;
  public motivosDisponibles = Object.values(MotivoConsulta);
  public especiesDisponibles = Object.values(EspecieMascota);

  // Catálogo de Especialistas Clínicos con días (0=Dom, 1=Lun, ..., 6=Sáb) y rango de horas válidas
  public readonly ESPECIALISTAS = [
    {
      id: 'auto',
      nombre: 'Asignación Automática según Motivo y Especie (Recomendado)',
      especialidad: 'Triaje Clínico Optimizado',
      horarios: 'Lunes a Sábado (08:00 - 18:00)',
      diasSemana: [1, 2, 3, 4, 5, 6],
      horaInicio: 8,
      horaFin: 18
    },
    {
      id: 'camila',
      nombre: 'Dra. Camila Soto',
      especialidad: 'Cirugía & Tejidos Blandos',
      horarios: 'Lunes, Miércoles y Viernes (08:00 - 14:00)',
      diasSemana: [1, 3, 5],
      horaInicio: 8,
      horaFin: 14
    },
    {
      id: 'alejandro',
      nombre: 'Dr. Alejandro Rivas',
      especialidad: 'Medicina Felina & Manejo Cat-Friendly',
      horarios: 'Martes, Jueves y Sábados (09:00 - 17:00)',
      diasSemana: [2, 4, 6],
      horaInicio: 9,
      horaFin: 17
    },
    {
      id: 'andrea',
      nombre: 'Dra. Andrea Beltrán',
      especialidad: 'Medicina Preventiva & Animales Exóticos',
      horarios: 'Lunes a Viernes (08:00 - 16:00)',
      diasSemana: [1, 2, 3, 4, 5],
      horaInicio: 8,
      horaFin: 16
    },
    {
      id: 'martin',
      nombre: 'Dr. Martín Valdivia',
      especialidad: 'Traumatología & Cirugía Ortopédica',
      horarios: 'Miércoles a Sábados (10:00 - 18:00)',
      diasSemana: [3, 4, 5, 6],
      horaInicio: 10,
      horaFin: 18
    }
  ];

  // Horarios de atención clínica (08:00 a 18:00)
  public readonly HORAS_CLINICAS = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00'
  ];

  // Clientes frecuentes para demostración de autocompletado en reserva
  public readonly DNI_DEMOS = [
    { dni: '47895123', nombre: 'Carlos Mendoza' },
    { dni: '72349012', nombre: 'Valeria Espinoza' },
    { dni: '10984567', nombre: 'Jorge Luis Paredes' }
  ];

  private subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private citasService: CitasService,
    private mascotasService: MascotasService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.configurarFechas();
    this.inicializarFormulario();

    // Sincronización continua con turnos del sistema para actualizar disponibilidad en tiempo real
    this.subs.add(
      this.citasService.citas$.subscribe(() => {
        if (this.fechaSeleccionada) {
          this.calcularSlotsDisponibles(this.fechaSeleccionada);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private configurarFechas(): void {
    const hoy = new Date();
    this.fechaMinima = hoy.toISOString().slice(0, 10);

    // Por defecto sugerir mañana para atención programada
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    this.fechaSeleccionada = manana.toISOString().slice(0, 10);
  }

  private inicializarFormulario(): void {
    this.reservaForm = this.fb.group({
      // Datos del Propietario
      documentoIdentidad: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      email: ['', [Validators.required, Validators.email]],

      // Datos de la Mascota
      mascotaId: [''],
      mascotaNombre: ['', [Validators.required, Validators.minLength(2)]],
      especie: [EspecieMascota.CANINO, [Validators.required]],
      raza: ['', [Validators.required]],

      // Datos de la Cita
      motivo: [MotivoConsulta.CONSULTA_GENERAL, [Validators.required]],
      especialistaId: ['auto'],
      notas: [''],
      fecha: [this.fechaSeleccionada, [Validators.required]],
      hora: ['', [Validators.required]]
    });

    this.calcularSlotsDisponibles(this.fechaSeleccionada);
  }

  public buscarPorDni(dniManual?: string): void {
    const dni = (dniManual || this.reservaForm.get('documentoIdentidad')?.value || '').trim();
    if (!/^[0-9]{8}$/.test(dni)) {
      this.busquedaDniRealizada = false;
      this.dniConsultado = '';
      return;
    }

    this.busquedaDniRealizada = true;
    this.dniConsultado = dni;

    const propietarios = this.mascotasService.getPropietarios();
    const encontrado = propietarios.find(p => p.documentoIdentidad === dni);

    if (encontrado) {
      this.propietarioEncontrado = encontrado;
      this.mascotasDelPropietario = this.mascotasService.getMascotasPorPropietario(encontrado.id);

      this.reservaForm.patchValue({
        documentoIdentidad: encontrado.documentoIdentidad,
        nombreCompleto: encontrado.nombreCompleto,
        telefono: encontrado.telefono,
        email: encontrado.email
      });

      if (this.mascotasDelPropietario.length > 0) {
        this.seleccionarMascotaExistente(this.mascotasDelPropietario[0]);
      } else {
        this.habilitarNuevaMascota();
      }
    } else {
      // Cliente no registrado: resetear datos del titular anterior y de la mascota
      this.propietarioEncontrado = null;
      this.mascotasDelPropietario = [];
      this.reservaForm.patchValue({
        documentoIdentidad: dni,
        nombreCompleto: '',
        telefono: '',
        email: ''
      });
      this.habilitarNuevaMascota();
    }
  }

  public seleccionarMascotaExistente(mascota: Mascota): void {
    this.esNuevaMascota = false;
    this.reservaForm.patchValue({
      mascotaId: mascota.id,
      mascotaNombre: mascota.nombre,
      especie: mascota.especie,
      raza: mascota.raza
    });
  }

  public habilitarNuevaMascota(): void {
    this.esNuevaMascota = true;
    this.reservaForm.patchValue({
      mascotaId: '',
      mascotaNombre: '',
      especie: EspecieMascota.CANINO,
      raza: ''
    });
  }

  public cambiarFecha(nuevaFecha: string): void {
    this.fechaSeleccionada = nuevaFecha;
    this.horaSeleccionada = '';
    this.reservaForm.patchValue({ fecha: nuevaFecha, hora: '' });
    this.calcularSlotsDisponibles(nuevaFecha);
  }

  public seleccionarHora(slot: HorarioSlot): void {
    if (!slot.disponible) return;
    this.horaSeleccionada = slot.hora;
    this.reservaForm.patchValue({ hora: slot.hora });
    this.mensajeError = '';
  }

  public onEspecialistaChange(): void {
    this.horaSeleccionada = '';
    this.reservaForm.patchValue({ hora: '' });
    this.calcularSlotsDisponibles(this.fechaSeleccionada);
  }

  public calcularSlotsDisponibles(fecha: string): void {
    const todasLasCitas = this.citasService.getCitas();
    const espId = this.reservaForm?.get('especialistaId')?.value || 'auto';
    const especialista = this.ESPECIALISTAS.find(e => e.id === espId) || this.ESPECIALISTAS[0];

    // Obtener día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)
    const [anio, mes, dia] = fecha.split('-').map(Number);
    const fechaObj = new Date(anio, mes - 1, dia);
    const diaSemana = fechaObj.getDay();

    const atiendeHoy = especialista.diasSemana.includes(diaSemana);

    this.slotsHorarios = this.HORAS_CLINICAS.map(hora => {
      const horaNum = parseInt(hora.slice(0, 2), 10);
      const dentroDeHorario = atiendeHoy && horaNum >= especialista.horaInicio && horaNum < especialista.horaFin;

      const fechaHoraIso = `${fecha}T${hora}`;
      const ocupada = todasLasCitas.some(
        c => c.fechaHora === fechaHoraIso && c.estado !== EstadoCita.CANCELADA
      );

      let disponible = dentroDeHorario && !ocupada;
      let motivoOcupado: string | undefined = undefined;

      if (!atiendeHoy) {
        motivoOcupado = `No atiende ${this.getNombreDiaSemana(diaSemana)}`;
      } else if (horaNum < especialista.horaInicio || horaNum >= especialista.horaFin) {
        motivoOcupado = 'Fuera del turno de atención';
      } else if (ocupada) {
        motivoOcupado = 'Turno ya ocupado';
      }

      return {
        hora,
        disponible,
        motivoOcupado
      };
    });
  }

  private getNombreDiaSemana(dia: number): string {
    const dias = ['domingos', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábados'];
    return dias[dia] || 'este día';
  }

  public reservarCita(): void {
    this.mensajeError = '';

    if (this.reservaForm.invalid || !this.horaSeleccionada) {
      this.reservaForm.markAllAsTouched();
      if (!this.horaSeleccionada) {
        this.mensajeError = 'Por favor selecciona un turno horario disponible.';
      } else {
        this.mensajeError = 'Por favor completa todos los campos requeridos con datos válidos.';
      }
      return;
    }

    this.guardandoCita = true;
    const v = this.reservaForm.value;

    // Asegurar que el propietario y mascota queden en el padrón si son nuevos
    let propietario = this.propietarioEncontrado;
    if (!propietario) {
      propietario = {
        id: `prop-${Date.now()}`,
        nombreCompleto: v.nombreCompleto.trim(),
        documentoIdentidad: v.documentoIdentidad.trim(),
        telefono: v.telefono.trim(),
        email: v.email.trim(),
        fechaRegistro: new Date()
      };
    }

    let mascotaId = v.mascotaId;
    if (!mascotaId || this.esNuevaMascota) {
      mascotaId = `masc-${Date.now()}`;
      const fechaNac = new Date();
      fechaNac.setFullYear(fechaNac.getFullYear() - 2); // Por defecto estimar 2 años

      let nuevaEntidadMascota: Mascota;
      if (v.especie === EspecieMascota.CANINO) {
        nuevaEntidadMascota = new Canino(
          mascotaId, v.mascotaNombre.trim(), v.raza.trim(), SexoMascota.MACHO, fechaNac, 8, propietario
        );
      } else if (v.especie === EspecieMascota.FELINO) {
        nuevaEntidadMascota = new Felino(
          mascotaId, v.mascotaNombre.trim(), v.raza.trim(), SexoMascota.MACHO, fechaNac, 4, propietario
        );
      } else {
        nuevaEntidadMascota = new Exotico(
          mascotaId, v.mascotaNombre.trim(), v.raza.trim(), SexoMascota.MACHO, fechaNac, 1, propietario
        );
      }
      this.mascotasService.agregarMascota(nuevaEntidadMascota);
    }

    const fechaHora = `${this.fechaSeleccionada}T${this.horaSeleccionada}`;

    // Determinar especialista asignado según selección del cliente o triaje por motivo/especie
    let doctorAsignado = 'Dra. Camila Soto (Cirugía & Tejidos Blandos)';
    if (v.especialistaId && v.especialistaId !== 'auto') {
      const esp = this.ESPECIALISTAS.find(e => e.id === v.especialistaId);
      if (esp) {
        doctorAsignado = `${esp.nombre} (${esp.especialidad})`;
      }
    } else {
      if (v.especie === EspecieMascota.FELINO) {
        doctorAsignado = 'Dr. Alejandro Rivas (Especialista en Medicina Felina)';
      } else if (v.especie === EspecieMascota.EXOTICO || v.motivo === MotivoConsulta.VACUNACION) {
        doctorAsignado = 'Dra. Andrea Beltrán (Medicina Preventiva & Exóticos)';
      } else if (v.motivo === MotivoConsulta.CIRUGIA) {
        doctorAsignado = 'Dr. Martín Valdivia (Traumatología & Cirugía Ortopédica)';
      }
    }

    const nuevaCita: Cita = {
      id: `cita-web-${Date.now().toString().slice(-6)}`,
      mascotaId,
      mascotaNombre: v.mascotaNombre.trim(),
      propietarioNombre: propietario.nombreCompleto,
      especie: v.especie,
      fechaHora,
      motivo: v.motivo,
      estado: EstadoCita.CONFIRMADA,
      veterinarioAsignado: doctorAsignado,
      notas: v.notas ? `[Reserva Online] ${v.notas.trim()}` : '[Reserva Online]'
    };

    const exito = this.citasService.agendarCita(nuevaCita);
    this.guardandoCita = false;

    if (exito) {
      this.citaConfirmada = nuevaCita;
    } else {
      this.mensajeError = 'El horario seleccionado acaba de ser ocupado. Por favor elige otro horario.';
      this.calcularSlotsDisponibles(this.fechaSeleccionada);
    }
  }

  public reservarOtraCita(): void {
    this.citaConfirmada = null;
    this.mensajeError = '';
    this.horaSeleccionada = '';
    this.propietarioEncontrado = null;
    this.mascotasDelPropietario = [];
    this.esNuevaMascota = false;
    this.configurarFechas();
    this.inicializarFormulario();
  }
}
