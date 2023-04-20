import axios from "axios";

export const getSubcategories = async () => {
  try {
    const response = await axios.get("/api/subcategory");
    return { status: true, data: response.data.data };
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getCompanies = async () => {
  try {
    const response = await axios.get("/api/Company");
    return { status: true, data: response.data };
  } catch (error) {
    console.error(error);
    return null;
  }
};
