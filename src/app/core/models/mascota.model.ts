import { Propietario } from './propietario.model';

export enum EspecieMascota {
  CANINO = 'Canino',
  FELINO = 'Felino',
  EXOTICO = 'Exótico'
}

export enum SexoMascota {
  MACHO = 'Macho',
  HEMBRA = 'Hembra'
}

export interface FichaClinicaBasica {
  alergias?: string[];
  esterilizado: boolean;
  microchip?: string;
}

/**
 * Clase abstracta que define la estructura base y comportamientos comunes de una mascota.
 * Aplica principios de Abstracción y Encapsulamiento.
 */
export abstract class Mascota {
  public fichaClinica: FichaClinicaBasica;

  constructor(
    public readonly id: string,
    public nombre: string,
    public readonly especie: EspecieMascota,
    public raza: string,
    public sexo: SexoMascota,
    public fechaNacimiento: Date,
    public pesoActualKg: number,
    public propietario: Propietario,
    fichaClinica?: Partial<FichaClinicaBasica>
  ) {
    this.fichaClinica = {
      alergias: fichaClinica?.alergias ?? [],
      esterilizado: fichaClinica?.esterilizado ?? false,
      microchip: fichaClinica?.microchip ?? ''
    };
  }

  /**
   * Método polimórfico: cada especie define su propio esquema preventivo de vacunas.
   */
  abstract getProtocoloVacunacion(): string[];

  /**
   * Método polimórfico: recomendaciones de nutrición y estilo de vida por especie.
   */
  abstract getRecomendacionesCuidado(): string;

  /**
   * Getter encapsulado para cálculo dinámico de edad en años cumplidos.
   */
  get edad(): number {
    const nacimiento = new Date(this.fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return Math.max(0, edad);
  }
}

/**
 * Subclase Canino - Implementa herencia y polimorfismo.
 */
export class Canino extends Mascota {
  constructor(
    id: string,
    nombre: string,
    raza: string,
    sexo: SexoMascota,
    fechaNacimiento: Date,
    pesoActualKg: number,
    propietario: Propietario,
    fichaClinica?: Partial<FichaClinicaBasica>
  ) {
    super(id, nombre, EspecieMascota.CANINO, raza, sexo, fechaNacimiento, pesoActualKg, propietario, fichaClinica);
  }

  getProtocoloVacunacion(): string[] {
    return [
      'Parvovirus / Distemper (Puppy)',
      'Séxtuple canina (Refuerzo anual)',
      'Antirrábica (Obligatoria anual)',
      'Bordetella (Tos de las perreras)'
    ];
  }

  getRecomendacionesCuidado(): string {
    return 'Paseos diarios mínimos de 30-45 min, cepillado semanal y control antiparasitario cada 3 meses.';
  }
}

/**
 * Subclase Felino - Implementa herencia y polimorfismo.
 */
export class Felino extends Mascota {
  constructor(
    id: string,
    nombre: string,
    raza: string,
    sexo: SexoMascota,
    fechaNacimiento: Date,
    pesoActualKg: number,
    propietario: Propietario,
    fichaClinica?: Partial<FichaClinicaBasica>
  ) {
    super(id, nombre, EspecieMascota.FELINO, raza, sexo, fechaNacimiento, pesoActualKg, propietario, fichaClinica);
  }

  getProtocoloVacunacion(): string[] {
    return [
      'Triple Felina (Panleucopenia, Rinotraqueitis, Calicivirus)',
      'Leucemia Felina (FeLV)',
      'Antirrábica (Refuerzo anual)'
    ];
  }

  getRecomendacionesCuidado(): string {
    return 'Enriquecimiento ambiental vertical, rascadores accesibles, fuente de agua fresca y chequeo renal periódico.';
  }
}

/**
 * Subclase Exotico - Implementa herencia y polimorfismo para animales no tradicionales.
 */
export class Exotico extends Mascota {
  constructor(
    id: string,
    nombre: string,
    raza: string, // Variedad / Especie específica (ej. Conejo Belier, Hurón, Erizo, etc.)
    sexo: SexoMascota,
    fechaNacimiento: Date,
    pesoActualKg: number,
    propietario: Propietario,
    fichaClinica?: Partial<FichaClinicaBasica>
  ) {
    super(id, nombre, EspecieMascota.EXOTICO, raza, sexo, fechaNacimiento, pesoActualKg, propietario, fichaClinica);
  }

  getProtocoloVacunacion(): string[] {
    return [
      'Control antiparasitario preventivo periódico',
      'Desparasitación interna / externa específica',
      'Chequeo profiláctico de dentición y pelaje / escamas / plumas'
    ];
  }

  getRecomendacionesCuidado(): string {
    return 'Hábitat con temperatura y humedad controlada, luz UV adecuada, sustrato limpio y dieta nutricional balanceada para la especie.';
  }
}


