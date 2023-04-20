import axios from "axios";
import { BASE_URL } from "../utils/constant";

export const postJobModel = async (jobData) => {
  try {
    const response = await axios.post(`http://localhost:5091/api/job`, jobData);
    console.log("res", response);
    if (response.status === 201) {
      console.log("Job created successfully:", response.data);
      return { status: true, data: response.data };
    } else if (response.status === 401) {
      return { status: false, data: response.data }; //
    }
  } catch (error) {
    console.error("Failed to create job:", error);
  }
};

export const deleteJobs = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/Job/${id}`);
    if (response.status === 204) {
      console.log("Jobs Deleted successfully");
      return { status: true };
    } else if (response.status === 401) {
      return { status: false }; //
    }
  } catch (error) {
    console.error("Failed to delete appointment:", error);
  }
};
export const updateJob = async (id, jobModel) => {
  try {
    const response = await axios.put(
      `http://localhost:5091/api/job/${id}`,
      jobModel
    );

    if (response.status === 204) {
      console.log("Appointment Updated successfully");
      return { status: true };
    } else if (response.status === 401) {
      return { status: false }; //
    }
  } catch (error) {
    console.error("Error updating job model:", error);
  }
};
