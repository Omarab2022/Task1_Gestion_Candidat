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
}
