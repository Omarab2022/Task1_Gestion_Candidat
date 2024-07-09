import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CondidatService } from '../../../Services/condidat.service';
import { Candidat, CertificateTemplate } from '../../../Models/candidat.model';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CertificateTemplateService } from '../../../Services/certificate-template.service';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrl: './candidat.component.css'
})
export class CandidatComponent implements OnInit{


  public candidats: any;
  public selectedCandidat: Candidat | null = null;
  updateForm :FormGroup;
  certificates: CertificateTemplate[] = [];

  
  constructor(
    private candidatservice: CondidatService,
    private formBuilder: FormBuilder,
    private certificateService: CertificateTemplateService,
    private changeDetectorRef: ChangeDetectorRef 
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
    this.getAllCertificates();
 
  }

  //getall candidats

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

  //get all certificates
  getAllCertificates() {
    this.certificateService.getCertificateTemplates().subscribe({
      next: (certificates) => {
        this.certificates = certificates;
      },
      error: (error) => {
        console.error('Error fetching certificates:', error);
      }
    });
  }

  //show candidat form
  showAddCandidatForm() {
    Swal.fire({
      title: 'Add New Candidate',
      html:
        '<input id="name" class="swal2-input" placeholder="Name">' +
        '<input id="score" class="swal2-input" placeholder="Score">' +
        '<input id="dateNaissance" class="swal2-input" placeholder="Date of Birth">',
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: (document.getElementById('name') as HTMLInputElement).value,
          score: parseFloat((document.getElementById('score') as HTMLInputElement).value),
          dateNaissance: (document.getElementById('dateNaissance') as HTMLInputElement).value
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.addCandidat(result.value);
      }
    });
  }
  
  //add candidat
  addCandidat(candidatData: any) {
    if (!candidatData.name || !candidatData.score || !candidatData.dateNaissance) {
      Swal.fire('Error', 'All fields are required', 'error');
      return;
    }
  
    if (isNaN(candidatData.score) || candidatData.score < 0 || candidatData.score > 100) {
      Swal.fire('Error', 'Score must be a number between 0 and 100', 'error');
      return;
    }
  
    this.candidatservice.addCandidat(candidatData).subscribe({
      next: (newCandidat) => {
        console.log('New candidate added:', newCandidat);
        this.getAllCandidats(); // Refresh the list
        Swal.fire('Success', 'New candidate added successfully', 'success');
      },
      error: (error) => {
        console.error('Error adding new candidate:', error);
        Swal.fire('Error', 'Failed to add new candidate', 'error');
      }
    });
  }

  //delete candidat
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


  //show candidat details
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



  //show update form
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




 showCertificateSelectionModal(candidat: Candidat) {
  const certificateOptions = this.certificates.map(cert => ({
    value: cert.id,
    text: cert.name,
    imageUrl: this.getImageUrl(cert.templatePath)
  }));


  let currentIndex = 0;

  const updateSlideContent = (index: number) => {
    const cert = certificateOptions[index];
    const content = Swal.getHtmlContainer();
    if (content) {
      const img = content.querySelector('img') as HTMLImageElement;
      const text = content.querySelector('p') as HTMLParagraphElement;
      if (img && text) {
        img.src = cert.imageUrl;
        img.alt = cert.text;
        text.textContent = cert.text;
      }
    }
  };

  const showPreview = () => {
    const cert = certificateOptions[currentIndex];
    this.previewCertificate(cert, candidat);
  }; 

  Swal.fire({
    title: 'Select a Certificate Template',
    html: `
      <div class="carousel-container">
        <button id="prevButton" class="carousel-arrow left">&#10094;</button>
        <div class="carousel-content">
          <img src="${certificateOptions[0].imageUrl}" alt="${certificateOptions[0].text}" style="max-width: 200px; max-height: 200px;">
          <p>${certificateOptions[0].text}</p>
        </div>
        <button id="nextButton" class="carousel-arrow right">&#10095;</button>
      </div>
    `,
    showCancelButton: true,
    showConfirmButton: true,
    showDenyButton: true,
    confirmButtonText: 'Print',
    denyButtonText: 'Preview',
    cancelButtonText: 'Cancel',
    customClass: {
      container: 'custom-swal-container'
    },
    didOpen: () => {
      const prevButton = Swal.getPopup()!.querySelector('#prevButton') as HTMLElement;
      const nextButton = Swal.getPopup()!.querySelector('#nextButton') as HTMLElement;

      prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + certificateOptions.length) % certificateOptions.length;
        updateSlideContent(currentIndex);
      });

      nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % certificateOptions.length;
        updateSlideContent(currentIndex);
      });
    }
  }).then((result) => {
    if (result.isConfirmed) {
      this.printCertificate(candidat, certificateOptions[currentIndex].value);
    } else if (result.isDenied) {
      showPreview();
    }
  });
}


previewCertificate(cert: any, candidat: Candidat) {

  const templateName = cert.imageUrl.split('/').pop()?.split('.')[0];
  if (!templateName) {
    Swal.fire('Error', 'Invalid template path', 'error');
    return;
  }
  const templateUrl = `assets/templates/${templateName}/index.html`;
  const styleUrl = `assets/templates/${templateName}/style.css`;

  fetch(templateUrl)
    .then(response => response.text())
    .then(html => {
      Swal.fire({
        title: '',
        html: `
          <div class="preview-container">
            <button class="close-button">&times;</button>
            <iframe id="previewFrame" style="width: 100%; height: 100%; border: none;"></iframe>
          </div>
        `,
        showConfirmButton: false,
        showCancelButton: false,
        background: '#fff',
        customClass: {
          container: 'preview-swal-container',
          popup: 'preview-swal-popup'
        },
        didOpen: () => {
          const closeButton = Swal.getPopup()!.querySelector('.close-button') as HTMLElement;
          closeButton.addEventListener('click', () => Swal.close());

          const iframe = document.getElementById('previewFrame') as HTMLIFrameElement;
          if (iframe.contentWindow) {
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(html);

            // Inject styles
            const styleLink = iframe.contentWindow.document.createElement('link');
            styleLink.rel = 'stylesheet';
            styleLink.href = styleUrl;
            iframe.contentWindow.document.head.appendChild(styleLink);

          
            iframe.contentWindow.document.body.innerHTML = iframe.contentWindow.document.body.innerHTML
            .replace('{{candidateName}}', candidat.name)
              .replace('{{score}}', candidat.score.toString())
              .replace('{{dateNaissance}}', candidat.dateNaissance)
              .replace('{{currentDate}}', new Date().toLocaleDateString());

            iframe.contentWindow.document.close();
          }
        }
      });
    })
    .catch(error => {
      console.error('Error loading template:', error);
      Swal.fire('Error', 'Failed to load certificate template', 'error');
    });
};

  getImageUrl(templatePath: string): string {
    if (!templatePath) return '';
    const fileName = templatePath.split('/').pop();
    return `http://localhost:8080/certificate-templates/${fileName}`;
  }


  //print certificate 
  printCertificate(candidat: Candidat, templateId: number) {
    const selectedTemplate = this.certificates.find(c => c.id === templateId);
    if (!selectedTemplate) {
      Swal.fire('Error', 'Template not found', 'error');
      return;
    }
  
    // Extract the template name from the templatePath
    const templateName = selectedTemplate.templatePath.split('/').pop()?.split('.')[0];
    if (!templateName) {
      Swal.fire('Error', 'Invalid template path', 'error');
      return;
    }
  
    const templateUrl = `assets/templates/${templateName}/index.html`;
    const styleUrl = `assets/templates/${templateName}/style.css`;
  
    fetch(templateUrl)
      .then(response => response.text())
      .then(html => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(html);
          
          // Inject styles
          const styleLink = printWindow.document.createElement('link');
          styleLink.rel = 'stylesheet';
          styleLink.href = styleUrl;
          printWindow.document.head.appendChild(styleLink);
  
          // Replace placeholders with actual data
          printWindow.document.body.innerHTML = printWindow.document.body.innerHTML
            .replace('{{candidateName}}', candidat.name)
            .replace('{{score}}', candidat.score.toString())
            .replace('{{dateNaissance}}', candidat.dateNaissance)
            .replace('{{currentDate}}', new Date().toLocaleDateString());
  
          styleLink.onload = () => {
            setTimeout(() => {
              printWindow.print();
              printWindow.close();
              candidat.isPrinted = true;
              this.changeDetectorRef.detectChanges();
            }, 500); 
          };
        } else {
          console.error('Unable to open print window');
          Swal.fire('Error', 'Unable to open print window. Please check your popup blocker settings.', 'error');
        }
      })
      .catch(error => {
        console.error('Error loading template:', error);
        Swal.fire('Error', 'Failed to load certificate template', 'error');
      });
  }


}
