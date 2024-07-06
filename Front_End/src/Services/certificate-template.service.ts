import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CertificateTemplate } from '../Models/candidat.model';

@Injectable({
  providedIn: 'root'
})
export class CertificateTemplateService {

  constructor(private http : HttpClient) { }

  public getCertificateTemplates():Observable<Array<CertificateTemplate>>{
    return this.http.get<Array<CertificateTemplate>>("http://localhost:8080/api/certificateTemplate/all");
  }


  public getNumberOfCertificateTemplates():Observable<number>{
    return this.http.get<number>("http://localhost:8080/api/certificateTemplate/numberoftemplates");
  }


  public deleteCertificateTemplate(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/certificateTemplate/delete/${id}`);
  }

  public updateCertificateTemplate(id: number, formData: FormData): Observable<CertificateTemplate> {
    return this.http.put<CertificateTemplate>(`http://localhost:8080/api/certificateTemplate/update/${id}`, formData);
  }

  public getCertificateTemplateById(id: number): Observable<CertificateTemplate> {
    return this.http.get<CertificateTemplate>(`http://localhost:8080/api/certificateTemplate/${id}`);
  }

  public addCertificateTemplate(formData: FormData): Observable<CertificateTemplate> {
    return this.http.post<CertificateTemplate>(`http://localhost:8080/api/certificateTemplate/add`, formData);
  }

}
