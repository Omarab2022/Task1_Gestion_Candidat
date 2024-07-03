import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidat } from '../Models/candidat.model';

@Injectable({
  providedIn: 'root'
})
export class CondidatService {

  constructor(private http : HttpClient) { }

  public getCondidats():Observable<Array<Candidat>>{
    return this.http.get<Array<Candidat>>("http://localhost:8080/api/candidate/all");
  }

  public deleteCondidat(id: number):Observable<any>{
    return this.http.delete("http://localhost:8080/delete/"+id);
  }

  public getCandidatById(id: number):Observable<Candidat>{
    return this.http.get<Candidat>("http://localhost:8080/api/candidate/"+id);
  }

  public getNumberOfCandidats():Observable<number>{
    return this.http.get<number>("http://localhost:8080/api/candidate/numberofcandidates");
  }

  public updateCandidat(id: number, candidat: Candidat): Observable<Candidat> {
    return this.http.put<Candidat>(`http://localhost:8080/api/candidate/update/${id}`, candidat);
  }
}
