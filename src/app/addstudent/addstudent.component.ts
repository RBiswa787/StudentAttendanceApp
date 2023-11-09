import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import {  } from '@angular/forms'
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss']
})
export class AddstudentComponent {
  newStudentForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,private apiService : ApiService) { }

ngOnInit(): void {
  this.newStudentForm = this.fb.group({
    roll: [""],
    first_name: [""],
    last_name: [""]
  });
}

onSubmit(){
  console.log(this.newStudentForm);
  this.apiService.postNewStudent({roll: this.newStudentForm.value['roll'],first_name: this.newStudentForm.value['first_name'],last_name: this.newStudentForm.value['last_name']});
  alert("Successfully Added Student!");
}

}
