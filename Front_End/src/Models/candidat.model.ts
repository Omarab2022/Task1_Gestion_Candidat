export interface Candidat {
  id: number;
  name: string;
  score:number;
  dateNaissance: string;
  isPrinted: boolean;
}


export interface CertificateTemplate {
  id: number;
  name: string;
  templatePath: string;
}
