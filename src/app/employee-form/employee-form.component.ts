//Employee Form Details-typescript File

import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Employee } from '../model/employee-records';
import { EmployeeService } from "../service/employee-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-employee-form",
  templateUrl: "./employee-form.component.html",
  styleUrls: ["./employee-form.component.css"],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  @Output() addEmployee = new EventEmitter<Employee>();

  constructor(private fb: FormBuilder,private employee:EmployeeService, private router:Router ) {}

  ngOnInit(): void {
    // Initialize the form with validators
    this.employeeForm = this.fb.group({
      employeeID: ["", [Validators.required,this.uniqueValidator]],
      firstName: ["", [Validators.required, ]],
      lastName: ["", [Validators.required]],
      role: ["", [Validators.required]],
      department: ["", [Validators.required,]],
      dateOfJoining: ["", [Validators.required,this.dateValidator]],
      performanceRating: ["", [Validators.required]],
    });
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(control.value)) {
      return { invalidDate: true };
    }
    return null;
  }

  uniqueValidator (control: AbstractControl): ValidationErrors | null  {
    const employeeID = control.value;
    let value=JSON.parse(localStorage.getItem('employeeArray') || '{}');
    if(Array.isArray(value)){
      const employeeIds = value.map((id:any) => id.employeeID);
    // Simulate a list of existing student IDs (replace with your own data source)
     if (employeeIds.includes(employeeID)) {
       return { unique: true }; // Validation failed because the ID is not unique
     } 
    }
      return null; // Validation passed, ID is unique
    
  }





  // Function to submit the form
  onSubmit() {
    console.log("Hello");
    if (this.employeeForm.valid) {
      // Form is valid, you can submit it
      this.employee.addEmployees(this.employeeForm.value).subscribe(res => {
        console.log('Employee added successfully:', res);
        this.router.navigateByUrl('employee-list')
      });
     
    } else {
      // Form is invalid, display error messages
     
    }
  }

  // Helper function to mark all controls in the form group as touched

}
