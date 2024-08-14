import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-view-all-doctors',
  templateUrl: './view-all-doctors.component.html',
  styleUrls: ['./view-all-doctors.component.css']
})
export class ViewALlDoctorsComponent implements OnInit {

  doctors: any;

  constructor(private docService: PatientService) { }

  ngOnInit(): void {
    this.docService.getDoctorslist().subscribe(data => {
      console.log(data)
      this.doctors = data.result;
    })
  }

}
