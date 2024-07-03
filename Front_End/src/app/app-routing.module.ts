import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CandidatComponent } from './Components/candidat/candidat.component';
import { CertificationsComponent } from './Components/certifications/certifications.component';
import { FormationsComponent } from './Components/formations/formations.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'candidat', component: CandidatComponent },
  { path: 'certificate', component: CertificationsComponent },
  { path: 'formations', component: FormationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
