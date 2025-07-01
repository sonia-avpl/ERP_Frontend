import { ItiCourses, polytechnicCourses } from "../../utills/enum";

const Courses = ({ formData, handleCourseToggle, courseType }) => {
  const courses = courseType === "iti" ? ItiCourses : polytechnicCourses;
  console.log("courseType", courseType);
  return (
    <section className="mb-5">
      <h2 className="lg:text-xl font-semibold text-green-700 mb-2">
        Select Course(s)
      </h2>
      <div className="flex flex-wrap gap-x-6 gap-y-3 lg:text-base text-xs">
        {courses.map((course) => (
          <label key={course} className="flex items-center gap-2 text-gray-800">
            <input
              type="radio"
              name="course"
              checked={formData.courseName === course}
              onChange={() => handleCourseToggle(course)}
              className="form-radio h-4 w-4 text-blue-600"
            />
            {course}
          </label>
        ))}
      </div>
    </section>
  );
};

export default Courses;
