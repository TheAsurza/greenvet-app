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
      notas: [''],
      fecha: [this.fechaSeleccionada, [Validators.required]],
      hora: ['', [Validators.required]]
    });

    this.calcularSlotsDisponibles(this.fechaSeleccionada);
  }

  public buscarPorDni(dniManual?: string): void {
    const dni = (dniManual || this.reservaForm.get('documentoIdentidad')?.value || '').trim();
    if (!/^[0-9]{8}$/.test(dni)) {
      return;
    }

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
      this.propietarioEncontrado = null;
      this.mascotasDelPropietario = [];
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

  public calcularSlotsDisponibles(fecha: string): void {
    const todasLasCitas = this.citasService.getCitas();

    this.slotsHorarios = this.HORAS_CLINICAS.map(hora => {
      const fechaHoraIso = `${fecha}T${hora}`;
      const ocupada = todasLasCitas.some(
        c => c.fechaHora === fechaHoraIso && c.estado !== EstadoCita.CANCELADA
      );

      return {
        hora,
        disponible: !ocupada,
        motivoOcupado: ocupada ? 'Turno no disponible' : undefined
      };
    });
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

    const nuevaCita: Cita = {
      id: `cita-web-${Date.now().toString().slice(-6)}`,
      mascotaId,
      mascotaNombre: v.mascotaNombre.trim(),
      propietarioNombre: propietario.nombreCompleto,
      especie: v.especie,
      fechaHora,
      motivo: v.motivo,
      estado: EstadoCita.CONFIRMADA,
      veterinarioAsignado: 'Dr. Asignado de Guardia',
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
