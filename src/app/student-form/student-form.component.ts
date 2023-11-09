import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IStudentDetails } from 'src/shared/models/interfaces/Student';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent {

  studentDetails = this.fb.group({
    roll : ['2'],
    first_name : ['B'],
    last_name : ['B']
  });

  constructor(private fb : FormBuilder, private apiService : ApiService){
    //  this.apiService.updateStudentDetails({
    //  'roll' : '3',
    //  'first_name' : 'E',
    //  "last_name" : 'E'
    //  });
  // this.onSubmit();
  this.apiService.modifyAttendanceByRoll("3","01/11/2023","absent");
  }

  ngOnInit(){
    this.apiService.postResponse.subscribe(
      status => {
        if(status == 0){
          alert("Success");
          this.apiService.reset();
        }
        else if(status == 1){
          alert("HTTP Error");
          this.apiService.reset();
        }
        else if(status == 2){
          alert("Roll already exists");
          this.apiService.reset();
        }
        else{
          //continue
        }
      }
    );
  }

  onSubmit(){
    this.apiService.postNewStudent({
      roll : '3',
      first_name : 'C',
      last_name : 'C'
    });
  }

  onUpdate(){
    this.apiService.editStudentDetails({
      roll : '2',
      first_name : 'C',
      last_name : 'C'
    }).subscribe(
      data => {
        alert(data);
      }
    );
  }

  getStudentByRoll(roll : string){
    this.apiService.idByRoll.subscribe(
      data => {
        if(data != "-1"){
          this.apiService.getStudentDetailsById(data).subscribe(
            response => {
              console.log(response);
            }
          );
        }
      }
    );
    this.apiService.getStudentIdByRoll(roll);
  }

  deleteStudentByRoll(roll : string){
    this.apiService.idByRoll.subscribe(
      data => {
        if(data != "-1"){
          this.apiService.deleteStudentById(data).subscribe(
            response => {
              console.log(response);
            }
          )
        }
      }
    );
    this.apiService.getStudentIdByRoll(roll);
  }


}
