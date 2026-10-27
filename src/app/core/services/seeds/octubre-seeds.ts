import { Cita, EstadoCita, MotivoConsulta, HistorialAtencion, Mascota, Canino, Felino, Exotico, SexoMascota, Propietario } from '../../models';

/**
 * Padrón Clínico Realista de GreenVet para Octubre 2026.
 * Incluye 16 Propietarios, 26 Mascotas diversas (1 a 3 mascotas por dueño)
 * y 52 Citas cronológicas (máximo 1 a 3 citas por mascota en todo el mes).
 */

export function generarPadronMascotas(): Mascota[] {
  // 16 Dueños
  const p1: Propietario = {
    id: 'prop-1',
    nombreCompleto: 'Carlos Mendoza Ramos',
    documentoIdentidad: '47895123',
    telefono: '987654321',
    email: 'carlos.mendoza@gmail.com',
    direccion: 'Av. Las Palmeras 450, Los Olivos',
    fechaRegistro: new Date('2025-01-15')
  };

  const p2: Propietario = {
    id: 'prop-2',
    nombreCompleto: 'Valeria Espinoza Prado',
    documentoIdentidad: '72349012',
    telefono: '912345678',
    email: 'valeria.espinoza@hotmail.com',
    direccion: 'Jr. Huancavelica 220, Lima',
    fechaRegistro: new Date('2025-02-10')
  };

  const p3: Propietario = {
    id: 'prop-3',
    nombreCompleto: 'Jorge Luis Paredes',
    documentoIdentidad: '10984567',
    telefono: '998877665',
    email: 'jorge.paredes@yahoo.com',
    direccion: 'Calle Los Cedros 184, Miraflores',
    fechaRegistro: new Date('2025-03-01')
  };

  const p4: Propietario = {
    id: 'prop-4',
    nombreCompleto: 'Mariana Torres Silva',
    documentoIdentidad: '45678912',
    telefono: '945123456',
    email: 'mariana.torres@gmail.com',
    direccion: 'Av. Primavera 1020, Santiago de Surco',
    fechaRegistro: new Date('2025-04-12')
  };

  const p5: Propietario = {
    id: 'prop-5',
    nombreCompleto: 'Andrés Salazar Vega',
    documentoIdentidad: '09871234',
    telefono: '967890123',
    email: 'andres.salazar@outlook.com',
    direccion: 'Av. San Felipe 630, Jesús María',
    fechaRegistro: new Date('2025-05-20')
  };

  const p6: Propietario = {
    id: 'prop-6',
    nombreCompleto: 'Sofía Benavides Castro',
    documentoIdentidad: '71234890',
    telefono: '954321987',
    email: 'sofia.benavides@gmail.com',
    direccion: 'Calle Dos de Mayo 430, San Isidro',
    fechaRegistro: new Date('2025-06-01')
  };

  const p7: Propietario = {
    id: 'prop-7',
    nombreCompleto: 'Roberto Gómez Luján',
    documentoIdentidad: '08765432',
    telefono: '932145678',
    email: 'roberto.gomez@gmail.com',
    direccion: 'Av. Javier Prado Este 2400, San Borja',
    fechaRegistro: new Date('2025-06-15')
  };

  const p8: Propietario = {
    id: 'prop-8',
    nombreCompleto: 'Claudia Morales Rivas',
    documentoIdentidad: '43567890',
    telefono: '921345678',
    email: 'claudia.morales@yahoo.es',
    direccion: 'Av. Brasil 1850, Jesús María',
    fechaRegistro: new Date('2025-07-04')
  };

  const p9: Propietario = {
    id: 'prop-9',
    nombreCompleto: 'Diego Alarcón Flores',
    documentoIdentidad: '74125896',
    telefono: '978654123',
    email: 'diego.alarcon@gmail.com',
    direccion: 'Calle Bellavista 210, Magdalena',
    fechaRegistro: new Date('2025-07-22')
  };

  const p10: Propietario = {
    id: 'prop-10',
    nombreCompleto: 'Patricia Villanueva Gil',
    documentoIdentidad: '10293847',
    telefono: '965412389',
    email: 'patricia.villanueva@hotmail.com',
    direccion: 'Av. Arequipa 3210, San Isidro',
    fechaRegistro: new Date('2025-08-01')
  };

  const p11: Propietario = {
    id: 'prop-11',
    nombreCompleto: 'Fernando Cárdenas Ríos',
    documentoIdentidad: '46589712',
    telefono: '984512376',
    email: 'fernando.cardenas@gmail.com',
    direccion: 'Av. Sucre 780, Pueblo Libre',
    fechaRegistro: new Date('2025-08-14')
  };

  const p12: Propietario = {
    id: 'prop-12',
    nombreCompleto: 'Lucía Quispe Mamani',
    documentoIdentidad: '73849501',
    telefono: '919283746',
    email: 'lucia.quispe@gmail.com',
    direccion: 'Calle Berlín 540, Miraflores',
    fechaRegistro: new Date('2025-08-29')
  };

  const p13: Propietario = {
    id: 'prop-13',
    nombreCompleto: 'Martín Zevallos Peña',
    documentoIdentidad: '07654321',
    telefono: '934567812',
    email: 'martin.zevallos@outlook.com',
    direccion: 'Av. Salaverry 1420, Jesús María',
    fechaRegistro: new Date('2025-09-05')
  };

  const p14: Propietario = {
    id: 'prop-14',
    nombreCompleto: 'Gabriela Huamán Ortiz',
    documentoIdentidad: '41829304',
    telefono: '956781234',
    email: 'gabriela.huaman@gmail.com',
    direccion: 'Calle Monterrey 230, Chacarilla, Surco',
    fechaRegistro: new Date('2025-09-12')
  };

  const p15: Propietario = {
    id: 'prop-15',
    nombreCompleto: 'Enrique Farfán Soto',
    documentoIdentidad: '70918273',
    telefono: '923456781',
    email: 'enrique.farfan@gmail.com',
    direccion: 'Av. La Marina 1640, San Miguel',
    fechaRegistro: new Date('2025-09-20')
  };

  const p16: Propietario = {
    id: 'prop-16',
    nombreCompleto: 'Andrea Carrillo Vega',
    documentoIdentidad: '44332211',
    telefono: '987123450',
    email: 'andrea.carrillo@hotmail.com',
    direccion: 'Jr. Batalla de Junín 310, Barranco',
    fechaRegistro: new Date('2025-09-25')
  };

  // 26 Mascotas pertenecientes a estos 16 dueños
  return [
    // Dueño 1 (Carlos Mendoza)
    new Canino('masc-1', 'Max', 'Golden Retriever', SexoMascota.MACHO, new Date('2022-04-10'), 29.5, p1, { esterilizado: true, microchip: '981098123456789', alergias: ['Pollo'] }),

    // Dueño 2 (Valeria Espinoza - 2 mascotas)
    new Felino('masc-2', 'Luna', 'Siamés', SexoMascota.HEMBRA, new Date('2023-08-22'), 4.1, p2, { esterilizado: true, microchip: '981098998877665', alergias: [] }),
    new Exotico('masc-3', 'Kiwi', 'Conejo Belier', SexoMascota.MACHO, new Date('2024-05-18'), 1.8, p2, { esterilizado: true, microchip: '', alergias: [] }),

    // Dueño 3 (Jorge Luis Paredes)
    new Canino('masc-4', 'Rocky', 'Bulldog Francés', SexoMascota.MACHO, new Date('2024-01-05'), 12.3, p3, { esterilizado: false, microchip: '', alergias: ['Dermatitis atópica'] }),

    // Dueño 4 (Mariana Torres - 2 mascotas)
    new Felino('masc-5', 'Misha', 'Persa', SexoMascota.HEMBRA, new Date('2023-11-14'), 3.9, p4, { esterilizado: true, microchip: '981098334455667', alergias: [] }),
    new Exotico('masc-6', 'Coco', 'Loro Cabeza Amarilla', SexoMascota.MACHO, new Date('2023-03-25'), 0.42, p4, { esterilizado: false, microchip: '', alergias: [] }),

    // Dueño 5 (Andrés Salazar)
    new Canino('masc-7', 'Thor', 'Pastor Alemán', SexoMascota.MACHO, new Date('2022-09-03'), 34.2, p5, { esterilizado: true, microchip: '981098776655443', alergias: ['Picadura de pulga'] }),

    // Dueño 6 (Sofía Benavides - 2 mascotas)
    new Canino('masc-8', 'Milo', 'Beagle', SexoMascota.MACHO, new Date('2023-02-18'), 14.0, p6, { esterilizado: true, microchip: '981098445566778', alergias: [] }),
    new Felino('masc-9', 'Nala', 'Bengalí', SexoMascota.HEMBRA, new Date('2023-10-05'), 4.5, p6, { esterilizado: true, microchip: '981098556677889', alergias: [] }),

    // Dueño 7 (Roberto Gómez)
    new Canino('masc-10', 'Toby', 'Poodle Toy', SexoMascota.MACHO, new Date('2021-06-12'), 4.8, p7, { esterilizado: true, microchip: '', alergias: ['Picadura de abeja'] }),

    // Dueño 8 (Claudia Morales - 2 mascotas)
    new Canino('masc-11', 'Bruno', 'Labrador Retriever', SexoMascota.MACHO, new Date('2022-12-01'), 31.0, p8, { esterilizado: true, microchip: '981098667788990', alergias: [] }),
    new Exotico('masc-12', 'Simona', 'Cobaya Americana', SexoMascota.HEMBRA, new Date('2024-04-10'), 0.95, p8, { esterilizado: false, microchip: '', alergias: [] }),

    // Dueño 9 (Diego Alarcón)
    new Canino('masc-13', 'Zeus', 'Rottweiler', SexoMascota.MACHO, new Date('2021-11-20'), 42.5, p9, { esterilizado: true, microchip: '981098223344556', alergias: [] }),

    // Dueño 10 (Patricia Villanueva - 2 mascotas)
    new Felino('masc-14', 'Oliver', 'Maine Coon', SexoMascota.MACHO, new Date('2022-07-15'), 7.8, p10, { esterilizado: true, microchip: '981098112233445', alergias: [] }),
    new Canino('masc-15', 'Canela', 'Chihuahua', SexoMascota.HEMBRA, new Date('2023-05-30'), 2.4, p10, { esterilizado: false, microchip: '', alergias: ['Hipoalergénico'] }),

    // Dueño 11 (Fernando Cárdenas)
    new Canino('masc-16', 'Balto', 'Siberian Husky', SexoMascota.MACHO, new Date('2023-01-10'), 25.0, p11, { esterilizado: true, microchip: '981098778899001', alergias: [] }),

    // Dueño 12 (Lucía Quispe)
    new Felino('masc-17', 'Pelusa', 'Angora Turco', SexoMascota.HEMBRA, new Date('2023-09-19'), 3.6, p12, { esterilizado: true, microchip: '', alergias: [] }),

    // Dueño 13 (Martín Zevallos - 2 mascotas)
    new Canino('masc-18', 'Jack', 'Jack Russell Terrier', SexoMascota.MACHO, new Date('2022-08-08'), 6.5, p13, { esterilizado: true, microchip: '981098665544332', alergias: [] }),
    new Exotico('masc-19', 'Tambor', 'Conejo Enano Holandés', SexoMascota.MACHO, new Date('2024-03-02'), 1.1, p13, { esterilizado: true, microchip: '', alergias: [] }),

    // Dueño 14 (Gabriela Huamán)
    new Canino('masc-20', 'Kira', 'Doberman', SexoMascota.HEMBRA, new Date('2023-04-14'), 28.3, p14, { esterilizado: true, microchip: '981098554433221', alergias: [] }),

    // Dueño 15 (Enrique Farfán - 2 mascotas)
    new Felino('masc-21', 'Tom', 'Común Europeo', SexoMascota.MACHO, new Date('2022-05-11'), 4.7, p15, { esterilizado: true, microchip: '981098443322110', alergias: [] }),
    new Exotico('masc-22', 'Jerry', 'Hamster Sirio', SexoMascota.MACHO, new Date('2024-06-20'), 0.14, p15, { esterilizado: false, microchip: '', alergias: [] }),

    // Dueño 16 (Andrea Carrillo - 4 mascotas para completar riqueza)
    new Canino('masc-23', 'Bella', 'Shih Tzu', SexoMascota.HEMBRA, new Date('2023-03-08'), 5.2, p16, { esterilizado: true, microchip: '981098332211009', alergias: [] }),
    new Felino('masc-24', 'Simba', 'British Shorthair', SexoMascota.MACHO, new Date('2023-12-15'), 5.0, p16, { esterilizado: true, microchip: '981098221100998', alergias: [] }),
    new Canino('masc-25', 'Lucas', 'Cocker Spaniel', SexoMascota.MACHO, new Date('2022-10-25'), 13.1, p16, { esterilizado: true, microchip: '981098110099887', alergias: ['Otitis crónica'] }),
    new Exotico('masc-26', 'Paco', 'Perico Australiano', SexoMascota.MACHO, new Date('2024-01-15'), 0.04, p16, { esterilizado: false, microchip: '', alergias: [] })
  ];
}

export interface SemillaData {
  citas: Cita[];
  historial: HistorialAtencion[];
}

export function generarSemillasOctubre(): SemillaData {
  const citas: Cita[] = [
    // 01 de Octubre
    {
      id: 'cita-oct-01',
      mascotaId: 'masc-1',
      mascotaNombre: 'Max',
      propietarioNombre: 'Carlos Mendoza Ramos',
      especie: 'Canino',
      fechaHora: '2026-10-01T09:00',
      motivo: MotivoConsulta.CONSULTA_GENERAL,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Chequeo semestral rutinario de articulaciones.'
    },
    {
      id: 'cita-oct-02',
      mascotaId: 'masc-2',
      mascotaNombre: 'Luna',
      propietarioNombre: 'Valeria Espinoza Prado',
      especie: 'Felino',
      fechaHora: '2026-10-01T15:30',
      motivo: MotivoConsulta.VACUNACION,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)',
      notas: 'Refuerzo de vacuna triple felina.'
    },

    // 02 de Octubre
    {
      id: 'cita-oct-03',
      mascotaId: 'masc-4',
      mascotaNombre: 'Rocky',
      propietarioNombre: 'Jorge Luis Paredes',
      especie: 'Canino',
      fechaHora: '2026-10-02T10:30',
      motivo: MotivoConsulta.URGENCIA,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Prurito intenso en zona interdigital y eritema abdominal.'
    },
    {
      id: 'cita-oct-04',
      mascotaId: 'masc-3',
      mascotaNombre: 'Kiwi',
      propietarioNombre: 'Valeria Espinoza Prado',
      especie: 'Exótico',
      fechaHora: '2026-10-02T16:00',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Andrea Beltrán (Medicina Preventiva)',
      notas: 'Inspección de crecimiento de molares e incisivos.'
    },

    // 03 de Octubre
    {
      id: 'cita-oct-05',
      mascotaId: 'masc-8',
      mascotaNombre: 'Milo',
      propietarioNombre: 'Sofía Benavides Castro',
      especie: 'Canino',
      fechaHora: '2026-10-03T11:00',
      motivo: MotivoConsulta.VACUNACION,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Andrea Beltrán (Medicina Preventiva)',
      notas: 'Vacuna séxtuple anual y antiparasitario interno.'
    },
    {
      id: 'cita-oct-06',
      mascotaId: 'masc-5',
      mascotaNombre: 'Misha',
      propietarioNombre: 'Mariana Torres Silva',
      especie: 'Felino',
      fechaHora: '2026-10-03T14:30',
      motivo: MotivoConsulta.CONSULTA_GENERAL,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)',
      notas: 'Decaimiento leve y rechazo temporal de pienso seco.'
    },

    // 04 de Octubre
    {
      id: 'cita-oct-07',
      mascotaId: 'masc-7',
      mascotaNombre: 'Thor',
      propietarioNombre: 'Andrés Salazar Vega',
      especie: 'Canino',
      fechaHora: '2026-10-04T08:30',
      motivo: MotivoConsulta.CONSULTA_GENERAL,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Cojera intermitente en miembro posterior derecho tras ejercicio.'
    },
    {
      id: 'cita-oct-08',
      mascotaId: 'masc-6',
      mascotaNombre: 'Coco',
      propietarioNombre: 'Mariana Torres Silva',
      especie: 'Exótico',
      fechaHora: '2026-10-04T16:30',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Andrea Beltrán (Medicina Preventiva)',
      notas: 'Corte higiénico de uñas y evaluación de plumaje.'
    },

    // 05 de Octubre
    {
      id: 'cita-oct-09',
      mascotaId: 'masc-10',
      mascotaNombre: 'Toby',
      propietarioNombre: 'Roberto Gómez Luján',
      especie: 'Canino',
      fechaHora: '2026-10-05T10:00',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Chequeo geriátrico anual y auscultación cardíaca.'
    },
    {
      id: 'cita-oct-10',
      mascotaId: 'masc-4',
      mascotaNombre: 'Rocky',
      propietarioNombre: 'Jorge Luis Paredes',
      especie: 'Canino',
      fechaHora: '2026-10-05T15:00',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Evolución de tratamiento dermatológico tópico.'
    },

    // 06 de Octubre
    {
      id: 'cita-oct-11',
      mascotaId: 'masc-11',
      mascotaNombre: 'Bruno',
      propietarioNombre: 'Claudia Morales Rivas',
      especie: 'Canino',
      fechaHora: '2026-10-06T09:30',
      motivo: MotivoConsulta.VACUNACION,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Andrea Beltrán (Medicina Preventiva)',
      notas: 'Inmunización séxtuple y desparasitación externa con pipeta.'
    },
    {
      id: 'cita-oct-12',
      mascotaId: 'masc-7',
      mascotaNombre: 'Thor',
      propietarioNombre: 'Andrés Salazar Vega',
      especie: 'Canino',
      fechaHora: '2026-10-06T14:00',
      motivo: MotivoConsulta.CIRUGIA,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)',
      notas: 'Limpieza quirúrgica y sutura menor por corte en almohadilla plantar.'
    },

    // 07 de Octubre
    {
      id: 'cita-oct-13',
      mascotaId: 'masc-12',
      mascotaNombre: 'Simona',
      propietarioNombre: 'Claudia Morales Rivas',
      especie: 'Exótico',
      fechaHora: '2026-10-07T11:30',
      motivo: MotivoConsulta.CONSULTA_GENERAL,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Andrea Beltrán (Medicina Preventiva)',
      notas: 'Suplementación de vitamina C y pesaje de rutina.'
    },
    {
      id: 'cita-oct-14',
      mascotaId: 'masc-9',
      mascotaNombre: 'Nala',
      propietarioNombre: 'Sofía Benavides Castro',
      especie: 'Felino',
      fechaHora: '2026-10-07T16:00',
      motivo: MotivoConsulta.VACUNACION,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)',
      notas: 'Vacunación antirrábica obligatoria.'
    },

    // 08 de Octubre
    {
      id: 'cita-oct-15',
      mascotaId: 'masc-13',
      mascotaNombre: 'Zeus',
      propietarioNombre: 'Diego Alarcón Flores',
      especie: 'Canino',
      fechaHora: '2026-10-08T09:00',
      motivo: MotivoConsulta.CONSULTA_GENERAL,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Evaluación de displasia de codo y pesaje muscular.'
    },
    {
      id: 'cita-oct-16',
      mascotaId: 'masc-14',
      mascotaNombre: 'Oliver',
      propietarioNombre: 'Patricia Villanueva Gil',
      especie: 'Felino',
      fechaHora: '2026-10-08T17:00',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.CANCELADA,
      veterinarioAsignado: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)',
      notas: 'Cancelada por el cliente por fuerza mayor.'
    },

    // 09 de Octubre
    {
      id: 'cita-oct-17',
      mascotaId: 'masc-15',
      mascotaNombre: 'Canela',
      propietarioNombre: 'Patricia Villanueva Gil',
      especie: 'Canino',
      fechaHora: '2026-10-09T10:00',
      motivo: MotivoConsulta.CONSULTA_GENERAL,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Evaluación profiláctica de sarro dental y encías.'
    },
    {
      id: 'cita-oct-18',
      mascotaId: 'masc-16',
      mascotaNombre: 'Balto',
      propietarioNombre: 'Fernando Cárdenas Ríos',
      especie: 'Canino',
      fechaHora: '2026-10-09T15:30',
      motivo: MotivoConsulta.VACUNACION,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Andrea Beltrán (Medicina Preventiva)',
      notas: 'Vacunación antirrábica y desparasitación externa.'
    },

    // 10 de Octubre
    {
      id: 'cita-oct-19',
      mascotaId: 'masc-7',
      mascotaNombre: 'Thor',
      propietarioNombre: 'Andrés Salazar Vega',
      especie: 'Canino',
      fechaHora: '2026-10-10T08:30',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)',
      notas: 'Retiro de puntos de almohadilla plantar.'
    },
    {
      id: 'cita-oct-20',
      mascotaId: 'masc-17',
      mascotaNombre: 'Pelusa',
      propietarioNombre: 'Lucía Quispe Mamani',
      especie: 'Felino',
      fechaHora: '2026-10-10T14:30',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)',
      notas: 'Desparasitación preventiva interna y externa.'
    },

    // 11 de Octubre
    {
      id: 'cita-oct-21',
      mascotaId: 'masc-18',
      mascotaNombre: 'Jack',
      propietarioNombre: 'Martín Zevallos Peña',
      especie: 'Canino',
      fechaHora: '2026-10-11T11:00',
      motivo: MotivoConsulta.CONSULTA_GENERAL,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Revisión de otitis ceruminosa leve tras baño en peluquería.'
    },
    {
      id: 'cita-oct-22',
      mascotaId: 'masc-19',
      mascotaNombre: 'Tambor',
      propietarioNombre: 'Martín Zevallos Peña',
      especie: 'Exótico',
      fechaHora: '2026-10-11T16:00',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Andrea Beltrán (Medicina Preventiva)',
      notas: 'Revisión de dientes y asesoría de forraje timothy.'
    },

    // 12 de Octubre
    {
      id: 'cita-oct-23',
      mascotaId: 'masc-20',
      mascotaNombre: 'Kira',
      propietarioNombre: 'Gabriela Huamán Ortiz',
      especie: 'Canino',
      fechaHora: '2026-10-12T09:30',
      motivo: MotivoConsulta.VACUNACION,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Andrea Beltrán (Medicina Preventiva)',
      notas: 'Refuerzo de vacuna séxtuple anual.'
    },
    {
      id: 'cita-oct-24',
      mascotaId: 'masc-1',
      mascotaNombre: 'Max',
      propietarioNombre: 'Carlos Mendoza Ramos',
      especie: 'Canino',
      fechaHora: '2026-10-12T15:00',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Revisión de respuesta a condroprotectores articulares.'
    },

    // 13 de Octubre
    {
      id: 'cita-oct-25',
      mascotaId: 'masc-21',
      mascotaNombre: 'Tom',
      propietarioNombre: 'Enrique Farfán Soto',
      especie: 'Felino',
      fechaHora: '2026-10-13T10:30',
      motivo: MotivoConsulta.CONSULTA_GENERAL,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)',
      notas: 'Control por vómitos de bolas de pelo.'
    },
    {
      id: 'cita-oct-26',
      mascotaId: 'masc-22',
      mascotaNombre: 'Jerry',
      propietarioNombre: 'Enrique Farfán Soto',
      especie: 'Exótico',
      fechaHora: '2026-10-13T16:30',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Andrea Beltrán (Medicina Preventiva)',
      notas: 'Pesaje diminuto y revisión de abazones.'
    },

    // 14 de Octubre
    {
      id: 'cita-oct-27',
      mascotaId: 'masc-23',
      mascotaNombre: 'Bella',
      propietarioNombre: 'Andrea Carrillo Vega',
      especie: 'Canino',
      fechaHora: '2026-10-14T09:00',
      motivo: MotivoConsulta.CONSULTA_GENERAL,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Lagrimeo constante y manchas marrones en lagrimales.'
    },
    {
      id: 'cita-oct-28',
      mascotaId: 'masc-24',
      mascotaNombre: 'Simba',
      propietarioNombre: 'Andrea Carrillo Vega',
      especie: 'Felino',
      fechaHora: '2026-10-14T14:00',
      motivo: MotivoConsulta.VACUNACION,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)',
      notas: 'Refuerzo de triple felina.'
    },

    // 15 de Octubre (Ayer)
    {
      id: 'cita-oct-29',
      mascotaId: 'masc-25',
      mascotaNombre: 'Lucas',
      propietarioNombre: 'Andrea Carrillo Vega',
      especie: 'Canino',
      fechaHora: '2026-10-15T10:00',
      motivo: MotivoConsulta.CONSULTA_GENERAL,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Lavado ótico preventivo por antecedentes de otitis.'
    },
    {
      id: 'cita-oct-30',
      mascotaId: 'masc-26',
      mascotaNombre: 'Paco',
      propietarioNombre: 'Andrea Carrillo Vega',
      especie: 'Exótico',
      fechaHora: '2026-10-15T15:30',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.ATENDIDA,
      veterinarioAsignado: 'Dra. Andrea Beltrán (Medicina Preventiva)',
      notas: 'Revisión de alas y suplemento de calcio en bloque.'
    },

    // 16 de Octubre (HOY)
    {
      id: 'cita-oct-31',
      mascotaId: 'masc-4',
      mascotaNombre: 'Rocky',
      propietarioNombre: 'Jorge Luis Paredes',
      especie: 'Canino',
      fechaHora: '2026-10-16T09:00',
      motivo: MotivoConsulta.CONSULTA_GENERAL,
      estado: EstadoCita.CONFIRMADA,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Revisión general de pliegues faciales y paladar blando.'
    },
    {
      id: 'cita-oct-32',
      mascotaId: 'masc-10',
      mascotaNombre: 'Toby',
      propietarioNombre: 'Roberto Gómez Luján',
      especie: 'Canino',
      fechaHora: '2026-10-16T11:30',
      motivo: MotivoConsulta.VACUNACION,
      estado: EstadoCita.PENDIENTE,
      veterinarioAsignado: 'Dra. Andrea Beltrán (Medicina Preventiva)',
      notas: 'Refuerzo de rabia anual.'
    },
    {
      id: 'cita-oct-33',
      mascotaId: 'masc-3',
      mascotaNombre: 'Kiwi',
      propietarioNombre: 'Valeria Espinoza Prado',
      especie: 'Exótico',
      fechaHora: '2026-10-16T16:00',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.PENDIENTE,
      veterinarioAsignado: 'Dra. Andrea Beltrán (Medicina Preventiva)',
      notas: 'Control quincenal de peso y heno.'
    },

    // 17 de Octubre (Mañana)
    {
      id: 'cita-oct-34',
      mascotaId: 'masc-14',
      mascotaNombre: 'Oliver',
      propietarioNombre: 'Patricia Villanueva Gil',
      especie: 'Felino',
      fechaHora: '2026-10-17T10:00',
      motivo: MotivoConsulta.CONSULTA_GENERAL,
      estado: EstadoCita.CONFIRMADA,
      veterinarioAsignado: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)',
      notas: 'Control ecográfico preventivo de vejiga y riñones.'
    },
    {
      id: 'cita-oct-35',
      mascotaId: 'masc-13',
      mascotaNombre: 'Zeus',
      propietarioNombre: 'Diego Alarcón Flores',
      especie: 'Canino',
      fechaHora: '2026-10-17T15:00',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.PENDIENTE,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Evaluación de marcha sobre superficie blanda.'
    },

    // 18 de Octubre
    {
      id: 'cita-oct-36',
      mascotaId: 'masc-2',
      mascotaNombre: 'Luna',
      propietarioNombre: 'Valeria Espinoza Prado',
      especie: 'Felino',
      fechaHora: '2026-10-18T11:00',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.CONFIRMADA,
      veterinarioAsignado: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)',
      notas: 'Chequeo bucal preventivo.'
    },
    {
      id: 'cita-oct-37',
      mascotaId: 'masc-6',
      mascotaNombre: 'Coco',
      propietarioNombre: 'Mariana Torres Silva',
      especie: 'Exótico',
      fechaHora: '2026-10-18T16:30',
      motivo: MotivoConsulta.VACUNACION,
      estado: EstadoCita.PENDIENTE,
      veterinarioAsignado: 'Dra. Andrea Beltrán (Medicina Preventiva)',
      notas: 'Desparasitación antiparasitaria aviar externa en spray.'
    },

    // 19 de Octubre
    {
      id: 'cita-oct-38',
      mascotaId: 'masc-11',
      mascotaNombre: 'Bruno',
      propietarioNombre: 'Claudia Morales Rivas',
      especie: 'Canino',
      fechaHora: '2026-10-19T09:30',
      motivo: MotivoConsulta.CIRUGIA,
      estado: EstadoCita.CONFIRMADA,
      veterinarioAsignado: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)',
      notas: 'Evaluación prequirúrgica de profilaxis dental ultrasónica.'
    },
    {
      id: 'cita-oct-39',
      mascotaId: 'masc-7',
      mascotaNombre: 'Thor',
      propietarioNombre: 'Andrés Salazar Vega',
      especie: 'Canino',
      fechaHora: '2026-10-19T14:30',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.PENDIENTE,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Plan de acondicionamiento muscular en miembros traseros.'
    },

    // 20 de Octubre
    {
      id: 'cita-oct-40',
      mascotaId: 'masc-12',
      mascotaNombre: 'Simona',
      propietarioNombre: 'Claudia Morales Rivas',
      especie: 'Exótico',
      fechaHora: '2026-10-20T10:30',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.PENDIENTE,
      veterinarioAsignado: 'Dra. Andrea Beltrán (Medicina Preventiva)',
      notas: 'Revisión periódica de pelaje y heno.'
    },
    {
      id: 'cita-oct-41',
      mascotaId: 'masc-1',
      mascotaNombre: 'Max',
      propietarioNombre: 'Carlos Mendoza Ramos',
      especie: 'Canino',
      fechaHora: '2026-10-20T16:00',
      motivo: MotivoConsulta.VACUNACION,
      estado: EstadoCita.CONFIRMADA,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Vacuna anual contra Giardia.'
    },

    // 21 de Octubre
    {
      id: 'cita-oct-42',
      mascotaId: 'masc-5',
      mascotaNombre: 'Misha',
      propietarioNombre: 'Mariana Torres Silva',
      especie: 'Felino',
      fechaHora: '2026-10-21T09:00',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.PENDIENTE,
      veterinarioAsignado: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)',
      notas: 'Cepillado y desanudado sanitario dermatológico.'
    },
    {
      id: 'cita-oct-43',
      mascotaId: 'masc-16',
      mascotaNombre: 'Balto',
      propietarioNombre: 'Fernando Cárdenas Ríos',
      especie: 'Canino',
      fechaHora: '2026-10-21T15:00',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.CONFIRMADA,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Revisión de muda de manto estacional.'
    },

    // 22 de Octubre
    {
      id: 'cita-oct-44',
      mascotaId: 'masc-9',
      mascotaNombre: 'Nala',
      propietarioNombre: 'Sofía Benavides Castro',
      especie: 'Felino',
      fechaHora: '2026-10-22T11:30',
      motivo: MotivoConsulta.CONSULTA_GENERAL,
      estado: EstadoCita.CONFIRMADA,
      veterinarioAsignado: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)',
      notas: 'Control nutricional para control de peso.'
    },

    // 23 de Octubre
    {
      id: 'cita-oct-45',
      mascotaId: 'masc-20',
      mascotaNombre: 'Kira',
      propietarioNombre: 'Gabriela Huamán Ortiz',
      especie: 'Canino',
      fechaHora: '2026-10-23T15:00',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.PENDIENTE,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Examen ortopédico de control.'
    },

    // 24 de Octubre
    {
      id: 'cita-oct-46',
      mascotaId: 'masc-4',
      mascotaNombre: 'Rocky',
      propietarioNombre: 'Jorge Luis Paredes',
      especie: 'Canino',
      fechaHora: '2026-10-24T10:00',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.CONFIRMADA,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Revisión dérmica post-tratamiento tópico con clorhexidina.'
    },

    // 25 de Octubre
    {
      id: 'cita-oct-47',
      mascotaId: 'masc-21',
      mascotaNombre: 'Tom',
      propietarioNombre: 'Enrique Farfán Soto',
      especie: 'Felino',
      fechaHora: '2026-10-25T16:00',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.PENDIENTE,
      veterinarioAsignado: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)',
      notas: 'Desparasitación periódica.'
    },

    // 26 de Octubre
    {
      id: 'cita-oct-48',
      mascotaId: 'masc-8',
      mascotaNombre: 'Milo',
      propietarioNombre: 'Sofía Benavides Castro',
      especie: 'Canino',
      fechaHora: '2026-10-26T09:30',
      motivo: MotivoConsulta.CONSULTA_GENERAL,
      estado: EstadoCita.PENDIENTE,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Revisión de oídos caídos.'
    },

    // 27 de Octubre
    {
      id: 'cita-oct-49',
      mascotaId: 'masc-19',
      mascotaNombre: 'Tambor',
      propietarioNombre: 'Martín Zevallos Peña',
      especie: 'Exótico',
      fechaHora: '2026-10-27T14:00',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.CONFIRMADA,
      veterinarioAsignado: 'Dra. Andrea Beltrán (Medicina Preventiva)',
      notas: 'Revisión periódica de oclusión dentaria.'
    },

    // 28 de Octubre
    {
      id: 'cita-oct-50',
      mascotaId: 'masc-23',
      mascotaNombre: 'Bella',
      propietarioNombre: 'Andrea Carrillo Vega',
      especie: 'Canino',
      fechaHora: '2026-10-28T11:00',
      motivo: MotivoConsulta.VACUNACION,
      estado: EstadoCita.PENDIENTE,
      veterinarioAsignado: 'Dra. Andrea Beltrán (Medicina Preventiva)',
      notas: 'Vacuna de refuerzo anual séxtuple.'
    },

    // 29 de Octubre
    {
      id: 'cita-oct-51',
      mascotaId: 'masc-18',
      mascotaNombre: 'Jack',
      propietarioNombre: 'Martín Zevallos Peña',
      especie: 'Canino',
      fechaHora: '2026-10-29T15:30',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.CONFIRMADA,
      veterinarioAsignado: 'Dra. Camila Soto (Médica Veterinaria)',
      notas: 'Monitoreo de actividad y peso muscular.'
    },

    // 30 de Octubre
    {
      id: 'cita-oct-52',
      mascotaId: 'masc-24',
      mascotaNombre: 'Simba',
      propietarioNombre: 'Andrea Carrillo Vega',
      especie: 'Felino',
      fechaHora: '2026-10-30T10:30',
      motivo: MotivoConsulta.CONTROL_RUTINA,
      estado: EstadoCita.PENDIENTE,
      veterinarioAsignado: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)',
      notas: 'Chequeo preventivo de fin de mes.'
    }
  ];

  const historial: HistorialAtencion[] = [
    {
      id: 'hist-oct-01',
      mascotaId: 'masc-1',
      citaId: 'cita-oct-01',
      fechaAtencion: '2026-10-01',
      motivoConsulta: 'Chequeo semestral rutinario de articulaciones',
      diagnostico: 'Articulaciones coxofemorales estables. Sin dolor a la palpación ni crepitación.',
      tratamientoRecetado: 'Continuar con condroitín sulfato y glucosamina 1 cápsula diaria con el alimento por 60 días.',
      signosVitales: { pesoKg: 29.5, temperaturaCelsius: 38.3, frecuenciaCardiacaBpm: 88 },
      fechaProximaCita: '2026-10-12',
      observaciones: 'Mantener caminatas en terreno blando (pasto) evitando saltos bruscos.',
      veterinarioTratante: 'Dra. Camila Soto (Médica Veterinaria)'
    },
    {
      id: 'hist-oct-02',
      mascotaId: 'masc-2',
      citaId: 'cita-oct-02',
      fechaAtencion: '2026-10-01',
      motivoConsulta: 'Refuerzo de vacuna triple felina',
      diagnostico: 'Paciente felino clínicamente sano. Mucosas rosadas y normohidratado.',
      tratamientoRecetado: 'Administración subcutánea de Vacuna Triple Felina (Rinotraqueitis, Calicivirus, Panleucopenia). Lote: TF-9021.',
      signosVitales: { pesoKg: 4.1, temperaturaCelsius: 38.6, frecuenciaCardiacaBpm: 135 },
      fechaProximaCita: '2026-10-18',
      observaciones: 'Monitorear posible somnolencia transitoria durante las próximas 24 horas.',
      veterinarioTratante: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)'
    },
    {
      id: 'hist-oct-03',
      mascotaId: 'masc-4',
      citaId: 'cita-oct-03',
      fechaAtencion: '2026-10-02',
      motivoConsulta: 'Prurito intenso en zona interdigital y eritema abdominal',
      diagnostico: 'Dermatitis alérgica por contacto y sobrecrecimiento de levaduras (Malassezia).',
      tratamientoRecetado: 'Baños con shampoo de Clorhexidina al 3% + Miconazol 2 veces por semana. Oclacitinib 5.4 mg cada 12 horas por 7 días.',
      signosVitales: { pesoKg: 12.3, temperaturaCelsius: 38.8, frecuenciaCardiacaBpm: 104 },
      fechaProximaCita: '2026-10-05',
      observaciones: 'Secar minuciosamente los espacios interdigitales tras cada paseo.',
      veterinarioTratante: 'Dra. Camila Soto (Médica Veterinaria)'
    },
    {
      id: 'hist-oct-04',
      mascotaId: 'masc-3',
      citaId: 'cita-oct-04',
      fechaAtencion: '2026-10-02',
      motivoConsulta: 'Inspección de crecimiento de molares e incisivos',
      diagnostico: 'Desgaste dental simétrico. Oclusión adecuada sin lesiones en mucosa lingual ni mejillas.',
      tratamientoRecetado: 'Refuerzo de heno Timothy ad libitum y ramas de manzano deshidratadas para desgaste mecánico.',
      signosVitales: { pesoKg: 1.8, temperaturaCelsius: 39.1, frecuenciaCardiacaBpm: 210 },
      fechaProximaCita: '2026-10-16',
      observaciones: 'Excelente digestibilidad y consistencia cecotrófica.',
      veterinarioTratante: 'Dra. Andrea Beltrán (Medicina Preventiva)'
    },
    {
      id: 'hist-oct-05',
      mascotaId: 'masc-8',
      citaId: 'cita-oct-05',
      fechaAtencion: '2026-10-03',
      motivoConsulta: 'Vacuna séxtuple anual y antiparasitario interno',
      diagnostico: 'Canino activo y receptivo. Sin fiebre ni adenopatías.',
      tratamientoRecetado: 'Vacuna Vanguard Plus 5/CV-L + Comprimido de Praziquantel / Pirantel según peso.',
      signosVitales: { pesoKg: 14.0, temperaturaCelsius: 38.5, frecuenciaCardiacaBpm: 94 },
      fechaProximaCita: '2026-10-26',
      observaciones: 'Registrado en carnet de vacunación.',
      veterinarioTratante: 'Dra. Andrea Beltrán (Medicina Preventiva)'
    },
    {
      id: 'hist-oct-06',
      mascotaId: 'masc-5',
      citaId: 'cita-oct-06',
      fechaAtencion: '2026-10-03',
      motivoConsulta: 'Decaimiento leve y rechazo temporal de pienso seco',
      diagnostico: 'Gingivitis marginal leve en premolares superiores sin afectación sistémica.',
      tratamientoRecetado: 'Gel bucal antiséptico con clorhexidina 0.12% tópico nocturno. Dieta húmeda blanda prescrita por 4 días.',
      signosVitales: { pesoKg: 3.9, temperaturaCelsius: 38.5, frecuenciaCardiacaBpm: 142 },
      fechaProximaCita: '2026-10-21',
      observaciones: 'Reincorporar pienso seco humedecido progresivamente.',
      veterinarioTratante: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)'
    },
    {
      id: 'hist-oct-07',
      mascotaId: 'masc-7',
      citaId: 'cita-oct-07',
      fechaAtencion: '2026-10-04',
      motivoConsulta: 'Cojera intermitente en miembro posterior derecho tras ejercicio',
      diagnostico: 'Distensión muscular leve del cuádriceps femoral derecho. Reflejos espinales conservados.',
      tratamientoRecetado: 'Meloxicam 0.1 mg/kg vía oral cada 24 horas por 5 días con alimento. Reposo estricto.',
      signosVitales: { pesoKg: 34.2, temperaturaCelsius: 38.4, frecuenciaCardiacaBpm: 84 },
      fechaProximaCita: '2026-10-10',
      observaciones: 'Evitar escaleras y carreras hasta reevaluación clínica.',
      veterinarioTratante: 'Dra. Camila Soto (Médica Veterinaria)'
    },
    {
      id: 'hist-oct-08',
      mascotaId: 'masc-6',
      citaId: 'cita-oct-08',
      fechaAtencion: '2026-10-04',
      motivoConsulta: 'Corte higiénico de uñas y evaluación de plumaje',
      diagnostico: 'Queratina ungueal normal. Plumaje brillante sin indicios de picaje ni ectoparásitos.',
      tratamientoRecetado: 'Corte profiláctico cauterizado de uñas apicales. Suplemento vitamínico aviar en gotas.',
      signosVitales: { pesoKg: 0.42, temperaturaCelsius: 40.8, frecuenciaCardiacaBpm: 260 },
      fechaProximaCita: '2026-10-18',
      observaciones: 'Enriquecimiento ambiental con ramas naturales de eucalipto.',
      veterinarioTratante: 'Dra. Andrea Beltrán (Medicina Preventiva)'
    },
    {
      id: 'hist-oct-09',
      mascotaId: 'masc-10',
      citaId: 'cita-oct-09',
      fechaAtencion: '2026-10-05',
      motivoConsulta: 'Chequeo geriátrico anual y auscultación cardíaca',
      diagnostico: 'Soplo sistólico grado I/VI mitral asintomático. Presión arterial dentro de parámetros normales.',
      tratamientoRecetado: 'Control periódico cada 6 meses. Suplemento con omega-3 y coenzima Q10.',
      signosVitales: { pesoKg: 4.8, temperaturaCelsius: 38.2, frecuenciaCardiacaBpm: 110 },
      fechaProximaCita: '2026-10-16',
      observaciones: 'Evitar sobrepeso para no sobrecargar el sistema cardiovascular.',
      veterinarioTratante: 'Dra. Camila Soto (Médica Veterinaria)'
    },
    {
      id: 'hist-oct-10',
      mascotaId: 'masc-4',
      citaId: 'cita-oct-10',
      fechaAtencion: '2026-10-05',
      motivoConsulta: 'Evolución de tratamiento dermatológico tópico',
      diagnostico: 'Remisión del eritema abdominal en un 80%. Disminución marcada del rascado.',
      tratamientoRecetado: 'Espaciar baños medicados a 1 vez por semana. Finalizar ciclo de Oclacitinib.',
      signosVitales: { pesoKg: 12.3, temperaturaCelsius: 38.6, frecuenciaCardiacaBpm: 98 },
      fechaProximaCita: '2026-10-24',
      observaciones: 'Excelente adherencia al tratamiento por parte del dueño.',
      veterinarioTratante: 'Dra. Camila Soto (Médica Veterinaria)'
    },
    {
      id: 'hist-oct-11',
      mascotaId: 'masc-11',
      citaId: 'cita-oct-11',
      fechaAtencion: '2026-10-06',
      motivoConsulta: 'Inmunización séxtuple y desparasitación externa con pipeta',
      diagnostico: 'Paciente canino en óptimas condiciones físicas y anímicas para recibir biológicos.',
      tratamientoRecetado: 'Vacuna Vanguard Plus 5/CV-L subcutánea + Pipeta Simparica Trio.',
      signosVitales: { pesoKg: 31.0, temperaturaCelsius: 38.4, frecuenciaCardiacaBpm: 86 },
      fechaProximaCita: '2026-10-19',
      observaciones: 'No bañar a la mascota durante los próximos 3 días.',
      veterinarioTratante: 'Dra. Andrea Beltrán (Medicina Preventiva)'
    },
    {
      id: 'hist-oct-12',
      mascotaId: 'masc-7',
      citaId: 'cita-oct-12',
      fechaAtencion: '2026-10-06',
      motivoConsulta: 'Limpieza quirúrgica y sutura menor por corte en almohadilla plantar',
      diagnostico: 'Herida cortante limpia de 1.5 cm en almohadilla carpiana izquierda por vidrio en parque.',
      tratamientoRecetado: 'Debridación antiséptica + 2 puntos con Nylon 3-0. Cefalexina 500 mg cada 12 h por 7 días.',
      signosVitales: { pesoKg: 34.0, temperaturaCelsius: 38.7, frecuenciaCardiacaBpm: 96 },
      fechaProximaCita: '2026-10-10',
      observaciones: 'Uso obligatorio de bota protectora impermeable para salir al exterior.',
      veterinarioTratante: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)'
    },
    {
      id: 'hist-oct-13',
      mascotaId: 'masc-12',
      citaId: 'cita-oct-13',
      fechaAtencion: '2026-10-07',
      motivoConsulta: 'Suplementación de vitamina C y pesaje de rutina',
      diagnostico: 'Cobaya en buen estado nutricional. Dientes incisivos alineados.',
      tratamientoRecetado: 'Vitamina C líquida 50 mg/ml: 0.5 ml vía oral diario directamente con jeringa.',
      signosVitales: { pesoKg: 0.95, temperaturaCelsius: 38.8, frecuenciaCardiacaBpm: 240 },
      fechaProximaCita: '2026-10-20',
      observaciones: 'Las cobayas no sintetizan vitamina C; suplementación obligatoria.',
      veterinarioTratante: 'Dra. Andrea Beltrán (Medicina Preventiva)'
    },
    {
      id: 'hist-oct-14',
      mascotaId: 'masc-9',
      citaId: 'cita-oct-14',
      fechaAtencion: '2026-10-07',
      motivoConsulta: 'Vacunación antirrábica obligatoria',
      diagnostico: 'Temperatura y auscultación cardiopulmonar normales. Apta para inmunización.',
      tratamientoRecetado: 'Vacuna Nobivac Rabies 1 ml vía subcutánea. Certificado oficial emitido.',
      signosVitales: { pesoKg: 4.5, temperaturaCelsius: 38.6, frecuenciaCardiacaBpm: 138 },
      fechaProximaCita: '2026-10-22',
      observaciones: 'Vigencia de vacuna hasta Octubre 2027.',
      veterinarioTratante: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)'
    },
    {
      id: 'hist-oct-15',
      mascotaId: 'masc-13',
      citaId: 'cita-oct-15',
      fechaAtencion: '2026-10-08',
      motivoConsulta: 'Evaluación de displasia de codo y pesaje muscular',
      diagnostico: 'Rango de movimiento articular completo. Buena masa muscular del tríceps braquial.',
      tratamientoRecetado: 'Ácidos grasos esenciales EPA/DHA + Colágeno no desnaturalizado tipo II (UC-II) 1 comprimido diario.',
      signosVitales: { pesoKg: 42.5, temperaturaCelsius: 38.5, frecuenciaCardiacaBpm: 82 },
      fechaProximaCita: '2026-10-17',
      observaciones: 'Mantener peso controlado.',
      veterinarioTratante: 'Dra. Camila Soto (Médica Veterinaria)'
    },
    {
      id: 'hist-oct-17',
      mascotaId: 'masc-15',
      citaId: 'cita-oct-17',
      fechaAtencion: '2026-10-09',
      motivoConsulta: 'Evaluación profiláctica de sarro dental y encías',
      diagnostico: 'Placa bacteriana en incisivos y colmillos. Gingivitis leve.',
      tratamientoRecetado: 'Solución enjuague para agua de beber + gel antiséptico bucal diario con sabor a malta.',
      signosVitales: { pesoKg: 2.4, temperaturaCelsius: 38.4, frecuenciaCardiacaBpm: 120 },
      fechaProximaCita: '2026-11-09',
      observaciones: 'Perro miniatura con predisposición periodontal alta.',
      veterinarioTratante: 'Dra. Camila Soto (Médica Veterinaria)'
    },
    {
      id: 'hist-oct-18',
      mascotaId: 'masc-16',
      citaId: 'cita-oct-18',
      fechaAtencion: '2026-10-09',
      motivoConsulta: 'Vacunación antirrábica y desparasitación externa',
      diagnostico: 'Paciente enérgico y saludable. Ojos y mucosas limpias.',
      tratamientoRecetado: 'Vacuna antirrábica anual + NexGard Spectra según peso.',
      signosVitales: { pesoKg: 25.0, temperaturaCelsius: 38.3, frecuenciaCardiacaBpm: 88 },
      fechaProximaCita: '2026-10-21',
      observaciones: 'Registrado con éxito.',
      veterinarioTratante: 'Dra. Andrea Beltrán (Medicina Preventiva)'
    },
    {
      id: 'hist-oct-19',
      mascotaId: 'masc-7',
      citaId: 'cita-oct-19',
      fechaAtencion: '2026-10-10',
      motivoConsulta: 'Retiro de puntos de almohadilla plantar',
      diagnostico: 'Cicatrización de herida al 100%. Tejido de granulación limpio sin exudado.',
      tratamientoRecetado: 'Retiro exitoso de 2 puntos quirúrgicos. Alta médica traumatológica.',
      signosVitales: { pesoKg: 34.2, temperaturaCelsius: 38.3, frecuenciaCardiacaBpm: 86 },
      fechaProximaCita: '2026-10-19',
      observaciones: 'Puede retomar actividad física gradual sin restricción.',
      veterinarioTratante: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)'
    },
    {
      id: 'hist-oct-20',
      mascotaId: 'masc-17',
      citaId: 'cita-oct-20',
      fechaAtencion: '2026-10-10',
      motivoConsulta: 'Desparasitación preventiva interna y externa',
      diagnostico: 'Pelaje largo en buen estado. Ausencia de pulgas o liendres.',
      tratamientoRecetado: 'Pipeta Broadline (Fipronil, S-Metopreno, Eprinomectina, Praziquantel).',
      signosVitales: { pesoKg: 3.6, temperaturaCelsius: 38.5, frecuenciaCardiacaBpm: 138 },
      fechaProximaCita: '2026-11-10',
      observaciones: 'Cepillado frecuente para evitar ingestión excesiva de pelo.',
      veterinarioTratante: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)'
    },
    {
      id: 'hist-oct-21',
      mascotaId: 'masc-18',
      citaId: 'cita-oct-21',
      fechaAtencion: '2026-10-11',
      motivoConsulta: 'Revisión de otitis ceruminosa leve tras baño en peluquería',
      diagnostico: 'Humedad residual en conducto auditivo derecho con eritema leve. Tímpano intacto.',
      tratamientoRecetado: 'Limpieza con solución secante ótica + gotas óticas con gentamicina y betametasona por 5 días.',
      signosVitales: { pesoKg: 6.5, temperaturaCelsius: 38.6, frecuenciaCardiacaBpm: 112 },
      fechaProximaCita: '2026-10-29',
      observaciones: 'Recomendar tapones de algodón durante el baño.',
      veterinarioTratante: 'Dra. Camila Soto (Médica Veterinaria)'
    },
    {
      id: 'hist-oct-22',
      mascotaId: 'masc-19',
      citaId: 'cita-oct-22',
      fechaAtencion: '2026-10-11',
      motivoConsulta: 'Revisión de dientes y asesoría de forraje timothy',
      diagnostico: 'Oclusión dentaria normal. Peso estable.',
      tratamientoRecetado: 'Continuar con heno fresco verde sin polvo.',
      signosVitales: { pesoKg: 1.1, temperaturaCelsius: 39.0, frecuenciaCardiacaBpm: 230 },
      fechaProximaCita: '2026-10-27',
      observaciones: 'Excelente condición de conejo enano.',
      veterinarioTratante: 'Dra. Andrea Beltrán (Medicina Preventiva)'
    },
    {
      id: 'hist-oct-23',
      mascotaId: 'masc-20',
      citaId: 'cita-oct-23',
      fechaAtencion: '2026-10-12',
      motivoConsulta: 'Refuerzo de vacuna séxtuple anual',
      diagnostico: 'Doberman en óptima conformación muscular y alerta.',
      tratamientoRecetado: 'Vacuna séxtuple anual + Certificado sanitario oficial.',
      signosVitales: { pesoKg: 28.3, temperaturaCelsius: 38.4, frecuenciaCardiacaBpm: 84 },
      fechaProximaCita: '2026-10-23',
      observaciones: 'Protección biológica renovada.',
      veterinarioTratante: 'Dra. Andrea Beltrán (Medicina Preventiva)'
    },
    {
      id: 'hist-oct-24',
      mascotaId: 'masc-1',
      citaId: 'cita-oct-24',
      fechaAtencion: '2026-10-12',
      motivoConsulta: 'Revisión de respuesta a condroprotectores articulares',
      diagnostico: 'Notable mejoría en la agilidad para incorporarse por la mañana.',
      tratamientoRecetado: 'Continuar condroprotectores hasta completar los 60 días.',
      signosVitales: { pesoKg: 29.5, temperaturaCelsius: 38.3, frecuenciaCardiacaBpm: 88 },
      fechaProximaCita: '2026-10-20',
      observaciones: 'Mantener peso por debajo de 30 kg para no sobrecargar caderas.',
      veterinarioTratante: 'Dra. Camila Soto (Médica Veterinaria)'
    },
    {
      id: 'hist-oct-25',
      mascotaId: 'masc-21',
      citaId: 'cita-oct-25',
      fechaAtencion: '2026-10-13',
      motivoConsulta: 'Control por vómitos de bolas de pelo',
      diagnostico: 'Tricobezoares expulsados. Abdomen blando y sin dolor a la palpación profunda.',
      tratamientoRecetado: 'Pasta de malta sabor atún 2 veces por semana. Pienso con fibra Hairball control.',
      signosVitales: { pesoKg: 4.7, temperaturaCelsius: 38.5, frecuenciaCardiacaBpm: 132 },
      fechaProximaCita: '2026-10-25',
      observaciones: 'Frecuencia de vómitos disminuida.',
      veterinarioTratante: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)'
    },
    {
      id: 'hist-oct-26',
      mascotaId: 'masc-22',
      citaId: 'cita-oct-26',
      fechaAtencion: '2026-10-13',
      motivoConsulta: 'Pesaje diminuto y revisión de abazones',
      diagnostico: 'Abazones limpios y vacíos. Sin inflamación ni compactación.',
      tratamientoRecetado: 'Mix de granos premium con enriquecimiento de frutos secos sin sal.',
      signosVitales: { pesoKg: 0.14, temperaturaCelsius: 37.8, frecuenciaCardiacaBpm: 320 },
      fechaProximaCita: '2026-11-13',
      observaciones: 'Hámster vivaz y dócil al manejo.',
      veterinarioTratante: 'Dra. Andrea Beltrán (Medicina Preventiva)'
    },
    {
      id: 'hist-oct-27',
      mascotaId: 'masc-23',
      citaId: 'cita-oct-27',
      fechaAtencion: '2026-10-14',
      motivoConsulta: 'Lagrimeo constante y manchas marrones en lagrimales',
      diagnostico: 'Epífora idiopática por conformación braquicéfala. Conducto nasolagrimal permeable.',
      tratamientoRecetado: 'Limpieza con toallitas oftálmicas enzimáticas libres de alcohol 2 veces al día.',
      signosVitales: { pesoKg: 5.2, temperaturaCelsius: 38.6, frecuenciaCardiacaBpm: 118 },
      fechaProximaCita: '2026-10-28',
      observaciones: 'Recortar el pelo periorbital con tijera roma.',
      veterinarioTratante: 'Dra. Camila Soto (Médica Veterinaria)'
    },
    {
      id: 'hist-oct-28',
      mascotaId: 'masc-24',
      citaId: 'cita-oct-28',
      fechaAtencion: '2026-10-14',
      motivoConsulta: 'Refuerzo de triple felina',
      diagnostico: 'Gato sano, complexión fuerte y pelaje corto denso.',
      tratamientoRecetado: 'Vacuna Triple Felina subcutánea. Sin reacciones inmediatas.',
      signosVitales: { pesoKg: 5.0, temperaturaCelsius: 38.6, frecuenciaCardiacaBpm: 128 },
      fechaProximaCita: '2026-10-30',
      observaciones: 'Esquema de vacunación completo.',
      veterinarioTratante: 'Dr. Alejandro Rivas (Especialista Felino y Cirugía)'
    },
    {
      id: 'hist-oct-29',
      mascotaId: 'masc-25',
      citaId: 'cita-oct-29',
      fechaAtencion: '2026-10-15',
      motivoConsulta: 'Lavado ótico preventivo por antecedentes de otitis',
      diagnostico: 'Ambos conductos limpios y secos tras lavado clínico profesional.',
      tratamientoRecetado: 'Aplicación de limpiador secante con ácido bórico 1 vez por semana como profilaxis.',
      signosVitales: { pesoKg: 13.1, temperaturaCelsius: 38.4, frecuenciaCardiacaBpm: 92 },
      fechaProximaCita: '2026-11-15',
      observaciones: 'Excelente evolución clínica.',
      veterinarioTratante: 'Dra. Camila Soto (Médica Veterinaria)'
    },
    {
      id: 'hist-oct-30',
      mascotaId: 'masc-26',
      citaId: 'cita-oct-30',
      fechaAtencion: '2026-10-15',
      motivoConsulta: 'Revisión de alas y suplemento de calcio en bloque',
      diagnostico: 'Plumaje de vuelo completo. Piquito alineado.',
      tratamientoRecetado: 'Bloque mineral de calcio en la jaula + semillas variadas.',
      signosVitales: { pesoKg: 0.04, temperaturaCelsius: 41.2, frecuenciaCardiacaBpm: 290 },
      fechaProximaCita: '2026-11-15',
      observaciones: 'Ave muy activa y cantarina.',
      veterinarioTratante: 'Dra. Andrea Beltrán (Medicina Preventiva)'
    }
  ];

  return { citas, historial };
}
