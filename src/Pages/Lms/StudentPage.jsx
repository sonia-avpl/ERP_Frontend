import { useEffect, useState } from "react";
import StudentList from "../../components/list/StudentList";
import { useGet } from "../../hooks/useGet";
import LoadinSpinner from "../../components/common/LoadinSpinner";
import { itiLocations, polytechnicLocations } from "../../utills/helper";

const ITEMS_PER_PAGE = 5;

const StudentPage = () => {
  const [locationFilter, setLocationFilter] = useState("");
  const { data, loading, refetch } = useGet(
    `admission${locationFilter ? `?location=${locationFilter}` : ""}`
  );
  const admissionList = data?.data || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [feeStatusFilter, setFeeStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const allLocations = [...itiLocations, ...polytechnicLocations];
  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 400);
    return () => clearTimeout(delay);
  }, [inputValue]);

  const filteredList = admissionList.filter((student) => {
    const matchesSearch =
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registrationNo?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFeeStatus =
      feeStatusFilter === "All" ||
      (feeStatusFilter === "Submitted" && student.feeStatus) ||
      (feeStatusFilter === "Pending" && !student.feeStatus);

    return matchesSearch && matchesFeeStatus;
  });

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const paginatedList = filteredList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const filtersUI = (
    <div className="flex flex-wrap gap-4 items-center">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search name or registration no."
        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm"
      />
      <select
        value={feeStatusFilter}
        onChange={(e) => setFeeStatusFilter(e.target.value)}
        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm"
      >
        <option value="All">All</option>
        <option value="Submitted">Submitted</option>
        <option value="Pending">Pending</option>
      </select>
      <select
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm"
      >
        <option value="">All Locations</option>
        {allLocations.map((loc, index) => (
          <option key={index} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
  if (loading) {
    return <LoadinSpinner text="Loading users..." />;
  }
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <StudentList
        loading={loading}
        admissionList={paginatedList}
        filtersUI={filtersUI}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        refetch={refetch}
      />
    </div>
  );
};

export default StudentPage;
