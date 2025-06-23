
export const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

export const getMaxDOB = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 14);
  return today.toISOString().split("T")[0]; 
};

export const getTitle = (path) => {
  const cleanPath = path.split("/").filter(Boolean);
  if (cleanPath.length === 1) {
    return cleanPath[0].replace(/-/g, " ").toUpperCase(); 
  }

  if (cleanPath.includes("edit")) return "Edit Admission";
  if (cleanPath.includes("create")) return "Create Admission";
  if (cleanPath.includes("admission")) return "Admission Details";
  if (cleanPath.includes("projects")) return "Projects";

  // Default fallback
  return cleanPath[0]?.replace(/-/g, " ").toUpperCase();
};

