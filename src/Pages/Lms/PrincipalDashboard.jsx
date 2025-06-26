import { LayoutDashboard, UserPlus, Users, Wallet } from "lucide-react";
import StatsCard from "../../components/cards/StatsCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddStudentForm from "../../components/modals/principal/UpdateStudentForm";
import { useGet } from "../../hooks/useGet";

const PrincipalDashboard = () => {
  const { data: students, loading } = useGet(`admission`);

  const navigate = useNavigate();
  const [showAddStudent, setShowAddStudent] = useState(false);

  const totalStudents = students?.data?.length;
  // const feeSubmittedStudentsCount = students?.filter(
  //   (s) => s.feeSubmitted
  // ).length;
  const submittedStudents = students?.data?.filter(
    (student) => student.feeStatus === true
  );
  const pendingStudents = students?.data?.filter(
    (student) => student.feeStatus === false
  );
  const TotalsubmittedStudents = submittedStudents?.length;
  console.log("totalStudents", submittedStudents, TotalsubmittedStudents);
  return (
    <div className="min-h-screen bg-gray-100 font-sans flex text-gray-900">
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <StatsCard
            title="Total Students"
            value={totalStudents}
            icon={Users}
            onClick={() => navigate("/all-students")}
          />
          <StatsCard
            title="Fee Submitted"
            value={TotalsubmittedStudents}
            icon={Wallet}
            // onClick={() => navigate("/all-submitted")}
          />
          <StatsCard
            title="Add New Student"
            value="New"
            icon={UserPlus}
            onClick={() => navigate("/admission-form")}
          />
        </div>

        <div className="mt-12 bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Recent Activities
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>New student 'Mark Twain' added to Grade 9C.</li>
            <li>Fee collection drive started for Quarter 3.</li>
            <li>Upcoming parent-teacher meeting on Oct 26th.</li>
          </ul>
        </div>
      </div>
      {showAddStudent && (
        <AddStudentForm onClose={() => setShowAddStudent(false)} />
      )}
    </div>
  );
};

export default PrincipalDashboard;
