export const STATUS = ['assistido', 'assistindo', 'quero', 'drop'] as const;

export type Status = (typeof STATUS)[number];

export type Filme = {
  id: number;
  titulo: string;
  ano: number;
  genero: string;
  poster: string;
  nota: number;
  status: Status;
  comentario: string;
};

export type FilmeInput = Omit<Filme, 'id'>;