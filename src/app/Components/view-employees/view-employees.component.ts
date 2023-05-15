import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {

  employees: Employee[] = [];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource(this.employees);
  columnList: string[] = ['firstName', 'lastName', 'birthDate', 'salary', 'isManager','actions'];
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;


  constructor(
    private dataSvc: EmployeeService
  ) { }

  ngOnInit(): void {
    this.dataSvc.getEmployee().subscribe(x => {
      this.employees = x;
      this.dataSource.data = this.employees;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}
