import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import {  } from '@angular/forms'
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { ApiService } from 'src/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { IStudentDetails } from 'src/shared/models/interfaces/Student';


@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.scss']
})
export class EditstudentComponent {
  records : any[] = [];
  existingStudentForm: FormGroup = this.fb.group({});
  studentData : IStudentDetails = {
    roll : '',
    first_name : '',
    last_name : ''
  }

  constructor(private fb: FormBuilder,private apiService : ApiService,private route: ActivatedRoute){
  };


  ngOnInit(){
  
    this.existingStudentForm = this.fb.group({
      roll: [""],
      first_name: [""],
      last_name: [""]
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
                  this.existingStudentForm.value['roll'] = data[0]['student_details']['roll'];
                  this.existingStudentForm.value['first_name'] = data[0]['student_details']['first_name'];
                  this.existingStudentForm.value['last_name'] = data[0]['student_details']['last_name'];
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
    console.log(this.existingStudentForm);
    this.apiService.updateStudentDetails({roll: this.existingStudentForm.value['roll'],first_name: this.existingStudentForm.value['first_name'],last_name: this.existingStudentForm.value['last_name']});
    alert("Updated Successfully. Please Refresh!");
  }

}
