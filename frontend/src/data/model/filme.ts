export class Filme {
    constructor(
        public id: number = 0,
        public titulo: string = "",
        public ano: number = 2000,
        public genero: string = "",
        public poster: string = "",
        public nota: number = 1,
        public status: string = "",
        public comentario: string = ""
    ) {}
}