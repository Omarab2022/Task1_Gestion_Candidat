import { CertificateTemplateService } from './../../../Services/certificate-template.service';
import { Component, OnInit } from '@angular/core';
import { CondidatService } from '../../../Services/condidat.service';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  CountCandidat: number = 0;
  CountCertification: number = 0;

  constructor(
    private candidatservice: CondidatService,
    private certifservice: CertificateTemplateService
  ) { }

  ngOnInit(): void {
    this.getNumberOfCandidats();
    this.getNumberOfCertifications();
    this.createCandidatesChart();
    this.createCertificationsChart();
  }

  public getNumberOfCandidats() {
    this.candidatservice.getNumberOfCandidats().subscribe({
      next: value => {
        this.CountCandidat = value; 
        console.log('Received data:', value);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public getNumberOfCertifications() {
    this.certifservice.getNumberOfCertificateTemplates().subscribe({
      next: value => {
        this.CountCertification = value;
        console.log('Received data:', value);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  private createCandidatesChart() {
    const ctx = document.getElementById('candidatesChart') as HTMLCanvasElement;
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Number of Candidates',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: '#247fd8',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
    new Chart(ctx, config);
  }

  private createCertificationsChart() {
    const ctx = document.getElementById('certificationsChart') as HTMLCanvasElement;
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Number of Certifications',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: '#247fd8'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
    new Chart(ctx, config);
  }
}