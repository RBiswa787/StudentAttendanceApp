export interface IStudentDetails{
    roll : string,
    first_name : string,
    last_name : string
}

export interface IAttendanceDetails{
    date  : string,
    status : string
}

export interface IData{
    id : string,
    student_details : IStudentDetails,
    attendance_details : IAttendanceDetails[]
}

export interface IAPIResponse {
    status : number;
}