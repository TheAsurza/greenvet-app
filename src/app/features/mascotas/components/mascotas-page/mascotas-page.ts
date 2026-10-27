import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MascotasService } from '../../../../core/services';
import { Mascota, Canino, Felino, Exotico, EspecieMascota, SexoMascota, Propietario } from '../../../../core/models';

@Component({
  selector: 'app-mascotas-page',
  templateUrl: './mascotas-page.html',
  styleUrls: ['./mascotas-page.scss'],
  standalone: false
})
export class MascotasPageComponent implements OnInit {
  public mascotas$!: Observable<Mascota[]>;
  public propietarios: Propietario[] = [];

  // Filtros (manteniendo el buscador y select funcional solicitado)
  public busqueda: string = '';
  public especieFiltro: string = 'TODAS';

  // Paginación y visualización simétrica sin scroll
  public paginaActual: number = 1;
  public readonly itemsPorPagina: number = 6;

  // Selección activa para el layout Master-Detail (Inspector Lateral)
  public pacienteSeleccionadoId: string | null = null;

  // Modales
  public mostrarModalRegistro: boolean = false;
  public mascotaSeleccionadaFicha: Mascota | null = null;
  public mostrarModalBuscarDueno: boolean = false;
  public guardadoExitoso: boolean = false;

  // Formulario y Jerarquía de Dueño
  public mascotaForm!: FormGroup;
  public asignarDuenoExistente: boolean = true;

  public EspecieMascota = EspecieMascota;
  public SexoMascota = SexoMascota;

  constructor(
    private mascotasService: MascotasService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mascotas$ = this.mascotasService.mascotas$;
    this.actualizarPropietarios();
    this.inicializarFormulario();

    this.route.queryParams.subscribe(params => {
      if (params['accion'] === 'nuevo-paciente' || params['abrirModal'] === 'true') {
        this.abrirModalRegistro();
      }
      if (params['mascotaId']) {
        this.pacienteSeleccionadoId = params['mascotaId'];
      }
    });
  }

  public seleccionarPaciente(mascota: Mascota): void {
    this.pacienteSeleccionadoId = mascota.id;
  }

  public getPacienteActivo(listaFiltrada: Mascota[]): Mascota | null {
    if (!listaFiltrada || listaFiltrada.length === 0) return null;
    if (this.pacienteSeleccionadoId) {
      const encontrado = listaFiltrada.find(m => m.id === this.pacienteSeleccionadoId);
      if (encontrado) return encontrado;
    }
    return listaFiltrada[0];
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

  public getTotalPaginas(listaFiltrada: Mascota[]): number {
    return Math.ceil(listaFiltrada.length / this.itemsPorPagina) || 1;
  }

  public getPacientesPaginados(listaFiltrada: Mascota[]): Mascota[] {
    const totalPaginas = this.getTotalPaginas(listaFiltrada);
    if (this.paginaActual > totalPaginas) {
      this.paginaActual = totalPaginas;
    }
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    return listaFiltrada.slice(inicio, inicio + this.itemsPorPagina);
  }

  public cambiarPagina(nuevaPagina: number, listaFiltrada: Mascota[]): void {
    const total = this.getTotalPaginas(listaFiltrada);
    if (nuevaPagina >= 1 && nuevaPagina <= total) {
      this.paginaActual = nuevaPagina;
      const paginados = this.getPacientesPaginados(listaFiltrada);
      if (paginados.length > 0) {
        this.seleccionarPaciente(paginados[0]);
      }
    }
  }

  public getPaginasArray(total: number): number[] {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  public mostrarDivisorLetra(actual: Mascota, index: number, lista: Mascota[]): boolean {
    if (index === 0) return true;
    const letraActual = actual.nombre.trim().charAt(0).toUpperCase();
    const letraAnterior = lista[index - 1].nombre.trim().charAt(0).toUpperCase();
    return letraActual !== letraAnterior;
  }

  public getInicial(nombre: string): string {
    return nombre ? nombre.trim().charAt(0).toUpperCase() : '';
  }

  private actualizarPropietarios(): void {
    this.propietarios = this.mascotasService.getPropietarios();
  }

  private inicializarFormulario(): void {
    this.mascotaForm = this.fb.group({
      // 1. JERARQUÍA DOMINANTE: DUEÑO
      propietarioExistenteId: [''],
      propietarioNombre: [''],
      propietarioDni: [''],
      propietarioTelefono: [''],
      propietarioEmail: [''],
      propietarioDireccion: [''],

      // 2. DATOS DE LA MASCOTA
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      especie: [EspecieMascota.CANINO, [Validators.required]],
      raza: ['', [Validators.required, Validators.minLength(2)]],
      sexo: [SexoMascota.MACHO, [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      pesoActualKg: [null, [Validators.required, Validators.min(0.2), Validators.max(100)]],
      esterilizado: [false],
      microchip: [''],
      alergias: ['']
    });

    this.actualizarValidadoresDueno();
  }

  public toggleModoDueno(usarExistente: boolean): void {
    this.asignarDuenoExistente = usarExistente;
    this.actualizarValidadoresDueno();
  }

  private actualizarValidadoresDueno(): void {
    const propExistente = this.mascotaForm.get('propietarioExistenteId');
    const pNombre = this.mascotaForm.get('propietarioNombre');
    const pDni = this.mascotaForm.get('propietarioDni');
    const pTel = this.mascotaForm.get('propietarioTelefono');
    const pEmail = this.mascotaForm.get('propietarioEmail');

    if (this.asignarDuenoExistente && this.propietarios.length > 0) {
      propExistente?.setValidators([Validators.required]);
      pNombre?.clearValidators();
      pDni?.clearValidators();
      pTel?.clearValidators();
      pEmail?.clearValidators();
    } else {
      propExistente?.clearValidators();
      pNombre?.setValidators([Validators.required, Validators.minLength(3)]);
      pDni?.setValidators([Validators.required, Validators.pattern(/^[0-9]{8}$/)]);
      pTel?.setValidators([Validators.required, Validators.pattern(/^[0-9]{9}$/)]);
      pEmail?.setValidators([Validators.required, Validators.email]);
    }

    propExistente?.updateValueAndValidity();
    pNombre?.updateValueAndValidity();
    pDni?.updateValueAndValidity();
    pTel?.updateValueAndValidity();
    pEmail?.updateValueAndValidity();
  }

  public abrirModalRegistro(): void {
    this.guardadoExitoso = false;
    this.actualizarPropietarios();
    this.asignarDuenoExistente = this.propietarios.length > 0;
    this.mostrarModalBuscarDueno = false;

    this.mascotaForm.reset({
      propietarioExistenteId: '',
      especie: EspecieMascota.CANINO,
      sexo: SexoMascota.MACHO,
      esterilizado: false
    });

    this.actualizarValidadoresDueno();
    this.mostrarModalRegistro = true;
  }

  public cerrarModalRegistro(): void {
    this.mostrarModalRegistro = false;
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
    this.mascotaForm.patchValue({
      propietarioExistenteId: prop.id
    });
    this.cerrarModalBuscarDueno();
  }

  public getPropietarioSeleccionado(): Propietario | undefined {
    const propId = this.mascotaForm.get('propietarioExistenteId')?.value;
    return this.propietarios.find(p => p.id === propId);
  }

  public activarRegistroNuevoDueno(): void {
    this.cerrarModalBuscarDueno();
    this.toggleModoDueno(false);
  }

  // --- Selección y Navegación ---
  public abrirFichaMedica(mascota: Mascota): void {
    this.seleccionarPaciente(mascota);
  }

  public cerrarFichaMedica(): void {
    this.mascotaSeleccionadaFicha = null;
  }

  public guardarMascota(): void {
    if (this.mascotaForm.invalid) {
      this.mascotaForm.markAllAsTouched();
      return;
    }

    const fv = this.mascotaForm.value;
    let propietario: Propietario;

    if (this.asignarDuenoExistente && fv.propietarioExistenteId) {
      propietario = this.propietarios.find(p => p.id === fv.propietarioExistenteId)!;
    } else {
      propietario = {
        id: 'prop-' + Date.now(),
        nombreCompleto: fv.propietarioNombre.trim(),
        documentoIdentidad: fv.propietarioDni.trim(),
        telefono: fv.propietarioTelefono.trim(),
        email: fv.propietarioEmail.trim(),
        direccion: fv.propietarioDireccion ? fv.propietarioDireccion.trim() : 'Lima',
        fechaRegistro: new Date()
      };
    }

    const nuevoId = 'masc-' + Date.now();
    const fichaClinica = {
      esterilizado: !!fv.esterilizado,
      microchip: fv.microchip ? fv.microchip.trim() : '',
      alergias: fv.alergias ? fv.alergias.split(',').map((a: string) => a.trim()).filter((a: string) => a.length > 0) : []
    };

    let nuevaMascota: Mascota;

    // Principio de Polimorfismo: instanciación de subclases según especie
    if (fv.especie === EspecieMascota.CANINO) {
      nuevaMascota = new Canino(
        nuevoId,
        fv.nombre.trim(),
        fv.raza.trim(),
        fv.sexo,
        new Date(fv.fechaNacimiento),
        Number(fv.pesoActualKg),
        propietario,
        fichaClinica
      );
    } else if (fv.especie === EspecieMascota.FELINO) {
      nuevaMascota = new Felino(
        nuevoId,
        fv.nombre.trim(),
        fv.raza.trim(),
        fv.sexo,
        new Date(fv.fechaNacimiento),
        Number(fv.pesoActualKg),
        propietario,
        fichaClinica
      );
    } else {
      nuevaMascota = new Exotico(
        nuevoId,
        fv.nombre.trim(),
        fv.raza.trim(),
        fv.sexo,
        new Date(fv.fechaNacimiento),
        Number(fv.pesoActualKg),
        propietario,
        fichaClinica
      );
    }

    this.mascotasService.agregarMascota(nuevaMascota);
    this.actualizarPropietarios();
    this.seleccionarPaciente(nuevaMascota);
    this.guardadoExitoso = true;
    setTimeout(() => {
      this.cerrarModalRegistro();
    }, 900);
  }

  public navegarAHistorial(mascota: Mascota): void {
    this.cerrarFichaMedica();
    this.router.navigate(['/admin/historial'], { queryParams: { mascotaId: mascota.id } });
  }

  public navegarAAgendar(mascota: Mascota): void {
    this.cerrarFichaMedica();
    this.router.navigate(['/admin/citas'], { queryParams: { mascotaId: mascota.id } });
  }

  public filtrarMascotas(mascotas: Mascota[]): Mascota[] {
    const filtradas = mascotas.filter(m => {
      const coincideBusqueda =
        !this.busqueda ||
        m.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        m.propietario.nombreCompleto.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        m.propietario.documentoIdentidad.includes(this.busqueda) ||
        m.raza.toLowerCase().includes(this.busqueda.toLowerCase());

      const coincideEspecie =
        this.especieFiltro === 'TODAS' || m.especie === this.especieFiltro;

      return coincideBusqueda && coincideEspecie;
    });

    return filtradas.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));
  }

  public esInvalido(campo: string): boolean {
    const c = this.mascotaForm.get(campo);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }
}
