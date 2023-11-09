import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { IAPIResponse, IAttendanceDetails, IData, IStudentDetails } from '../models/interfaces/Student';
import { BASE_URL } from '../constants/api.constant';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  postResponse = new BehaviorSubject<number>(3);
  idByRoll = new BehaviorSubject<string>("-1");
  toggle = new BehaviorSubject<boolean>(true);

  student : IData = {
    id : "",
    student_details : {
      roll : "",
      first_name : "",
      last_name : ""
    },
    attendance_details : [
      {
        date : "",
        status : ""
      }
    ]
  }

  constructor(private http : HttpClient) { }

  /**
   * 
   * @returns all student details of type IData[] as an Observable
   */
  getAllStudents(){
    return this.http.get<IData[]>(BASE_URL + "/data");
  }

  /**
   * 
   * @param student of type IStudentDetails
   * @returns void
   */
  postNewStudent(student : IStudentDetails) : void {

    let payload = {
      student_details : student,
      attendance_details : []
    }

    let all_students = this.getAllStudents();
    let existing_rolls : string[] = [];

    all_students.subscribe(
      data => {
        data.forEach(student => {
          existing_rolls.push(student['student_details']['roll']);
        });

        if(existing_rolls.includes(payload['student_details']['roll'])){
          this.postResponse.next(2);

        }
        else{
          try{
          this.http.post(BASE_URL + '/data', payload).subscribe(
            data => {
              this.postResponse.next(0);
              console.log(data);
            }
          );
          }
          catch(err){
          this.postResponse.next(1);
          }
        }
      }
    );

    
    
  }
  
  /**
   * 
   * @param payload of type IData
   * @returns: void
   */
  postExistingStudent(payload : IData) : void{
    this.http.post(BASE_URL + "/data",payload).subscribe(
      data => {
       
      }
    );
  }

  /**
   * Edit existing student record
   * @param student IStudentDetails
   * @returns Observable
   */
  editStudentDetails(student : IStudentDetails){
    let payload = {
      method: 'PUT', 
      headers: {'content-type':'application/json'},
      body: JSON.stringify({student_details : student})
    }
    return this.http.put(BASE_URL + '/data', payload);
  }

  /**
   * 
   * @param id : string
   * @returns Observable of type IData[]
   */
  getStudentDetailsById(id : string){
    return this.http.get<IData[]>(BASE_URL + '/data?id='+id);
  }

  /**
   * Get ID mapped to given Roll
   * @param roll : string
   * returns void
   */
  getStudentIdByRoll(roll : string) {
    this.getAllStudents().subscribe(
      data => {
        data.forEach(student => {
          if(student['student_details']['roll'] == roll){
            this.idByRoll.next(student['id']);
          }
        });
      }
    );
  }

  /**
   * Deletes record of given ID
   * @param id string
   * @returns Observable
   */
  deleteStudentById(id : string){

    return this.http.delete(BASE_URL  + '/data/' + id);
  }

  updateStudentDetails(student : IStudentDetails){
    let roll = student['roll'];
    this.idByRoll.subscribe(
      data => {
        
        this.getStudentDetailsById(data).subscribe(
          response => {
   
            response[0]['id'] = data;
            response[0]['student_details'] = student;
            //this.postExistingStudent(response[0]);
 
            this.http.put(BASE_URL +  '/data/' + data,response[0]).subscribe(
              resp => {
        
              }
            );
            
            // this.deleteStudentById(data).subscribe(
            //   success => {
            //     console.log(success);
            //     console.log(response);
            //     this.postExistingStudent(response[0]);
            //   }

            
              
            // );
            
          }
        )
      }
    );
    this.getStudentIdByRoll(roll);
  }

  postAttendanceById(roll: string, date: string, status: string){
    this.idByRoll.subscribe(
      id => {
        this.getStudentDetailsById(id).subscribe(
          data => {
            let attendance = data[0]['attendance_details'];
            let dates : string[]= [];
            let records : IAttendanceDetails[]= [];
            attendance.forEach(item => {
              if(!dates.includes(item['date'])){
                records.push(item);
                dates.push(item['date']);
              }
            });
            records.push({'date': date, 'status': status});
            data[0]['attendance_details'] = records;
            // this.deleteStudentById(id).subscribe(
            //   success => {
            //     this.postExistingStudent(data[0]);
            //   });
            this.http.put(BASE_URL + "/data/" + id,data[0]).subscribe(
              resp => {
   
                this.toggle.next(!this.toggle);
              }
            )
          }
        );
      }
    );
    this.getStudentIdByRoll(roll);
  }


  modifyAttendanceByRoll(roll: string, date: string, status: string){
    this.idByRoll.subscribe(
      id => {
        this.getStudentDetailsById(id).subscribe(
          data => {
            let attendance = data[0]['attendance_details'];
            attendance[attendance.indexOf(attendance.filter(record => {
              return record['date'] == date; 
            })[0])]['status'] = status;
            data[0]['attendance_details'] = attendance;
            this.deleteStudentById(id).subscribe(
              success => {
                this.postExistingStudent(data[0]);
              }
              );
          }
        );
      }
    );
    this.getStudentIdByRoll(roll);
  }

  reset(){
    this.postResponse.next(3);
  }

  


}
