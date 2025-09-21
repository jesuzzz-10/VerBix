// src/domain/entities/User.ts
export class User {
  constructor(
    public uid: string,
    public email: string,
    public name: string,
    public fecha_registro?: string,

    // Progreso general
    public progreso_general: {
      porcentaje_aprendido: number;
      cantidad_total_verbos: number;
      verbos_aprendidos: number;
      racha: {
        dias_consecutivos: number;
        fecha_ultima_racha: string;
      };
      fecha_ultima_practica: string;
      estadisticas: {
        tiempo_practicado: {
          total: number;
          ultima_sesion: number;
        };
        mejor_racha: number;
      };
    } = {
      porcentaje_aprendido: 0,
      cantidad_total_verbos: 0,
      verbos_aprendidos: 0,
      racha: {
        dias_consecutivos: 0,
        fecha_ultima_racha: '',
      },
      fecha_ultima_practica: '',
      estadisticas: {
        tiempo_practicado: {
          total: 0,
          ultima_sesion: 0,
        },
        mejor_racha: 0,
      },
    }
  ) {}
}
