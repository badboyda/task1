import { Component, OnInit } from '@angular/core';
import { Employee } from './models/employee';
import { EmployeeService } from './service/employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  Employeeary: Employee[] = [];
  Employeeformgroup: FormGroup;//this type formgrp
  EmployeeId : string;
  constructor(private empservice: EmployeeService, private fb: FormBuilder) { //fgrp to fb

    //form grp
    this.Employeeformgroup = this.fb.group({ //fb to grp method call
      name: [" "],
      mobileNo: [" "],
      emailID: [" "],

    })//grp assign to efg
  }

  ngOnInit(): void {
    this.getEmployeees();
  }
  getEmployeees() {

    this.empservice.GetEmployee().subscribe(response => {
      console.log(response);
      this.Employeeary = response;

    })
  }



  Onsubmit() {
    console.log(this.Employeeformgroup.value);
    if ( this.EmployeeId != null &&  this.EmployeeId != "") {
      this.empservice.updateEmployee(this.Employeeformgroup.value, this.EmployeeId).subscribe(response => {
        console.log(response);
        this.getEmployeees();
        this.Employeeformgroup.setValue({
          name: "",
          mobileNo: "",
          emailID: "",
        })
        this.EmployeeId = null;
      })
    }
    else {
      this.empservice.createEmployee(this.Employeeformgroup.value).subscribe(response => {
        console.log(response);
        this.getEmployeees();
        this.Employeeformgroup.setValue({
          name: "",
          mobileNo: "",
          emailID: "",
        })
      })
    }
    //call service post

  }
  Fillform(emp: Employee) {
    this.EmployeeId =emp.id;
    this.Employeeformgroup.setValue({
      name: emp.name,
      mobileNo: emp.mobileNo,
      emailID: emp.emailID,
    })
  }
  DeleteEmp(id:string){
this.empservice.DeleteEmployee(id).subscribe(res => {
console.log(res);
this.getEmployeees();
})
  }

  title = 'angularcrud'
}
