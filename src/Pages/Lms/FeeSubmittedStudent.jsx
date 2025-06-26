import { useState } from "react";
import StudentList from "../../components/list/StudentList";

const FeeSubmittedStudent = () => {
  const [students, setStudents] = useState([
    { id: "S001", name: "Alice Smith", grade: "10A", feeSubmitted: true },
    { id: "S002", name: "Bob Johnson", grade: "9B", feeSubmitted: false },
    { id: "S003", name: "Charlie Brown", grade: "10A", feeSubmitted: true },
    { id: "S004", name: "Diana Prince", grade: "11C", feeSubmitted: false },
    { id: "S005", name: "Eve Adams", grade: "9B", feeSubmitted: true },
    { id: "S006", name: "Frank White", grade: "10B", feeSubmitted: false },
    { id: "S007", name: "Grace Lee", grade: "9A", feeSubmitted: true },
    { id: "S008", name: "Henry Green", grade: "11A", feeSubmitted: true },
  ]);
  const feeSubmittedStudents = students.filter((s) => s.feeSubmitted);
  return (
    <div>
      <StudentList
        title="Fee Submitted Students List"
        students={feeSubmittedStudents}
      />
    </div>
  );
};

export default FeeSubmittedStudent;
