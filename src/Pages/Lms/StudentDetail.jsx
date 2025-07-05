import { useGet } from "../../hooks/useGet";
import { useParams } from "react-router-dom";
import {
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  HomeIcon,
  CakeIcon,
  BriefcaseIcon,
  TagIcon,
  AcademicCapIcon,
  CurrencyRupeeIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  CheckBadgeIcon,
  HandRaisedIcon,
  TrophyIcon,
  BookOpenIcon,
  SparklesIcon,
  GlobeAltIcon,
  CreditCardIcon,
  InformationCircleIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import LoadinSpinner from "../../components/common/LoadinSpinner";
import { useState } from "react";
import { EditStudentModalWrapper } from "../../components/modals/principal/EditStudentModalWrapper";
import { PencilIcon } from "lucide-react";
import GroupedPayment from "../../components/lms/GroupedPayments";

const StudentDetail = () => {
  const { id } = useParams();
  const { data, loading, error, refetch } = useGet(`admission/${id}`);
  const [showEditModal, setShowEditModal] = useState(false);
  const { data: feeTransaction } = useGet(
    `fees/getSingleFeeDetails/${data?.data?.studentId}`
  );
  const student = data?.data;

  const totalPaid =
    feeTransaction?.reduce((acc, txn) => acc + txn.payingAmt, 0) || 0;
  const dueAmount = student?.totalFees - totalPaid;

  console.log("data", data);

  if (loading) {
    return <LoadinSpinner text="Loading users..." />;
  }

  console.log("student", student);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getGenderIcon = (gender) => {
    if (gender === "Female") {
      return (
        <svg
          className="h-5 w-5 text-pink-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-4H7V8h4V4h2v4h4v4h-4v4zM12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zM12 11c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      );
    }
    return (
      <svg
        className="h-5 w-5 text-blue-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-4H7V8h4V4h2v4h4v4h-4v4zM12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zM12 11c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      </svg>
    );
  };

  const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start text-gray-700 py-2 text-sm">
      <Icon className="h-4 w-4 text-blue-500 mr-3 flex-shrink-0 mt-1" />
      <div className="flex flex-col sm:flex-row sm:items-center w-full">
        <span className="font-medium min-w-[100px] sm:mr-2">{label}:</span>
        <span className="ml-0 sm:ml-2 text-gray-800 break-words">{value}</span>
      </div>
    </div>
  );

  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center  font-semibold text-gray-700 border-b border-gray-200 pb-3 mb-4">
      <Icon className="h-5 w-5 text-blue-600 mr-3" />
      <h3>{title}</h3>
    </div>
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-4">
      <div className="rounded-lg overflow-hidden">
        <div className="bg-white p-6 md:p-8 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-4 md:mb-0 min-w-0">
            <h1 className="lg:text-xl font-extrabold text-gray-800 leading-tight truncate">
              {student.name.toUpperCase()}
            </h1>

            <p className="text-xs text-gray-600 flex items-center mt-2">
              <ClipboardDocumentCheckIcon className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
              <span className="font-semibold">REG No:</span>{" "}
              {student.registrationNo}
            </p>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <CalendarDaysIcon className="h-4 w-4 text-gray-500 mr-1 flex-shrink-0" />
              <span className="font-medium">Applied:</span>{" "}
              {formatDate(student.applicationReceivedOn)}
            </p>

            <div className="text-xs text-gray-500 flex items-center mt-1">
              <AcademicCapIcon className="h-4 w-4 text-gray-500 mr-1 flex-shrink-0 " />
              <span className="font-medium">{student.courseName}</span>
            </div>

            <div className="text-xs text-gray-500 flex items-center mt-1 ">
              <MapPinIcon className="h-4 w-4 text-gray-500 mr-1 flex-shrink-0" />
              <span className="font-medium">{student.collegeLocation}</span>
            </div>

            <div className="text-xs text-gray-500 flex items-center mt-1 ">
              <ClockIcon className="h-4 w-4 text-gray-500 mr-1 flex-shrink-0" />
              <span className="font-medium">{student.courseDuration}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4 md:mt-0 flex-shrink-0 w-full md:w-auto">
            <div className="flex justify-end">
              <button
                onClick={() => setShowEditModal(true)}
                className="bg-gray-600 text-white text-sm p-2 rounded-full hover:bg-gray-700 flex items-center gap-2"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-md font-bold shadow-sm ${
                  student.feeStatus
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                <CreditCardIcon className="h-5 w-5 mr-2" />
                {student.feeStatus ? "PAID" : "DUE"}
              </span>

              <div className="flex flex-col text-gray-800">
                <div className="flex items-center text-2xl font-bold">
                  <CurrencyRupeeIcon className="h-6 w-6 text-gray-600 mr-2" />
                  <p>{dueAmount}</p>
                </div>
                <div className="text-xs text-gray-500 mt-1 ml-8">
                  Total: ₹{student.totalFees.toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8 lg:gap-6">
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <SectionHeader icon={UserIcon} title="Personal Info" />
              <div className="space-y-2">
                <DetailItem
                  icon={UserIcon}
                  label="Father"
                  value={student.fatherName}
                />
                <DetailItem
                  icon={UserIcon}
                  label="Mother"
                  value={student.motherName}
                />
                <DetailItem
                  icon={CakeIcon}
                  label="DOB"
                  value={formatDate(student.dob)}
                />
                <div className="flex items-start text-gray-700 py-2">
                  {getGenderIcon(student.gender)}
                  <div className="flex flex-col sm:flex-row sm:items-center w-full">
                    <span className="font-medium ml-3 min-w-[100px] sm:mr-2 text-sm">
                      Gender:
                    </span>
                    <span className="ml-0 sm:ml-2 text-gray-800 text-sm">
                      {student.gender}
                    </span>
                  </div>
                </div>
                <DetailItem
                  icon={BriefcaseIcon}
                  label="Father's Job"
                  value={student.fatherOccupation}
                />
                <DetailItem
                  icon={TagIcon}
                  label="Category"
                  value={student.category}
                />
                <DetailItem
                  icon={GlobeAltIcon}
                  label="Nationality"
                  value={student.nationality}
                />
                <DetailItem
                  icon={CheckBadgeIcon}
                  label="Aadhar"
                  value={student.aadhar}
                />
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <SectionHeader icon={PhoneIcon} title="Contact Info" />
              <div className="space-y-2">
                <DetailItem
                  icon={HomeIcon}
                  label="Address"
                  value={student.permanentAddress
                    .split("\n")
                    .map((line, index) => (
                      <p key={index} className="leading-tight">
                        {line}
                      </p>
                    ))}
                />
                <DetailItem
                  icon={PhoneIcon}
                  label="Mobile"
                  value={student.mobile}
                />
                <DetailItem
                  icon={PhoneIcon}
                  label="Parent Mobile"
                  value={student.parentMobile}
                />
                <DetailItem
                  icon={EnvelopeIcon}
                  label="Email"
                  value={student.email}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <SectionHeader icon={BookOpenIcon} title="Fee Installments" />
              <GroupedPayment feeTransaction={feeTransaction} />
            </div>

            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <SectionHeader icon={SparklesIcon} title="Education History" />
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Exam
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Board
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Result
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Subjects
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {student.education.map((edu, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blue-50 even:bg-white odd:bg-gray-50 transition duration-150 ease-in-out"
                      >
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {edu.examPassed}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {edu.board}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {edu.year}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {edu.percentage
                            ? `${edu.percentage}%`
                            : edu.cgpa
                            ? `CGPA: ${edu.cgpa}`
                            : ""}
                          {edu.marksObtained && edu.totalMarks
                            ? ` (${edu.marksObtained}/${edu.totalMarks})`
                            : ""}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {edu.subjects?.join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 bg-white">
                <SectionHeader
                  icon={InformationCircleIcon}
                  title="Declarations"
                />
                <div className="space-y-3">
                  <div className="flex items-start text-gray-700 py-1">
                    <UserIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-sm">Candidate:</p>
                      <p className="ml-2 text-sm text-gray-800 flex flex-wrap items-center">
                        <MapPinIcon className="h-4 w-4 mr-1 text-gray-400 flex-shrink-0" />
                        <span className="mr-3">
                          {student.candidateDeclaration.place}
                        </span>
                        <CalendarIcon className="h-4 w-4 mr-1 text-gray-400 flex-shrink-0" />
                        <span>
                          {formatDate(student.candidateDeclaration.date)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start text-gray-700 py-1">
                    <UserIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-sm">Parent:</p>
                      <p className="ml-2 text-sm text-gray-800 flex flex-wrap items-center">
                        <MapPinIcon className="h-4 w-4 mr-1 text-gray-400 flex-shrink-0" />
                        <span className="mr-3">
                          {student.parentDeclaration.place}
                        </span>
                        <CalendarIcon className="h-4 w-4 mr-1 text-gray-400 flex-shrink-0" />
                        <span>
                          {formatDate(student.parentDeclaration.date)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 bg-white">
                <SectionHeader
                  icon={InformationCircleIcon}
                  title="Other Info"
                />
                <div className="space-y-3 text-sm">
                  <div className="flex items-start text-gray-700 py-1">
                    <HandRaisedIcon
                      className={`h-5 w-5 ${
                        student.disqualified ? "text-red-500" : "text-green-500"
                      } mr-3 flex-shrink-0`}
                    />
                    <div className="flex flex-col sm:flex-row w-full">
                      <span className="font-medium min-w-[100px] sm:mr-2">
                        Disqualified:
                      </span>
                      <span className="text-gray-800">
                        {student.disqualified
                          ? `Yes: ${student.disqualificationDetails}`
                          : "No"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start text-gray-700 py-1">
                    <TrophyIcon
                      className={`h-5 w-5 ${
                        student.isSportPerson
                          ? "text-yellow-600"
                          : "text-gray-500"
                      } mr-3 flex-shrink-0`}
                    />
                    <div className="flex flex-col sm:flex-row w-full">
                      <span className="font-medium min-w-[100px] sm:mr-2">
                        Sport Person:
                      </span>
                      <span className="text-gray-800">
                        {student.isSportPerson
                          ? `Yes: ${student.sportDetails}`
                          : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showEditModal && (
          <EditStudentModalWrapper
            initialData={student}
            onClose={() => setShowEditModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default StudentDetail;
