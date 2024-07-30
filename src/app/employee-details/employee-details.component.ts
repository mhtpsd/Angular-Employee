//EmployeeDetails-component typescript File
import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../model/employee-records';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../service/employee-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee$: Observable<Employee[]> = of([]);
  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Access parameters from the URL
      const id = params['id']; // Assuming your parameter is named 'id'
     this.getProfessor(id);
      
    });
   
  }
  getProfessor(id: any) {
    this.employee$ = this.employeeService.getEmployee(id);
  }

}
