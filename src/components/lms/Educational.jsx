import { useState, useRef, useEffect } from "react";
import { subjectOptions } from "../../utills/enum";

const Educational = ({ formData, handleEducationChange }) => {
  const [openSubjectDropdownForIndex, setOpenSubjectDropdownForIndex] =
    useState(null);
  const dropdownRefs = useRef([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openSubjectDropdownForIndex !== null) {
        const currentDropdownRef =
          dropdownRefs.current[openSubjectDropdownForIndex];
        if (currentDropdownRef && !currentDropdownRef.contains(event.target)) {
          setOpenSubjectDropdownForIndex(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSubjectDropdownForIndex]);

  const handleCheckboxChange = (index, subject, isChecked) => {
    const currentSubjects = formData.education[index].subjects || [];
    let newSubjects = [...currentSubjects];

    newSubjects = isChecked
      ? [...newSubjects, subject]
      : newSubjects.filter((s) => s !== subject);

    handleEducationChange(index, "subjects", newSubjects);
  };

  const toggleSubjectsDropdown = (index) => {
    setOpenSubjectDropdownForIndex(
      openSubjectDropdownForIndex === index ? null : index
    );
  };

  return (
    <section className="bg-yellow-50 lg:p-6 rounded-lg shadow-sm">
      <h2 className="lg:text-xl font-semibold text-yellow-700 mb-4">
        Educational Qualification
      </h2>
      <div className="space-y-4 lg:text-base text-xs">
        <div className="hidden lg:grid grid-cols-8 gap-2 font-medium text-gray-700 mb-2">
          <span className="col-span-1">Exam Passed</span>
          <span className="col-span-1">Board</span>
          <span className="col-span-1">Year</span>
          <span className="col-span-1">Marks Obtained</span>
          <span className="col-span-1">Total Marks</span>
          <span className="col-span-1"> %age</span>
          <span className="col-span-1">CGPA</span>
          <span className="col-span-1">Subjects</span>
        </div>

        {formData.education.map((edu, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-4 lg:gap-2 p-4 sm:p-2 border border-gray-200 rounded-lg lg:border-none lg:rounded-none lg:p-0"
          >
            {/* Exam Passed */}
            <div className="flex flex-col col-span-full lg:col-span-1">
              <label className="block text-gray-700 text-xs font-medium mb-1 lg:hidden">
                Exam Passed
              </label>
              <input
                readOnly
                value={edu.examPassed}
                className="input bg-gray-100 p-2"
              />
            </div>

            {/* Board */}
            <div className="flex flex-col col-span-full lg:col-span-1">
              <label
                htmlFor={`board-${index}`}
                className="block text-gray-700 text-xs font-medium mb-1 lg:hidden"
              >
                Board
              </label>
              <input
                id={`board-${index}`}
                placeholder="Board"
                value={edu.board}
                onChange={(e) =>
                  handleEducationChange(index, "board", e.target.value)
                }
                className="input p-2"
              />
            </div>

            {/* Year */}
            <div className="flex flex-col col-span-full lg:col-span-1">
              <label
                htmlFor={`year-${index}`}
                className="block text-gray-700 text-xs font-medium mb-1 lg:hidden"
              >
                Year
              </label>
              <input
                id={`year-${index}`}
                placeholder="Year"
                value={edu.year}
                onChange={(e) =>
                  handleEducationChange(index, "year", e.target.value)
                }
                className="input p-2"
              />
            </div>

            {/* Marks Obtained */}
            <div className="flex flex-col col-span-full lg:col-span-1">
              <label
                htmlFor={`marksObtained-${index}`}
                className="block text-gray-700 text-xs font-medium mb-1 lg:hidden"
              >
                Marks Obtained
              </label>
              <input
                id={`marksObtained-${index}`}
                placeholder="Marks Obtained"
                type="number"
                value={edu.marksObtained}
                onChange={(e) =>
                  handleEducationChange(index, "marksObtained", e.target.value)
                }
                disabled={edu.cgpa !== ""}
                className={`input p-2 ${
                  edu.cgpa !== "" ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>

            {/* Total Marks */}
            <div className="flex flex-col col-span-full lg:col-span-1">
              <label
                htmlFor={`totalMarks-${index}`}
                className="block text-gray-700 text-xs font-medium mb-1 lg:hidden"
              >
                Total Marks
              </label>
              <input
                id={`totalMarks-${index}`}
                placeholder="Total Marks"
                type="number"
                value={edu.totalMarks}
                onChange={(e) =>
                  handleEducationChange(index, "totalMarks", e.target.value)
                }
                disabled={edu.cgpa !== ""}
                className={`input p-2 ${
                  edu.cgpa !== "" ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>

            {/* Percentage */}
            <div className="flex flex-col col-span-full lg:col-span-1">
              <label
                htmlFor={`percentage-${index}`}
                className="block text-gray-700 text-xs font-medium mb-1 lg:hidden"
              >
                %age
              </label>
              <input
                id={`percentage-${index}`}
                type="number"
                placeholder="%"
                value={edu.percentage}
                onChange={(e) =>
                  handleEducationChange(index, "percentage", e.target.value)
                }
                disabled={edu.cgpa !== ""}
                className={`input p-2 ${
                  edu.cgpa !== "" ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>

            {/* CGPA */}
            <div className="flex flex-col col-span-full lg:col-span-1">
              <label
                htmlFor={`cgpa-${index}`}
                className="block text-gray-700 text-xs font-medium mb-1 lg:hidden"
              >
                CGPA
              </label>
              <input
                id={`cgpa-${index}`}
                placeholder="CGPA"
                type="number"
                value={edu.cgpa}
                onChange={(e) =>
                  handleEducationChange(index, "cgpa", e.target.value)
                }
                disabled={
                  edu.percentage !== "" ||
                  (edu.marksObtained !== "" && edu.totalMarks !== "")
                }
                className={`input p-2 ${
                  edu.percentage !== "" ||
                  (edu.marksObtained !== "" && edu.totalMarks !== "")
                    ? "bg-gray-100 cursor-not-allowed"
                    : ""
                }`}
              />
            </div>

            {/* Subjects Dropdown */}
            <div
              className="flex flex-col col-span-full lg:col-span-1 relative"
              ref={(el) => (dropdownRefs.current[index] = el)}
            >
              <label className="block text-gray-700 text-xs font-medium mb-1 lg:hidden">
                Subjects
              </label>
              <div
                className="input p-2 cursor-pointer flex justify-between items-center bg-white border border-gray-300 rounded shadow-sm"
                onClick={() => toggleSubjectsDropdown(index)}
              >
                {edu.subjects && edu.subjects.length > 0
                  ? edu.subjects.join(", ")
                  : "Select Subject(s)"}
                <svg
                  className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                    openSubjectDropdownForIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>

              {openSubjectDropdownForIndex === index && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-48 overflow-y-auto">
                  {subjectOptions.map((subject) => (
                    <label
                      key={subject}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={subject}
                        checked={edu.subjects.includes(subject)}
                        onChange={(e) =>
                          handleCheckboxChange(index, subject, e.target.checked)
                        }
                        className="mr-2"
                      />
                      {subject}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Educational;
