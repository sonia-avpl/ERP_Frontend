import { useEffect, useState } from "react";
import { getTodayDate } from "../../../utills/functions";
import Courses from "../../lms/Courses";
import PersonalInformation from "../../lms/PersonalInformation";
import Educational from "../../lms/Educational";
import OtherInformation from "../../lms/OtherInformation";
import Decrations from "../../lms/Decrations";
import { usePatchFile } from "../../../hooks/usePatchFile";
import { usePost } from "../../../hooks/usePost";

const UpdateStudentForm = ({ initialData, onClose }) => {
  console.log("initialData", initialData);
  const { patchData, loading } = usePatchFile();
  const [formData, setFormData] = useState({
    studentImage: "",
    applicationReceivedOn: "",
    registrationNo: "",
    totalFees: "",
    govtOrPvt: "",
    courseName: "",
    yearlyFee: "",
    name: "",
    fatherName: "",
    motherName: "",
    dob: "",
    age: "",
    gender: "",
    fatherOccupation: "",
    category: "",
    nationality: "",
    permanentAddress: "",
    presentAddress: "",
    mobile: "",
    parentMobile: "",
    email: "",
    aadhar: "",
    education: [
      {
        examPassed: "8th",
        board: "",
        year: "",
        marksObtained: "",
        totalMarks: "",
        percentage: "",
        cgpa: "",
        subjects: [],
      },
      {
        examPassed: "High school",
        board: "",
        year: "",
        marksObtained: "",
        totalMarks: "",
        percentage: "",
        cgpa: "",
        subjects: [],
      },
      {
        examPassed: "Intermediate",
        board: "",
        year: "",
        marksObtained: "",
        totalMarks: "",
        percentage: "",
        cgpa: "",
        subjects: [],
      },
    ],
    disqualified: false,
    disqualificationDetails: "",
    isSportPerson: false,
    sportDetails: "",
    candidateDeclaration: {
      place: "",
      date: "",
      signatureImage: "",
    },
    parentDeclaration: {
      place: "",
      date: "",
      signatureImage: "",
    },
  });
  const { uploadImageOnSWithModule } = usePost();
  const [uploads, setUploads] = useState({
    studentImage: null,
    candidateImage: null,
    parentImage: null,
  });
  const [candidateSignaturePreview, setCandidateSignaturePreview] =
    useState(null);
  const [parentSignaturePreview, setParentSignaturePreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        dob: initialData.dob?.split("T")[0] || "",
        applicationReceivedOn:
          initialData.applicationReceivedOn?.split("T")[0] || "",
        education: initialData.education.map((edu) => ({
          ...edu,
          year: edu.year || "",
          marksObtained: edu.marksObtained || "",
          totalMarks: edu.totalMarks || "",
          percentage: edu.percentage || "",
          cgpa: edu.cgpa || "",
        })),
        candidateDeclaration: {
          ...initialData.candidateDeclaration,
          date: initialData.candidateDeclaration?.date?.split("T")[0] || "",
          signatureImage:
            initialData.candidateDeclaration?.signatureImage || "",
        },
        parentDeclaration: {
          ...initialData.parentDeclaration,
          date: initialData.parentDeclaration?.date?.split("T")[0] || "",
          signatureImage: initialData.parentDeclaration?.signatureImage || "",
        },
      });

      setCandidateSignaturePreview(
        initialData.candidateDeclaration?.signatureImage || null
      );
      setParentSignaturePreview(
        initialData.parentDeclaration?.signatureImage || null
      );
    }
  }, [initialData]);

  const handleSignatureChange = (e, declarationType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          [declarationType]: {
            ...prevData[declarationType],
            signatureImage: reader.result,
          },
        }));
        if (declarationType === "candidateDeclaration") {
          setCandidateSignaturePreview(reader.result);
        } else if (declarationType === "parentDeclaration") {
          setParentSignaturePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [declarationType]: {
          ...prevData[declarationType],
          signatureImage: "",
        },
      }));
      if (declarationType === "candidateDeclaration") {
        setCandidateSignaturePreview(null);
      } else if (declarationType === "parentDeclaration") {
        setParentSignaturePreview(null);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (
      name.startsWith("candidateDeclaration.") ||
      name.startsWith("parentDeclaration.")
    ) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];

    // Special handling for subjects (when it's a multi-select array)
    if (field === "subjects") {
      // 'value' for a multiple select is an array of selected options
      updatedEducation[index][field] = value;
    } else {
      updatedEducation[index][field] = value; // Update the current field
    }

    // Logic for mutual exclusivity between Percentage and CGPA
    if (field === "cgpa" && value !== "") {
      updatedEducation[index].percentage = ""; // Clear percentage if CGPA is being filled
    } else if (field === "percentage" && value !== "") {
      updatedEducation[index].cgpa = ""; // Clear CGPA if percentage is being filled
    }

    setFormData((prev) => ({ ...prev, education: updatedEducation }));
  };

  const handleCourseToggle = (course) => {
    setFormData((prev) => {
      const isSelected = prev.courseName.includes(course);
      return {
        ...prev,
        courseName: isSelected
          ? prev.courseName.filter((c) => c !== course)
          : [...prev.courseName, course],
      };
    });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const result = await patchData(`admission/${initialData._id}`, formData);

    if (result?.success) {
      if (uploads.studentImage) {
        await uploadImageOnSWithModule(
          [uploads.studentImage],
          result.data._id,
          FileModules.StudentImage
        );
      }
      if (uploads.candidateImage) {
        await uploadImageOnSWithModule(
          [uploads.candidateImage],
          result.data._id,
          FileModules.CanditateSignature
        );
      }
      if (uploads.parentImage) {
        await uploadImageOnSWithModule(
          [uploads.parentImage],
          result.data._id,
          FileModules.ParentSignature
        );
      }
    }

    onClose();
  };

  const handleStudentImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploads((prev) => ({ ...prev, studentImage: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          studentImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-4">
      <h1 className="lg:text-3xl font-bold text-center text-blue-800 mb-8">
        Student Admission Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-blue-50 p-6 rounded-lg shadow-sm">
          <h2 className="lg:text-xl text-sm font-semibold text-blue-700 mb-4">
            Application Details
          </h2>
          <div>
            <label
              htmlFor="studentImage"
              className="block text-gray-700 font-medium mb-1"
            >
              Student Image
            </label>
            <input
              type="file"
              name="studentImage"
              id="studentImage"
              accept="image/*"
              onChange={(e) => handleStudentImageChange(e)}
              className="input w-full p-2"
            />
            {formData.studentImage &&
              typeof formData.studentImage === "string" && (
                <img
                  src={formData.studentImage}
                  alt="Student Preview"
                  className="mt-2 h-32 w-32 object-cover rounded"
                />
              )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:text-base text-xs">
            <div>
              <label
                htmlFor="applicationReceivedOn"
                className="block text-gray-700 font-medium mb-1"
              >
                Application Received On
              </label>
              <input
                type="date"
                name="applicationReceivedOn"
                id="applicationReceivedOn"
                value={formData.applicationReceivedOn}
                onChange={handleChange}
                className="input w-full p-2 "
              />
            </div>
            <div>
              <label
                htmlFor="registrationNo"
                className="block text-gray-700  font-medium mb-1"
              >
                Registration No.
              </label>
              <input
                type="text"
                name="registrationNo"
                id="registrationNo"
                value={formData.registrationNo}
                onChange={handleChange}
                placeholder="e.g., REG12345"
                className="input w-full  p-2"
              />
            </div>
            <div className="">
              <label
                htmlFor="totalFees"
                className="block text-gray-700 font-medium mb-1 "
              >
                Total Fees (Rs)
              </label>
              <input
                type="number"
                name="totalFees"
                id="totalFees"
                value={formData.totalFees}
                onChange={handleChange}
                placeholder="e.g., 50000"
                className="input w-full p-2"
              />
            </div>
          </div>
        </section>

        <Courses
          formData={formData}
          handleCourseToggle={handleCourseToggle}
          courseType={formData.courseType}
        />
        <PersonalInformation formData={formData} handleChange={handleChange} />
        <Educational
          formData={formData}
          handleEducationChange={handleEducationChange}
        />
        <OtherInformation formData={formData} handleChange={handleChange} />
        <Decrations
          formData={formData}
          handleChange={handleChange}
          parentSignaturePreview={parentSignaturePreview}
          candidateSignaturePreview={candidateSignaturePreview}
          handleSignatureChange={handleSignatureChange}
        />
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white font-semibold lg:py-3 lg:px-8 p-2 text-sm rounded-lg transition duration-300 ease-in-out shadow-lg 
      ${
        loading
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
      }`}
          >
            {loading ? "Submitting..." : "Submit Admission Form"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStudentForm;
