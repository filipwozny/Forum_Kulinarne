export class Report {
    constructor(
        public reportType: string,
        public opis: string,
        public id: number,
        public autor: string,
        public data: Date,
        public nazwa?: string,
        public ocena?: number
      ) {};
}