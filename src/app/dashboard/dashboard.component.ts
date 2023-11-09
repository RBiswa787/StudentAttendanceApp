import { Component, AfterViewInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IStudentDetails } from 'src/shared/models/interfaces/Student';
import { ApiService } from 'src/shared/services/api.service';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  records : any[] = [];
  dataSource = new MatTableDataSource<IStudentDetails[]>(this.records);
  displayedColumns: string[] = ['roll','first_name','last_name','edit', 'mark','view'];
  constructor(private apiService :ApiService){
    
  }
  
  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(){
    
    this.apiService.getAllStudents().subscribe(
      data => {
        data.forEach( item => {
          console.log(data);
          let data_item = {
            roll : 'default',
            first_name : 'default',
            last_name : 'default'
          };
          data_item.roll = item.student_details.roll;
          data_item.first_name = item['student_details'].first_name;
          data_item.last_name = item['student_details'].last_name;
          this.records.push(data_item);
          this.dataSource.data = this.records;
        });

        console.log('hello', this.records, this.records[0].roll);
       
        console.log(this.dataSource.data)
      }
    );
  }

  goToEdit(id :string){
    console.log("hello");
    window.location.href = "./editstudent?roll="+id;
  }
  goToMark(id :string){
    console.log("hello");
    window.location.href = "./mark?roll="+id;
  }
  goToView(id: string){
    console.log("hello");
    window.location.href = "./detail?roll="+id;
  }
}
