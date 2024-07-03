import { CertificateTemplateService } from './../../../Services/certificate-template.service';
import { Component, OnInit } from '@angular/core';
import { CondidatService } from '../../../Services/condidat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  CountCandidat : number = 0;

  CountCertification : number = 0;

  constructor( private candidatservice : CondidatService , private certifservice :  CertificateTemplateService) { }

  ngOnInit(): void {
    this.getNumberOfCandidats();
    this.getNumberOfCertifications();
    
  }

  public getNumberOfCandidats(){
      
      this.candidatservice.getNumberOfCandidats().subscribe({
        next : value =>{
  
          this.CountCandidat = value; 
          console.log('Received data:', value);
  
        },
        error : (error) => {
          console.log(error);
        }
      });

    }

    public getNumberOfCertifications(){

      this.certifservice.getNumberOfCertificateTemplates().subscribe({
        next : value =>{
  
          this.CountCertification = value;
          console.log('Received data:', value);
  
        },
        error : (error) => {
          console.log(error);
        }
      });

    }
}
