import { Component, AfterViewInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IAttendanceDetails, IStudentDetails } from 'src/shared/models/interfaces/Student';
import { ApiService } from 'src/shared/services/api.service';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent  implements AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  records : any[] = [];
  dataSource = new MatTableDataSource<IAttendanceDetails>(this.records);
  displayedColumns: string[] = ['date','status','choice','edit'];
  constructor(private apiService :ApiService,private route: ActivatedRoute){
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
   
  }

  ngOnInit(){
    this.route.queryParams
      .subscribe(params => {
        this.apiService.idByRoll.subscribe(
          id => {
            this.apiService.getStudentDetailsById(id).subscribe(
              response => {
                console.log(response[0]);
                console.log(response[0].attendance_details);
                let records : IAttendanceDetails[]= [];
                let dates  :string[] = [];
                response[0].attendance_details.forEach(item => {
                  if(!dates.includes(item['date'])){
                    if(item['status'] == 'present')
                    item['status'] = 'Present';
                  if(item['status'] == 'absent')
                  item['status'] = 'Absent';
                    records.push(item);
                    dates.push(item['date']);
                  }
                });
                this.dataSource.data = records;
              }
            )
          }
        );
        this.apiService.getStudentIdByRoll(params['roll']);
      });

      
  }

  updateChoice(date: string){
    const SELECT = document.getElementById("select");
    console.log((SELECT as HTMLSelectElement).options[(SELECT as HTMLSelectElement).selectedIndex].value);
    console.log(date);
    this.route.queryParams
      .subscribe(params => {
        this.apiService.modifyAttendanceByRoll(params['roll'],date,(SELECT as HTMLSelectElement).options[(SELECT as HTMLSelectElement).selectedIndex].value);
        //window.location.href = "./detail?roll="+params['roll'];
        // this.reload();
      });
  }

  reload(){
    window.location.reload();
  }
  
}
