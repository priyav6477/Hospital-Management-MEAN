import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc-register',
  templateUrl: './doc-register.component.html',
  styleUrls: ['./doc-register.component.css']
})
export class DocRegisterComponent implements OnInit {
  showSpecialization: boolean = false;
  showMedicalCondition: boolean = false;

  constructor(private authService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }

  toggleFields() {
    const userType = document.querySelector('input[name="userType"]:checked')?.getAttribute('value');
    this.showSpecialization = userType === 'Doctor';
    this.showMedicalCondition = userType === 'Patient';
  }

  submitForm(form: any) {
    // Perform form validation here
    if (form.valid) {
      // Form is valid, proceed with submission
      console.log(form.value);
      this.authService.register(form.value).subscribe(data=>{
        console.log(data);

        if(data.statusCode==200){
          this.router.navigateByUrl('doclogin')
        }
      })
      
    } else {
      // Form is invalid, display error messages or handle accordingly
      alert('Please fill out all required fields.');
    }
  }

  resetForm(form:any) {
    form.reset();

    // Reset form fields and any other necessary state
  }
}
