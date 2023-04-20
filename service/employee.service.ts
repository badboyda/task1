import { Employee } from './../models/employee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  CreateEmployee(value: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private httpclient : HttpClient) { }

   baseurl ="http://localhost:5286/api/Employee";

  GetEmployee(): Observable<Employee[]>{
    return   this.httpclient.get<Employee[]>(this.baseurl)
  }
//emp to send api
  createEmployee(emp :Employee ):Observable<Employee>{
    // emp.id="00000000-0000-0000-0000-0000000000";//default send empty value to guid
  return this.httpclient.post<Employee>(this.baseurl,emp)//saved emp come only
  }

updateEmployee(emp:Employee, id: string): Observable<Employee>{
 return this.httpclient.put<Employee>(this.baseurl+'/'+id,emp);
}
DeleteEmployee(id:string): Observable<Employee>{
  return this.httpclient.delete<Employee>(this.baseurl+'/'+id);
 }
}






