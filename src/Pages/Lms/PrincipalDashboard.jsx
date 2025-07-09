import { LayoutDashboard, UserPlus, Users, Wallet, BookOpen } from "lucide-react"; // Import BookOpen or another suitable icon
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
  const submittedStudents = students?.data?.filter(
    (student) => student.feeStatus === true
  );
  const pendingStudents = students?.data?.filter(
    (student) => student.feeStatus === false
  );
  const TotalsubmittedStudents = submittedStudents?.length;

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
            // onClick={() => navigate("/all-submitted")} // Uncomment if you want to navigate
          />
          <StatsCard
            title="Add New Student"
            value="New"
            icon={UserPlus}
            onClick={() => navigate("/admission-form")}
          />

          {/* New Card for Process Guide */}
          <div
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => window.open("https://docs.google.com/document/d/1N7UHGhoDEDqOsTOhulotcvrr5WkfsbEQT42gPUtRW8c/edit?tab=t.eki3gtx6qhwj", "_blank")}
          >
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-indigo-600 mr-4" /> {/* Using BookOpen icon */}
              <div>
                <p className="text-xl font-semibold text-gray-800">Process Guide</p>
                <p className="text-sm text-gray-500">View operational procedures</p>
              </div>
            </div>
            {/* Optional: Add an arrow icon to indicate it's a link */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

        </div>

        {/* You can re-enable your Recent Activities section if needed */}
        {/* <div className="mt-12 bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Recent Activities
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>New student 'Mark Twain' added to Grade 9C.</li>
            <li>Fee collection drive started for Quarter 3.</li>
            <li>Upcoming parent-teacher meeting on Oct 26th.</li>
          </ul>
        </div> */}

      </div>
      {showAddStudent && (
        <AddStudentForm onClose={() => setShowAddStudent(false)} />
      )}
    </div>
  );
};

export default PrincipalDashboard;