import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Center,
  Alert,
  AlertIcon,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FaCalendar, FaClock, FaSave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getCompanies, getSubcategories } from "../../API/rest";
import { BASE_URL } from "../../utils/constant";
import { groupByCategory } from "../../utils/group";
import { getCategories } from "../../API/category";
import { updateJob } from "../../API/jobs";

const EditJobPages = () => {
  let { id } = useParams();
  console.log(id);
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    salary: "",
    companyname: "",
    desc: "",
    type: "",
  });

  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [companies, setCompanies] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const navigate = useNavigate();
  const [category, setCategory] = useState(formData.category);
  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: value,
      // Reset subcategory when category changes
    }));
  };
  const fetchData = async () => {
    let data = await getCategories();
    if (data.status) {
      setCategories(data.data);
    }
    data = await getCompanies();
    if (data.status) {
      setCompanies(data.data);
    }
    data = await getSubcategories();
    if (data.status) {
      setSubCategories(groupByCategory(data.data));
    }
    try {
      const response = await fetch(`${BASE_URL}/job/${id}`); // Replace with the appropriate API endpoint
      if (!response.ok) {
        throw new Error("Failed to retrieve job");
      }
      const jobData = await response.json();
      setFormData({
        category: jobData.subcategory.category.CatName, // assuming this is the category property
        subCategory: jobData.subcategory.subCatName,
        salary: jobData.salary,
        companyname: jobData.company.companyName,
        desc: jobData.description,
        type: jobData.jobType,
      });
      console.log(jobData);
    } catch (err) {
      console.error(err);
      // Handle the error, e.g., show an error message to the user
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const toast = useToast();
  const handleSubmit = async () => {
    // Validate form inputs
    const { category, subCategory, salary, companyname, type, desc } = formData;
    console.log(formData);
    if (!subCategory || !salary || !companyname || !type || !desc) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (isNaN(Number(salary)) || Number(salary) <= 0) {
      setErrorMessage("Salary must be a positive number.");
      return;
    }

    const data = await updateJob(id, {
      Salary: salary,
      CompanyID: companyname,
      Description: desc,
      SubCatID: subCategory,
      JobType: type,
      JobID: id,
    });
    if (data.status) {
      setErrorMessage("");
      setFormData({
        category: "",
        subCategory: "",
        salary: "",
        companyname: "",
        type: "",
        desc: "",
      });
      toast({
        title: "Job updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/admin/jobs");
    }

    // Navigate to a success page or perform any other desired action
  };

  return (
    <Center w="100%">
      <Box rounded={"lg"} bg="white" boxShadow={"lg"} w="420px" p={6}>
        <Heading mb={6} size="lg" textAlign="center">
          Create Jobs
        </Heading>
        {errorMessage && (
          <Alert status="error" mb={6}>
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}
        <Stack spacing={3}>
          <FormControl>
            <FormLabel htmlFor="category">Category</FormLabel>
            <Select
              id="category"
              value={formData.category}
              onChange={handleCategoryChange}
              placeholder={formData.category}
            >
              {categories &&
                categories.length > 0 &&
                categories.map((category, i) => (
                  <option key={i} value={category.catId}>
                    {category.catName}
                  </option>
                ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="subCategory">Subcategory</FormLabel>
            <Select
              id="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              placeholder="Select subcategory"
            >
              {subcategories[formData.category] &&
                subcategories[formData.category].map((subCategory, i) => (
                  <option key={i} value={subCategory.subCatId}>
                    {subCategory.subCategory}
                  </option>
                ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="salary">Salary</FormLabel>
            <Input
              type="number"
              id="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Enter salary"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="company">company</FormLabel>
            <Select
              id="companyname"
              value={formData.companyname}
              onChange={handleChange}
              placeholder="Select Company"
            >
              {companies.length > 0 &&
                companies.map((company, i) => (
                  <option key={i} value={company.companyID}>
                    {company.companyName}
                  </option>
                ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="type">Type</FormLabel>
            <Input
              type="text"
              id="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Enter job type"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="desc">Description</FormLabel>
            <Textarea
              type="text"
              id="desc"
              value={formData.desc}
              onChange={handleChange}
              placeholder="Enter job description"
            />
          </FormControl>
          <Button
            leftIcon={<FaSave />}
            colorScheme="blue"
            onClick={handleSubmit}
          >
            Update Job
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default EditJobPages;
