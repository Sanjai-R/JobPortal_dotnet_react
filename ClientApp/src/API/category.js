import axios from "axios";
import { BASE_URL } from "../utils/constant";

export const getCategories = async () => {
  try {
    const response = await axios.get("/api/category");
    console.log(response);
    return { status: true, data: response.data };
  } catch (error) {
    console.error(error);
    return null;
  }
};
// Create a new category
export const createCategory = async (category) => {
  try {
    const response = await axios.post("/api/Category", category);
    if (response.status === 201 || response.status === 200) {
      console.log("Jobs Deleted successfully");
      return { status: true };
    } else if (response.status === 401) {
      return { status: false }; //
    }
  } catch (error) {
    console.error(error);
  }
};

// Update an existing category
export const updateCategory = async (categoryId, category) => {
  console.log(category);
  try {
    const response = await axios.put(`${BASE_URL}/category/${categoryId}`, {
      catName: category,
      CatID: categoryId,
    });
    if (response.status === 204) {
      console.log("Jobs Deleted successfully");
      return { status: true };
    } else if (response.status === 401) {
      return { status: false }; //
    }
  } catch (error) {
    console.error(error);
  }
};

// Delete a category
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/Category/${categoryId}`);
    if (response.status === 204) {
      console.log("Jobs Deleted successfully");
      return { status: true };
    } else if (response.status === 401) {
      return { status: false }; //
    }
  } catch (error) {
    console.error(error);
  }
};
