import { Component } from '@angular/core';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AttendanceApp';

  constructor(private apiService : ApiService){
    //this.fetchAllStudents();
  };

  fetchAllStudents(){
    this.apiService.getAllStudents().subscribe(
      data => {
        console.log(data);
      }
    );
  }

}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
