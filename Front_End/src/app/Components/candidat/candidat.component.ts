import { Component, OnInit } from '@angular/core';
import { CondidatService } from '../../../Services/condidat.service';
import { Candidat } from '../../../Models/candidat.model';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrl: './candidat.component.css'
})
export class CandidatComponent implements OnInit{


  public candidats: any;
  public selectedCandidat: Candidat | null = null;
  updateForm :FormGroup;

  
  constructor(
    private candidatservice: CondidatService,
    private formBuilder: FormBuilder
  ) {
    this.updateForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      score: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      dateNaissance: ['', Validators.required]
    });
  }

  ngOnInit(): void {
   
    this.getAllCandidats();
 
  }


  getAllCandidats(){

    this.candidatservice.getCondidats().subscribe( {
      next: value => {
  
        this.candidats = value;
        console.log('Received data:', value);
      },
  
      error: (error) => {
        console.log(error);
      }
    });
  }


  onDelete(id: any) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Cette action est irréversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.candidatservice.deleteCondidat(id).subscribe({
          next: (response) => {
            console.log(response);
            this.getAllCandidats();
            Swal.fire(
              'Supprimé!',
              'Le candidat a été supprimé.',
              'success'
            );
          },
          error: (error) => {
            console.error(error);
            Swal.fire(
              'Erreur!',
              'Une erreur est survenue lors de la suppression.',
              'error'
            );
          }
        });
      }
    });
  }


  showDetails(id: number) {
    this.candidatservice.getCandidatById(id).subscribe({
      next: (candidat) => {
        this.selectedCandidat = candidat;
        this.openModal();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des détails du candidat:', error);
        Swal.fire('Erreur', 'Impossible de récupérer les détails du candidat', 'error');
      }
    });
  }

  
  openModal() {
    if (this.selectedCandidat) {
      Swal.fire({
        title: 'Détails du candidat',
        html: `
          <p><strong>ID:</strong> ${this.selectedCandidat.id}</p>
          <p><strong>Nom:</strong> ${this.selectedCandidat.name}</p>
          <p><strong>Score:</strong> ${this.selectedCandidat.score}</p>
          <p><strong>Date de naissance:</strong> ${this.selectedCandidat.dateNaissance}</p>
        `,
        icon: 'info',
        confirmButtonText: 'Fermer'
      });
    }
  }



  showUpdateForm(candidat: Candidat) {
    this.updateForm.patchValue(candidat);
    Swal.fire({
      title: 'Mettre à jour le candidat',
      html:
        '<form id="updateForm">' +
        `<input id="name" class="swal2-input" placeholder="Nom" value="${candidat.name}">` +
        `<input id="score" class="swal2-input" placeholder="Score" value="${candidat.score}">` +
        `<input id="dateNaissance" class="swal2-input" placeholder="Date de naissance" value="${candidat.dateNaissance}">` +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        const form = document.getElementById('updateForm') as HTMLFormElement;
        return {
          name: (form.querySelector('#name') as HTMLInputElement).value,
          score: (form.querySelector('#score') as HTMLInputElement).value,
          dateNaissance: (form.querySelector('#dateNaissance') as HTMLInputElement).value
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateCandidat(candidat.id, result.value);
      }
    });
  }

  updateCandidat(id: number, updatedData: any) {
    this.candidatservice.updateCandidat(id, updatedData).subscribe({
      next: (response) => {
        console.log('Candidat mis à jour:', response);
        this.getAllCandidats();
        Swal.fire('Succès', 'Le candidat a été mis à jour', 'success');
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour:', error);
        Swal.fire('Erreur', 'Impossible de mettre à jour le candidat', 'error');
      }
    });
  }


}
