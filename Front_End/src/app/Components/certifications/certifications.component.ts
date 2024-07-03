import { Component, OnInit } from '@angular/core';
import { CertificateTemplateService } from '../../../Services/certificate-template.service';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent implements OnInit{

  public certificates : any ;

  constructor( private certificateservivce : CertificateTemplateService) { }

  ngOnInit(): void {
    this.getAllCertificates();
  }


  public getAllCertificates(){

    this.certificateservivce.getCertificateTemplates().subscribe({
      next : value =>{

        this.certificates = value;
        console.log('Received data:', value);

      },
      error : (error) => {
        console.log(error);
      }
    });

  }



}
