
import React from "react";


const StudentInfoCard = ({student,overdue,showOverdue})  =>{
  return (
      <div className="container border-left m-3" >
          <div className="row">
          <div className="pl-3">
            <img width='150' height='200' src={student.img}  alt="" className="img-rounded"/>
          </div>
          <div className="pl-4">
          <div>
            <p><b>Name:</b> {student.name}</p>
          </div>
          <div>
            <p><b>Department:</b> {student.department}</p>
          </div>
          <div>
            <p><b>Email:</b> {student.username}</p>
          </div>
          <div>
            <p><b>Overdue book(s):</b> <button className="btn btn-info"  onClick={()=>showOverdue()}>{overdue.length}</button></p>
          </div>
          </div>
          </div>
      </div>
  )
}


export default StudentInfoCard