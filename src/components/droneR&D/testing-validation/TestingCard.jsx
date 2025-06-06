import { ArrowsUpDownIcon, CalendarDaysIcon, CalendarIcon, CheckCircleIcon, ClockIcon, FunnelIcon, UserIcon } from "@heroicons/react/24/outline";


const TestingCard = () => {
  return (
    <div className="dashboard-grid grid gap-8 md:grid-cols-2 p-4">
      {/* Test Plans */}
      <div className="test-plans">
        <div className="section-header flex justify-between items-center mb-4">
          <h3 className="section-title text-lg font-semibold text-gray-800">
            Test Plans
          </h3>
          <button className="btn bg-gray-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-600 text-sm">
            <FunnelIcon className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="plans-container space-y-4">
          {[
            {
              title: "Flight Stability Tests",
              status: "In Progress",
              description: "Validate drone stability in various wind conditions",
              progress: 65,
              tasks: "13/20",
              date: "Jun 10 - Jun 20",
              statusClass: "bg-yellow-200 text-yellow-800",
              active: true,
            },
            {
              title: "Thermal Imaging Calibration",
              status: "Planned",
              description: "Test thermal camera calibration across temperature ranges",
              progress: 15,
              tasks: "3/15",
              date: "Jun 15 - Jun 25",
              statusClass: "bg-blue-200 text-blue-800",
              active: false,
            },
            {
              title: "Battery Performance",
              status: "Completed",
              description: "Evaluate battery life under different payloads",
              progress: 100,
              tasks: "18/18",
              date: "Jun 1 - Jun 8",
              statusClass: "bg-green-200 text-green-800",
              active: false,
            },
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`plan-card border rounded p-4 shadow-sm space-y-2 ${
                plan.active ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div className="plan-header flex justify-between items-center">
                <div className="plan-title font-medium text-gray-800">
                  {plan.title}
                </div>
                <div
                  className={`plan-status text-xs px-2 py-1 rounded ${plan.statusClass}`}
                >
                  {plan.status}
                </div>
              </div>
              <p className="text-sm text-gray-600">{plan.description}</p>

              <div className="progress-bar h-2 bg-gray-200 rounded">
                <div
                  className="progress-fill bg-blue-600 h-2 rounded"
                  style={{ width: `${plan.progress}%` }}
                ></div>
              </div>

              <div className="plan-meta flex justify-between text-xs text-gray-600 mt-1">
                <div className="plan-meta-item flex items-center gap-1">
                  <CheckCircleIcon className="w-4 h-4" /> {plan.tasks}
                </div>
                <div className="plan-meta-item flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" /> {plan.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test Execution */}
      <div className="test-execution">
        <div className="section-header flex justify-between items-center mb-4">
          <h3 className="section-title text-lg font-semibold text-gray-800">
            Test Execution
          </h3>
          <button className="btn bg-gray-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-600 text-sm">
            <ArrowsUpDownIcon className="w-4 h-4" /> Sort
          </button>
        </div>

        <div className="test-cases space-y-4">
          {[
            {
              id: "TC-0421: Hover Stability",
              result: "Passed",
              resultClass: "bg-green-200 text-green-800",
              description: "Maintain stable hover in 15km/h winds for 10 minutes",
              user: "John D.",
              time: "12 min",
              date: "Jun 12",
            },
            {
              id: "TC-0422: Wind Gust Response",
              result: "Failed",
              resultClass: "bg-red-200 text-red-800",
              description: "Recover from sudden 25km/h wind gust",
              user: "Sarah L.",
              time: "8 min",
              date: "Jun 12",
            },
            {
              id: "TC-0423: Payload Stability",
              result: "Pending",
              resultClass: "bg-yellow-200 text-yellow-800",
              description: "Maintain stability with 1.2kg payload",
              user: "Michael T.",
              time: "Not started",
              date: "",
            },
            {
              id: "TC-0424: Low Temp Operation",
              result: "Pending",
              resultClass: "bg-yellow-200 text-yellow-800",
              description: "Functionality at -10°C for 30 minutes",
              user: "Emma R.",
              time: "Not started",
              date: "",
            },
          ].map((test, idx) => (
            <div
              key={idx}
              className="test-case border rounded p-4 shadow-sm bg-white space-y-2"
            >
              <div className="test-case-header flex justify-between items-center">
                <div className="test-case-id font-medium text-gray-800">
                  {test.id}
                </div>
                <div
                  className={`test-case-result text-xs px-2 py-1 rounded ${test.resultClass}`}
                >
                  {test.result}
                </div>
              </div>
              <p className="text-sm text-gray-600">{test.description}</p>
              <div className="plan-meta flex flex-wrap gap-4 text-xs text-gray-600 mt-1">
                <div className="plan-meta-item flex items-center gap-1">
                  <UserIcon className="w-4 h-4" /> {test.user}
                </div>
                <div className="plan-meta-item flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" /> {test.time}
                </div>
                {test.date && (
                  <div className="plan-meta-item flex items-center gap-1">
                    <CalendarDaysIcon className="w-4 h-4" /> {test.date}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestingCard;
