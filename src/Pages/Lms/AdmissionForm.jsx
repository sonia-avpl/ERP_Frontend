import { useEffect, useState } from "react";
import Decrations from "../../components/lms/Decrations";
import OtherInformation from "../../components/lms/OtherInformation";
import Educational from "../../components/lms/Educational";
import PersonalInformation from "../../components/lms/PersonalInformation";
import Courses from "../../components/lms/Courses";
import { getTodayDate } from "../../utills/functions";
import { usePostFile } from "../../hooks/usePostFile";
import { usePost } from "../../hooks/usePost";
import { FileModules } from "../../utills/enum";
import { itiLocations, polytechnicLocations } from "../../utills/helper";
import ApiService from "../../services/axiosInstance";
import { useAuth } from "../../components/context/AuthContext";

const AdmissionForm = () => {
  const { postData, loading } = usePostFile();
  const { uploadImageOnSWithModule } = usePost();
  const [courseType, setCourseType] = useState("");
  const [collegeLocation, setCollegeLocation] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  console.log("use", user);

  const [formData, setFormData] = useState({
    applicationReceivedOn: getTodayDate(),
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
  const [uploads, setUpload] = useState({
    candidateImage: null,
    parentImage: null,
  });
  const [candidateSignaturePreview, setCandidateSignaturePreview] =
    useState(null);
  const [parentSignaturePreview, setParentSignaturePreview] = useState(null);
  useEffect(() => {
    const fetchCourseFeeDetails = async () => {
      const selectedCourse = formData.courseName;
      const selectedCategory = formData.category;
      const selectedGovtOrPvt = formData.govtOrPvt;

      if (!selectedCourse || !selectedGovtOrPvt) return;

      try {
        let query = `admission/fee-details?courseName=${selectedCourse}&govtOrPvt=${selectedGovtOrPvt}`;

        // Only include category if Govt is selected
        if (selectedGovtOrPvt === "Government" && selectedCategory) {
          query += `&category=${selectedCategory}`;
        }

        const res = await ApiService.get(query);
        const { totalFee, cautionFee, courseDuration, yearlyFee } = res.data;

        setFormData((prev) => ({
          ...prev,
          totalFees: totalFee || "",
          cautionFee: cautionFee || "",
          courseDuration: courseDuration || "",
          yearlyFee: yearlyFee || "",
        }));
      } catch (error) {
        console.error("Failed to fetch course fee details:", error);
        setFormData((prev) => ({
          ...prev,
          totalFees: "",
          cautionFee: "",
          courseDuration: "",
          yearlyFee: "",
        }));
      }
    };

    fetchCourseFeeDetails();
  }, [formData.courseName, formData.category, formData.govtOrPvt]);

  const handleSignatureChange = (e, declarationType) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (declarationType === "candidateDeclaration") {
        setUpload((prev) => ({ ...prev, candidateImage: file }));
        setCandidateSignaturePreview(reader.result);
      } else if (declarationType === "parentDeclaration") {
        setUpload((prev) => ({ ...prev, parentImage: file }));
        setParentSignaturePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
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
      setFormData((prev) => {
        const updatedData = {
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        };

        // Reset category if user selects "Private"
        if (name === "govtOrPvt" && value === "Private") {
          updatedData.category = "";
        }

        return updatedData;
      });
    }
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    if (field === "subjects") {
      updatedEducation[index][field] = value;
    } else {
      updatedEducation[index][field] = value;
    }

    if (field === "cgpa" && value !== "") {
      updatedEducation[index].percentage = "";
    } else if (field === "percentage" && value !== "") {
      updatedEducation[index].cgpa = "";
    }

    setFormData((prev) => ({ ...prev, education: updatedEducation }));
  };

  const handleCourseToggle = (course) => {
    setFormData((prev) => ({
      ...prev,
      courseName: course,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };
    payload.createdBy = user?._id;
    payload.collegeLocation = collegeLocation;
    payload.courseType = courseType;
    console.log("payload", payload);
    const result = await postData(`admission/add`, payload);
    if (result?.success) {
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
  };
  const getFilteredLocations = () => {
    if (courseType === "iti") return itiLocations;
    if (courseType === "polytechnic") return polytechnicLocations;
    return [];
  };
  return (
    <>
      {!showForm ? (
        <div className="flex items-center justify-center bg-gradient-to-r from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-xl space-y-6 border border-blue-100">
            <h2 className="text-2xl font-bold text-center text-blue-800">
              Select Admission Details
            </h2>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Select Course Type
              </label>
              <select
                value={courseType}
                onChange={(e) => setCourseType(e.target.value)}
                className="input w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Select --</option>
                <option value="iti">ITI</option>
                <option value="polytechnic">Polytechnic</option>
              </select>
            </div>

            {courseType && (
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Select College Location
                </label>
                <select
                  value={collegeLocation}
                  onChange={(e) => setCollegeLocation(e.target.value)}
                  className="input w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">-- Select College --</option>
                  {getFilteredLocations().map((location, i) => (
                    <option key={i} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {courseType && collegeLocation && (
              <div className="text-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-md"
                >
                  Proceed to Admission Form
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mx-4 bg-white lg:p-8 p-4 rounded-xl shadow-lg my-8">
          <div className="text-sm text-gray-500 mb-4 text-right italic">
            Course Type:{" "}
            <span className="font-medium">{courseType.toUpperCase()}</span> |
            College: <span className="font-medium">{collegeLocation}</span>
          </div>

          <h1 className="lg:text-3xl font-bold text-center text-blue-800 mb-8">
            Student Admission Form
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <section className="bg-blue-50 p-6 rounded-lg shadow-sm">
              <Courses
                formData={formData}
                handleCourseToggle={handleCourseToggle}
                courseType={courseType}
              />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:text-base text-xs">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-gray-700  font-medium mb-1"
                  >
                    Govt./Private
                  </label>
                  <select
                    name="govtOrPvt"
                    id="govtOrPvt"
                    value={formData.govtOrPvt}
                    onChange={handleChange}
                    className="input w-full p-2 text-sm"
                  >
                    <option value="">Select Govt./Private</option>
                    <option>Government</option>
                    <option>Private</option>
                  </select>
                </div>
                {formData.govtOrPvt === "Government" && (
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Category
                    </label>
                    <select
                      name="category"
                      id="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="input w-full p-2 text-sm"
                    >
                      <option value="">Select Category</option>
                      <option>General</option>
                      <option>OBC</option>
                      <option>SC</option>
                      <option>ST</option>
                    </select>
                  </div>
                )}

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
                    className="input w-full p-2 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="registrationNo"
                    className="block text-gray-700 font-medium mb-1"
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
                    className="input w-full  p-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Yearly fee
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={formData.yearlyFee || 0}
                    className="input w-full p-2 bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Course Duration
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={formData.courseDuration}
                    className="input w-full p-2 bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Caution Fee (Rs)
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={formData.cautionFee}
                    className="input w-full p-2 bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label
                    htmlFor="totalFees"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Total Fees (Rs)
                  </label>
                  <input
                    type="number"
                    name="totalFees"
                    id="totalFees"
                    value={formData.totalFees || 0}
                    onChange={handleChange}
                    readOnly
                    className="input w-full p-2 bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>
            </section>

            <PersonalInformation
              formData={formData}
              handleChange={handleChange}
            />
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
      )}
    </>
  );
};

export default AdmissionForm;
