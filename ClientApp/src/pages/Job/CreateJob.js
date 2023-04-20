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
} from "@chakra-ui/react";
import { FaCalendar, FaClock, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCompanies, getSubcategories } from "../../API/rest";
import { Signup } from "../../API/user";
import { postJobModel } from "../../API/jobs";
import { getCategories } from "../../API/category";
import { groupByCategory } from "../../utils/group";

const CreateJobsPage = () => {
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    salary: "",
    companyname: "",
    desc: "",
    type: "",
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [companies, setCompanies] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
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
      subCategory: "", // Reset subcategory when category changes
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
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    // Validate form inputs
    const { category, subCategory, salary, companyname, type, desc } = formData;
    if (
      !category ||
      !subCategory ||
      !salary ||
      !companyname ||
      !type ||
      !desc
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (isNaN(Number(salary)) || Number(salary) <= 0) {
      setErrorMessage("Salary must be a positive number.");
      return;
    }
    console.log({
      Salary: salary,
      CompanyID: companyname,
      Description: desc,
      SubCatID: subCategory,
      JobType: type,
    });
    const data = await postJobModel({
      Salary: salary,
      CompanyID: companyname,
      Description: desc,
      SubCatID: subCategory,
      JobType: type,
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
              placeholder="Select category"
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
              {formData.category &&
                subcategories[formData.category] &&
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
            Save
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default CreateJobsPage;
