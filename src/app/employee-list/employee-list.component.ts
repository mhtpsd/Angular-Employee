import { Component, OnInit } from '@angular/core';
import { Observable, map, of, toArray } from 'rxjs';
import { Employee } from '../model/employee-records';
import { EmployeeService } from '../service/employee-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  filteredEmployees$: Observable<Employee[]> = of([]);
  employee$: Observable<Employee[]> = of([]);
  addNewEmployee: boolean = false;
  constructor(private employee:EmployeeService) { }
  ngOnInit(): void {
    this.getEmployees();
  }
  // sac,sdvsvsd
  getEmployees() {
    this.employee$ = this.employee.getEmployees();
     this.filteredEmployees$ = this.employee$;
     this.filteredEmployees$.pipe(toArray());
     let insuranceArray;
     this.filteredEmployees$.subscribe(insu => {
     insuranceArray = insu;
     if (insuranceArray) {
      const Array = JSON.stringify(insuranceArray);
      localStorage.setItem('employeeArray', Array);
    }
  // Now you have your array of values

 });
  }

  searchEmp(event: any) {
    const searchTerm = event.target.value.trim();
    if (!searchTerm) {
      this.filteredEmployees$ = this.employee$;
      return;
    }
    this.filteredEmployees$ = this.employee$.pipe(
      map((emp) => {
        return emp.filter(
          (emp) =>
          emp.employeeID.toString().includes(searchTerm)
        );
      })
    );
  }

}
