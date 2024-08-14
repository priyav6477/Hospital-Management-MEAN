import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-view-all-reports',
  templateUrl: './view-all-reports.component.html',
  styleUrls: ['./view-all-reports.component.css']
})
export class ViewAllReportsComponent implements OnInit {
  selectedStatus: string = "";
  constructor(private patientServ: PatientService, private router: Router) { }
  reports: any;
  ngOnInit(): void {
    this.patientServ.getAllReports().subscribe(data => {
      console.log(data);
      this.reports = data.result
    })
  }
  statusChanged(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log("Selected value:", selectedValue);

    this.patientServ.getReportByStatus(selectedValue).subscribe(data => {
      this.reports = data.result
    })
  }

  updateStatus(reportId: any) {
    console.log(reportId)
    const selectElement = document.getElementById('statusSelect') as HTMLSelectElement;
    // Get the selected value
    const selectedValue = selectElement.value;
    let request = {
      reportId: reportId,
      status: selectedValue
    }
this.patientServ.updateReport(request).subscribe(data=>{
  console.log(data)
})
  }
}
