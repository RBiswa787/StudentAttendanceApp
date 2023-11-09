import { Component } from '@angular/core';
import { IStudentDetails } from 'src/shared/models/interfaces/Student';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/shared/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss']
})

export class MarkComponent {
  newAttendanceForm: FormGroup = this.fb.group({});
  studentData : IStudentDetails = {
    roll : '',
    first_name : '',
    last_name : ''
  }

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private apiService: ApiService){

  }
  ngOnInit(){

    this.newAttendanceForm = this.fb.group({
      roll: [""],
      date: [""],
      status: [""]
    });
    this.route.queryParams
      .subscribe(params => {
        console.log(params['roll']);
        this.apiService.idByRoll.subscribe(
          value => {
            if(value!="-1"){
              this.apiService.getStudentDetailsById(value).subscribe(
                data => {
                  this.studentData['roll'] = data[0]['student_details']['roll'];
                  this.studentData['first_name'] = data[0]['student_details']['first_name'];
                  this.studentData['last_name'] = data[0]['student_details']['last_name'];
                  console.log(this.studentData);
                }
              );
            }
          }
        );
        this.apiService.getStudentIdByRoll(params['roll'])
      });
}

onSubmit(){
  console.log("submit");
  this.apiService.toggle.subscribe(
    data => {
     
    }
  )
  this.apiService.postAttendanceById(this.studentData.roll, this.newAttendanceForm.value['date'].toString().substring(4,15),this.newAttendanceForm.value['status']);
  alert("Attendance Marked!");
}
}
