import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.css']
})
export class PatientLoginComponent implements OnInit {

  constructor(private patientServ:PatientService) { }

  reports:any

  ngOnInit(): void {
    let userId=sessionStorage.getItem('patientId');
    this.patientServ.getPatientReport(userId).subscribe(data=>{
      console.log(data)
      this.reports=data.result
    })

  }

}
