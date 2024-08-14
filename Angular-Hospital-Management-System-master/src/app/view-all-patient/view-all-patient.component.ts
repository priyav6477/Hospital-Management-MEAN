import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all-patient',
  templateUrl: './view-all-patient.component.html',
  styleUrls: ['./view-all-patient.component.css']
})
export class ViewAllPatientComponent implements OnInit {

  patients: any;

  constructor(private docService: PatientService,private router:Router) {
    sessionStorage.removeItem('patientId')
   }

  ngOnInit(): void {
    this.docService.getPatients().subscribe(data => {
      console.log(data)
      this.patients = data.result;
    })
  }

  openReport(id:any){
    console.log(id);
    sessionStorage.setItem('patientId',id);
    this.router.navigateByUrl('/report');
  }

}
