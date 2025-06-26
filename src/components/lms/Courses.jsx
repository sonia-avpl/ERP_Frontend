import { courses } from "../../utills/enum";



const Courses = ({ formData, handleCourseToggle }) => {
  return (
    <section className="bg-green-50 p-6 rounded-lg shadow-sm">
      <h2 className="lg:text-xl font-semibold text-green-700 mb-4">
        Select Course(s)
      </h2>
      <div className="flex flex-wrap gap-x-6 gap-y-3 lg:text-base text-xs">
        {courses.map((course) => (
          <label key={course} className="flex items-center gap-2 text-gray-800">
            <input
              type="checkbox"
              checked={formData.courseName.includes(course)}
              onChange={() => handleCourseToggle(course)}
              className="form-checkbox h-4 w-4 text-blue-600 rounded"
            />
            {course}
          </label>
        ))}
      </div>
    </section>
  );
};

export default Courses;
