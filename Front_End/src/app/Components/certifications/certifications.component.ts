import { Component, OnInit } from '@angular/core';
import { CertificateTemplateService } from '../../../Services/certificate-template.service';
import { CertificateTemplate } from '../../../Models/candidat.model';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent implements OnInit {

  public certificates: any;
  public selectedCertificate: CertificateTemplate | null = null;
  updateForm: FormGroup;

  constructor(
    private certificateService: CertificateTemplateService,
    private formBuilder: FormBuilder
  ) {
    this.updateForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      templatePath: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllCertificates();
  }

  public getAllCertificates() {
    this.certificateService.getCertificateTemplates().subscribe({
      next: value => {
        this.certificates = value;
        console.log('Received data:', value);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action is irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.certificateService.deleteCertificateTemplate(id).subscribe({
          next: (response) => {
            console.log(response);
            this.getAllCertificates();
            Swal.fire(
              'Deleted!',
              'The certificate template has been deleted.',
              'success'
            );
          },
          error: (error) => {
            console.error(error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the template.',
              'error'
            );
          }
        });
      }
    });
  }

  showDetails(id: number) {
    this.certificateService.getCertificateTemplateById(id).subscribe({
      next: (template) => {
        this.selectedCertificate = template;
        this.openModal(template);
      },
      error: (error) => {
        console.error('Error fetching template details:', error);
        Swal.fire('Error', 'Unable to fetch template details', 'error');
      }
    });
  }

  openModal(template: CertificateTemplate) {
    if (template) {
      const imageUrl = this.getImageUrl(template.templatePath);
      Swal.fire({
        title: 'Certificate Template Details',
        html: `
          <p><strong>ID:</strong> ${template.id}</p>
          <p><strong>Name:</strong> ${template.name}</p>
          <p><strong>Template Path:</strong> ${template.templatePath}</p>
          <img src="${imageUrl}" alt="Template Image" style="max-width: 100%; max-height: 300px;" onerror="this.onerror=null;this.src='path/to/fallback/image.jpg';">
        `,
        icon: 'info',
        confirmButtonText: 'Close',
        width: '600px'
      });
    }
  }

  getImageUrl(templatePath: string): string {
    if (!templatePath) return '';
    const fileName = templatePath.split('/').pop();
    return `http://localhost:8080/certificate-templates/${fileName}`;
  }

  showUpdateForm(template: CertificateTemplate) {
    this.updateForm.patchValue(template);
    Swal.fire({
      title: 'Update Certificate Template',
      html:
        '<form id="updateForm">' +
        `<input id="name" class="swal2-input" placeholder="Name" value="${template.name}">` +
        `<input id="file" type="file" class="swal2-file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp">` +
        `<p>Current file: ${template.templatePath}</p>` +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        const form = document.getElementById('updateForm') as HTMLFormElement;
        const fileInput = form.querySelector('#file') as HTMLInputElement;
        return {
          name: (form.querySelector('#name') as HTMLInputElement).value,
          file: fileInput.files ? fileInput.files[0] : null
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateTemplate(template.id, result.value);
      }
    });
  }

  updateTemplate(id: number, updatedData: any) {
    const formData = new FormData();
    formData.append('name', updatedData.name);
    if (updatedData.file) {
      formData.append('file', updatedData.file);
    } else {
      formData.append('templatePath', this.selectedCertificate?.templatePath || '');
    }
  
    this.certificateService.updateCertificateTemplate(id, formData).subscribe({
      next: (response) => {
        console.log('Template updated:', response);
        this.getAllCertificates();
        Swal.fire('Success', 'The template has been updated', 'success');
      },
      error: (error) => {
        console.error('Error updating template:', error);
        Swal.fire('Error', 'Unable to update the template', 'error');
      }
    });
  }


  showAddForm() {
    Swal.fire({
      title: 'Add New Certificate Template',
      html:
        '<form id="addForm">' +
        '<input id="name" class="swal2-input" placeholder="Name">' +
        '<input id="file" type="file" class="swal2-file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp">' +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        const form = document.getElementById('addForm') as HTMLFormElement;
        const fileInput = form.querySelector('#file') as HTMLInputElement;
        return {
          name: (form.querySelector('#name') as HTMLInputElement).value,
          file: fileInput.files ? fileInput.files[0] : null
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.addTemplate(result.value);
      }
    });
  }

  addTemplate(data: any) {
    if (data.file) {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('file', data.file);
  
      this.certificateService.addCertificateTemplate(formData).subscribe({
        next: (response) => {
          console.log('Template added:', response);
          this.getAllCertificates();
          Swal.fire('Success', 'The template has been added', 'success');
        },
        error: (error) => {
          console.error('Error adding template:', error);
          Swal.fire('Error', 'Unable to add the template', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Please select a file', 'error');
    }
  }
}
