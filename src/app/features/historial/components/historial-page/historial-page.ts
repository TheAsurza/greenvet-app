import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HistorialService, MascotasService, CitasService } from '../../../../core/services';
import { HistorialAtencion, Mascota, EstadoCita, Propietario, EspecieMascota, SexoMascota } from '../../../../core/models';

export interface ExpedientePaciente {
  mascota: Mascota;
  consultas: HistorialAtencion[];
  ultimaConsulta?: HistorialAtencion;
}

@Component({
  selector: 'app-historial-page',
  templateUrl: './historial-page.html',
  styleUrls: ['./historial-page.scss'],
  standalone: false
})
export class HistorialPageComponent implements OnInit {
  public historial$!: Observable<HistorialAtencion[]>;
  public mascotas$!: Observable<Mascota[]>;

  // Controles reactivos de búsqueda y filtrado por especie
  public busqueda: string = '';
  public especieFiltro: string = 'TODAS';
  public EspecieMascota = EspecieMascota;
  public SexoMascota = SexoMascota;

  // Selección activa para el layout Master-Detail (Inspector de Expediente)
  public pacienteSeleccionadoId: string | null = null;

  // Paginación compacta de expedientes (6 por página para simetría visual)
  public paginaActual: number = 1;
  public readonly itemsPorPagina: number = 6;

  // Modales
  public mostrarModal: boolean = false;
  public guardadoExitoso: boolean = false;

  // Jerarquía Dueño -> Mascota en el registro de atención
  public propietarios: Propietario[] = [];
  public propietarioSeleccionadoId: string = '';
  public mascotasDelPropietario: Mascota[] = [];
  public mostrarModalBuscarDueno: boolean = false;

  public atencionForm!: FormGroup;

  public veterinarios = [
    'Dra. Camila Soto (Médica Veterinaria)',
    'Dr. Alejandro Rivas (Especialista Felino y Cirugía)',
    'Dra. Andrea Beltrán (Medicina Preventiva)'
  ];

  constructor(
    private historialService: HistorialService,
    private mascotasService: MascotasService,
    private citasService: CitasService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.inicializarFormulario();
  }

  ngOnInit(): void {
    this.historial$ = this.historialService.historial$;
    this.mascotas$ = this.mascotasService.mascotas$;
    this.propietarios = this.mascotasService.getPropietarios();

    this.route.queryParams.subscribe(params => {
      if (params['mascotaId']) {
        this.pacienteSeleccionadoId = params['mascotaId'];
      }
      if (params['citaId'] || params['abrirModal'] === 'true' || params['accion'] === 'nueva-atencion') {
        this.abrirModalAtencion(params['mascotaId'], params['citaId'], params['motivo']);
      }
    });
  }

  // --- Selección Master-Detail ---
  public seleccionarExpediente(exp: ExpedientePaciente): void {
    this.pacienteSeleccionadoId = exp.mascota.id;
  }

  public getExpedienteActivo(expedientes: ExpedientePaciente[]): ExpedientePaciente | null {
    if (!expedientes || expedientes.length === 0) return null;
    if (this.pacienteSeleccionadoId) {
      const encontrado = expedientes.find(e => e.mascota.id === this.pacienteSeleccionadoId);
      if (encontrado) return encontrado;
    }
    return expedientes[0];
  }

  public setEspecieFiltro(especie: string): void {
    this.especieFiltro = especie;
    this.paginaActual = 1;
  }

  public limpiarBusqueda(): void {
    this.busqueda = '';
    this.paginaActual = 1;
  }

  public onBusquedaChange(): void {
    this.paginaActual = 1;
  }

  // --- Paginación ---
  public getTotalPaginas(expedientes: ExpedientePaciente[]): number {
    return Math.ceil(expedientes.length / this.itemsPorPagina) || 1;
  }

  public getExpedientesPaginados(expedientes: ExpedientePaciente[]): ExpedientePaciente[] {
    const totalPaginas = this.getTotalPaginas(expedientes);
    if (this.paginaActual > totalPaginas) {
      this.paginaActual = totalPaginas;
    }
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    return expedientes.slice(inicio, inicio + this.itemsPorPagina);
  }

  public cambiarPagina(nuevaPagina: number, expedientes: ExpedientePaciente[]): void {
    const total = this.getTotalPaginas(expedientes);
    if (nuevaPagina >= 1 && nuevaPagina <= total) {
      this.paginaActual = nuevaPagina;
      const paginados = this.getExpedientesPaginados(expedientes);
      if (paginados.length > 0) {
        this.seleccionarExpediente(paginados[0]);
      }
    }
  }

  public getPaginasArray(total: number): number[] {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  public getExpedientes(historial: HistorialAtencion[]): ExpedientePaciente[] {
    const atencionesFiltradas = this.filtrarHistorial(historial);
    const mapa = new Map<string, HistorialAtencion[]>();

    for (const h of atencionesFiltradas) {
      if (!mapa.has(h.mascotaId)) {
        mapa.set(h.mascotaId, []);
      }
      mapa.get(h.mascotaId)!.push(h);
    }

    const lista: ExpedientePaciente[] = [];
    for (const [mascotaId, consultas] of mapa.entries()) {
      const mascota = this.getMascota(mascotaId);
      if (mascota) {
        // Ordenar consultas por fecha más reciente primero
        consultas.sort((a, b) => new Date(b.fechaAtencion).getTime() - new Date(a.fechaAtencion).getTime());
        lista.push({
          mascota,
          consultas,
          ultimaConsulta: consultas[0]
        });
      }
    }

    // Ordenamiento alfabético garantizado
    return lista.sort((a, b) => a.mascota.nombre.localeCompare(b.mascota.nombre, 'es', { sensitivity: 'base' }));
  }

  private inicializarFormulario(): void {
    const hoyStr = new Date().toISOString().slice(0, 10);

    this.atencionForm = this.fb.group({
      mascotaId: ['', [Validators.required]],
      citaId: [''],
      fechaAtencion: [hoyStr, [Validators.required]],
      motivoConsulta: ['', [Validators.required, Validators.minLength(3)]],
      pesoKg: [null, [Validators.required, Validators.min(0.2), Validators.max(100)]],
      temperaturaCelsius: [38.5, [Validators.required, Validators.min(34), Validators.max(43)]],
      frecuenciaCardiacaBpm: [null],
      diagnostico: ['', [Validators.required, Validators.minLength(6)]],
      tratamientoRecetado: ['', [Validators.required, Validators.minLength(6)]],
      fechaProximaCita: [''],
      observaciones: [''],
      veterinarioTratante: [this.veterinarios[0], [Validators.required]]
    });
  }

  public abrirModalAtencion(mascotaId?: string, citaId?: string, motivo?: string): void {
    this.guardadoExitoso = false;
    this.propietarios = this.mascotasService.getPropietarios();
    this.mostrarModalBuscarDueno = false;
    const hoyStr = new Date().toISOString().slice(0, 10);

    const mId = mascotaId;

    if (mId) {
      const mascota = this.mascotasService.getMascotaById(mId);
      if (mascota) {
        this.propietarioSeleccionadoId = mascota.propietario.id;
        this.mascotasDelPropietario = this.mascotasService.getMascotasPorPropietario(mascota.propietario.id);
        this.atencionForm.patchValue({
          mascotaId: mascota.id,
          citaId: citaId ?? '',
          fechaAtencion: hoyStr,
          motivoConsulta: motivo ?? 'Control y Evaluación Clínica',
          pesoKg: mascota.pesoActualKg,
          temperaturaCelsius: 38.5,
          frecuenciaCardiacaBpm: mascota.especie === 'Felino' ? 140 : 90,
          diagnostico: '',
          tratamientoRecetado: '',
          fechaProximaCita: '',
          observaciones: '',
          veterinarioTratante: this.veterinarios[0]
        });
        this.mostrarModal = true;
        return;
      }
    }

    // Si abre manualmente sin pre-selección, inicia con dueño y mascota limpios
    this.propietarioSeleccionadoId = '';
    this.mascotasDelPropietario = [];
    this.atencionForm.patchValue({
      mascotaId: '',
      citaId: '',
      fechaAtencion: hoyStr,
      motivoConsulta: '',
      pesoKg: null,
      temperaturaCelsius: 38.5,
      frecuenciaCardiacaBpm: null,
      diagnostico: '',
      tratamientoRecetado: '',
      fechaProximaCita: '',
      observaciones: '',
      veterinarioTratante: this.veterinarios[0]
    });

    this.mostrarModal = true;
  }

  public cerrarModal(): void {
    this.mostrarModal = false;
    this.mostrarModalBuscarDueno = false;
  }

  // --- Sub-modal Lookup de Dueños ---
  public abrirModalBuscarDueno(): void {
    this.mostrarModalBuscarDueno = true;
  }

  public cerrarModalBuscarDueno(): void {
    this.mostrarModalBuscarDueno = false;
  }

  public onDuenoSeleccionado(prop: Propietario): void {
    this.propietarioSeleccionadoId = prop.id;
    this.mascotasDelPropietario = this.mascotasService.getMascotasPorPropietario(prop.id);
    const primeraMascota = this.mascotasDelPropietario[0];

    this.atencionForm.patchValue({
      mascotaId: primeraMascota ? primeraMascota.id : ''
    });

    if (primeraMascota) {
      this.onMascotaCambiada(primeraMascota.id);
    }
    this.cerrarModalBuscarDueno();
  }

  public getPropietarioSeleccionado(): Propietario | undefined {
    return this.propietarios.find(p => p.id === this.propietarioSeleccionadoId);
  }

  public onMascotaCambiada(mId: string): void {
    const mascota = this.mascotasService.getMascotaById(mId);
    if (mascota) {
      this.atencionForm.patchValue({
        pesoKg: mascota.pesoActualKg,
        frecuenciaCardiacaBpm: mascota.especie === 'Felino' ? 140 : 90
      });
    }
  }

  public programarControl(h: HistorialAtencion): void {
    this.router.navigate(['/admin/citas'], {
      queryParams: {
        mascotaId: h.mascotaId,
        fecha: h.fechaProximaCita || ''
      }
    });
  }

  public guardarAtencion(): void {
    if (this.atencionForm.invalid) {
      this.atencionForm.markAllAsTouched();
      return;
    }

    const fv = this.atencionForm.value;

    const registro: HistorialAtencion = {
      id: 'hist-' + Date.now(),
      mascotaId: fv.mascotaId,
      citaId: fv.citaId || undefined,
      fechaAtencion: fv.fechaAtencion,
      motivoConsulta: fv.motivoConsulta.trim(),
      diagnostico: fv.diagnostico.trim(),
      tratamientoRecetado: fv.tratamientoRecetado.trim(),
      signosVitales: {
        pesoKg: Number(fv.pesoKg),
        temperaturaCelsius: Number(fv.temperaturaCelsius),
        frecuenciaCardiacaBpm: fv.frecuenciaCardiacaBpm ? Number(fv.frecuenciaCardiacaBpm) : undefined
      },
      fechaProximaCita: fv.fechaProximaCita || undefined,
      observaciones: fv.observaciones ? fv.observaciones.trim() : undefined,
      veterinarioTratante: fv.veterinarioTratante
    };

    this.historialService.registrarAtencion(registro);

    // Si la atención provino de una cita agendada, actualizar su estado a ATENDIDA
    if (fv.citaId) {
      this.citasService.cambiarEstado(fv.citaId, EstadoCita.ATENDIDA);
    }

    // Actualizar peso actual de la mascota si cambió en la atención clínica
    const mascota = this.mascotasService.getMascotaById(fv.mascotaId);
    if (mascota && mascota.pesoActualKg !== Number(fv.pesoKg)) {
      mascota.pesoActualKg = Number(fv.pesoKg);
      this.mascotasService.actualizarMascota(mascota);
    }

    this.guardadoExitoso = true;
    setTimeout(() => {
      this.cerrarModal();
    }, 900);
  }

  public getMascota(id: string): Mascota | undefined {
    return this.mascotasService.getMascotaById(id);
  }

  public filtrarHistorial(historial: HistorialAtencion[]): HistorialAtencion[] {
    return historial.filter(h => {
      const mascota = this.getMascota(h.mascotaId);
      if (!mascota) return false;

      // 1. Filtrado por clasificación de especie
      const coincideEspecie = this.especieFiltro === 'TODAS' || mascota.especie === this.especieFiltro;
      if (!coincideEspecie) return false;

      // 2. Búsqueda reactiva por Mascota, Dueño, DNI, Raza, Diagnóstico o Motivo
      if (!this.busqueda.trim()) return true;

      const q = this.busqueda.toLowerCase().trim();

      const coincideMascota = mascota.nombre.toLowerCase().includes(q) ||
                              mascota.raza.toLowerCase().includes(q);

      const coincideDueno = mascota.propietario.nombreCompleto.toLowerCase().includes(q) ||
                            mascota.propietario.documentoIdentidad.includes(q);

      const coincideClinico = h.motivoConsulta.toLowerCase().includes(q) ||
                              h.diagnostico.toLowerCase().includes(q) ||
                              h.tratamientoRecetado.toLowerCase().includes(q);

      return coincideMascota || coincideDueno || coincideClinico;
    });
  }

  public esInvalido(campo: string): boolean {
    const c = this.atencionForm.get(campo);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }
}

