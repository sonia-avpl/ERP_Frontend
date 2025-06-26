
import ApiService from "../services/axiosInstance";

export const toggleUserStatus = async (userId, isApproved) => {
  try {
    const response = await ApiService.patch(`auth/disable/${userId}/status`, {
      isApproved,
    });
    return response.data;
  } catch (error) {
    console.error("Error toggling user status:", error);
    return { success: false, message: error.message };
  }
};
