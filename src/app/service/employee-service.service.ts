// ng g service service/EmployeeServ

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Employee } from '../model/employee-records';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = "http://localhost:3000"; 

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employee`).pipe(
      catchError(this.handleError));
  }

  getEmployee(id: any): Observable<any[]> {
    return this.http.get(`${this.apiUrl}/employee/${id}`).pipe(
      map((data: any) => {
        // If the response is an array, return it as is
        if (Array.isArray(data)) {
          return data;
        } else {
          // If the response is a single object, wrap it in an array
          return [data];
        } 
      })
    );
  }

  addEmployees(employee: Employee): Observable<any> {
    return this.http.post(`${this.apiUrl}/employee`, employee).pipe(
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the error based on its status code or error message
    console.log(error);
    return 'An error occurred while fetching data.';
  }
}

