const certifications = [
  {
    title: "Type Certification (TC)",
    status: "Pending",
    statusColor: "bg-yellow-100 text-yellow-700",
    description: "DGCA Type Certification for Eagle Surveillance Drone",
    progress: 65,
    meta: ["Submitted: Jun 1, 2023", "65% Complete"],
  },
  {
    title: "Production Certification (PC)",
    status: "Approved",
    statusColor: "bg-green-100 text-green-700",
    description: "Manufacturing facility certification",
    progress: 90,
    meta: ["Approved: May 15, 2023", "Valid until: May 14, 2025"],
  },
  {
    title: "Air Operator Certificate",
    status: "Draft",
    statusColor: "bg-gray-200 text-gray-700",
    description: "Authorization for commercial operations",
    progress: 30,
    meta: ["Target Submission: Jul 15, 2023", "30% Complete"],
  },
];

const CertificationDashboard = () => {
  return (
    <div className="certification-dashboard grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-4">
      {certifications.map((cert) => (
        <div key={cert.title} className="status-card bg-white p-4 rounded shadow">
          <div className="status-header flex justify-between items-center mb-2">
            <div className="status-title font-semibold text-gray-800">{cert.title}</div>
            <div className={`status-badge text-xs px-2 py-0.5 rounded ${cert.statusColor}`}>
              {cert.status}
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">{cert.description}</p>

          <div className="status-progress h-2 bg-gray-200 rounded mb-2">
            <div
              className="status-progress-fill bg-blue-600 h-full rounded"
              style={{ width: `${cert.progress}%` }}
            ></div>
          </div>

          <div className="status-meta text-xs text-gray-500 flex justify-between">
            <span>{cert.meta[0]}</span>
            <span>{cert.meta[1]}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificationDashboard;
