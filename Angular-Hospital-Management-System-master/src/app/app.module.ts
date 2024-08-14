import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocloginComponent } from './doclogin/doclogin.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DocRegisterComponent } from './doc-register/doc-register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ViewALlDoctorsComponent } from './view-all-doctors/view-all-doctors.component';
import { ViewAllPatientComponent } from './view-all-patient/view-all-patient.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { ViewAllReportsComponent } from './view-all-reports/view-all-reports.component';

const routes: Routes = [
  { path: '', component: DocloginComponent },
  { path: 'doclogin', component: DocloginComponent },
  { path: 'docRegister', component: DocRegisterComponent },
  { path: 'nav', component: NavbarComponent },
  { path: 'doctors', component: ViewALlDoctorsComponent },
  { path: 'patients', component: ViewAllPatientComponent },
  { path: 'report', component: ReportFormComponent },
  { path: 'patientLogin', component: PatientLoginComponent },
  { path: 'allReports', component: ViewAllReportsComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    DocloginComponent,
    DocRegisterComponent,
    NavbarComponent,
    ViewALlDoctorsComponent,
    ViewAllPatientComponent,
    ReportFormComponent,
    PatientLoginComponent,
    ViewAllReportsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
