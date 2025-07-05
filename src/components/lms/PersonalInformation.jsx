import { useState, useEffect } from "react";
import { getMaxDOB } from "../../utills/functions";

const PersonalInformation = ({ formData, handleChange }) => {
  const [sameAsPermanent, setSameAsPermanent] = useState(false);

  useEffect(() => {
    if (sameAsPermanent) {
      handleChange({
        target: {
          name: "presentAddress",
          value: formData.permanentAddress,
        },
      });
    }
  }, [sameAsPermanent, formData.permanentAddress]);

  useEffect(() => {
    if (formData.dob) {
      const dob = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      handleChange({
        target: {
          name: "age",
          value: age.toString(),
        },
      });
    }
  }, [formData.dob]);

  return (
    <section className="bg-purple-50 p-6 rounded-lg shadow-sm">
      <h2 className="lg:text-xl font-semibold text-purple-700 mb-4">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:text-base text-xs">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-1"
          >
            Candidate Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="input w-full p-2"
          />
        </div>

        <div>
          <label
            htmlFor="fatherName"
            className="block text-gray-700 font-medium mb-1"
          >
            Father's Name
          </label>
          <input
            type="text"
            name="fatherName"
            id="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            placeholder="Father's Full Name"
            className="input w-full p-2"
          />
        </div>

        <div>
          <label
            htmlFor="motherName"
            className="block text-gray-700 font-medium mb-1"
          >
            Mother's Name
          </label>
          <input
            type="text"
            name="motherName"
            id="motherName"
            value={formData.motherName}
            onChange={handleChange}
            placeholder="Mother's Full Name"
            className="input w-full p-2"
          />
        </div>

        <div>
          <label htmlFor="dob" className="block text-gray-700 font-medium mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            max={getMaxDOB()}
            className="input w-full p-2"
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-gray-700 font-medium mb-1">
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleChange}
            readOnly
            className="input w-full p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-gray-700 font-medium mb-1"
          >
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className="input w-full p-2"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="fatherOccupation"
            className="block text-gray-700 font-medium mb-1"
          >
            Father's Occupation
          </label>
          <input
            type="text"
            name="fatherOccupation"
            id="fatherOccupation"
            value={formData.fatherOccupation}
            onChange={handleChange}
            placeholder="e.g., Engineer, Business"
            className="input w-full p-2"
          />
        </div>

        <div>
          <label
            htmlFor="nationality"
            className="block text-gray-700 font-medium mb-1"
          >
            Nationality
          </label>
          <input
            type="text"
            name="nationality"
            id="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder="e.g., Indian"
            className="input w-full p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="permanentAddress"
            className="block text-gray-700 font-medium mb-1"
          >
            Permanent Address
          </label>
          <textarea
            name="permanentAddress"
            id="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleChange}
            placeholder="Full permanent address"
            rows="3"
            className="input w-full p-2"
          ></textarea>
        </div>

        <div className="md:col-span-2 flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            id="sameAsPermanent"
            checked={sameAsPermanent}
            onChange={(e) => setSameAsPermanent(e.target.checked)}
          />
          <label htmlFor="sameAsPermanent" className="text-gray-700 text-sm">
            Same as Permanent Address
          </label>
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="presentAddress"
            className="block text-gray-700 font-medium mb-1"
          >
            Present Address
          </label>
          <textarea
            name="presentAddress"
            id="presentAddress"
            value={formData.presentAddress}
            onChange={handleChange}
            placeholder="Full present address"
            rows="3"
            className="input w-full p-2"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-1"
          >
            Mobile No.
          </label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="e.g., +91 9876543210"
            className="input w-full p-2"
          />
        </div>

        <div>
          <label
            htmlFor="parentMobile"
            className="block text-gray-700 font-medium mb-1"
          >
            Parent's Mobile No.
          </label>
          <input
            type="text"
            name="parentMobile"
            id="parentMobile"
            value={formData.parentMobile}
            onChange={handleChange}
            placeholder="e.g., +91 9876543210"
            className="input w-full p-2"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g., example@domain.com"
            className="input w-full p-2"
          />
        </div>

        <div>
          <label
            htmlFor="aadhar"
            className="block text-gray-700 font-medium mb-1"
          >
            Aadhar Card No.
          </label>
          <input
            type="text"
            name="aadhar"
            id="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            placeholder="XXXX XXXX XXXX"
            className="input w-full p-2"
          />
        </div>
      </div>
    </section>
  );
};

export default PersonalInformation;
