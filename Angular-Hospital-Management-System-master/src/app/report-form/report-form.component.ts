import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // Import NgForm for form validation
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {
  patient: any = {};

  constructor(private patientServ: PatientService, private router: Router) {

  }

  ngOnInit(): void {
  }

  submitForm(form: NgForm): void {
    // Check if the form is valid
    if (form.valid) {
      console.log(form.value);
      let request = form.value;
      let patientId = sessionStorage.getItem('patientId');
      let docId = sessionStorage.getItem('docId')
      const modifiedObject = { ...request, patientId: patientId, doctorId: docId };

      console.log(modifiedObject)

      this.patientServ.addReport(modifiedObject).subscribe(data => {
        console.log(data);
        if (data.statusCode == 200) {
          this.router.navigateByUrl('/patients')
        }
      })

      console.log("Form submitted successfully!");
    } else {
      console.log("Form Invalid");

      alert("Please fill in all required fields.");
    }
  }
}
