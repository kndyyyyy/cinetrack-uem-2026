export class Filme {
    constructor(
        public id: number,
        public titulo: string,
        public ano: number,
        public genero: string,
        public poster: string,
        public nota: number,
        public status: string,
        public comentario: string
    ) {}
}