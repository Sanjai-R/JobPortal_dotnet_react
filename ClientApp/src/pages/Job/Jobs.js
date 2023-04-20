import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { JobCard } from "../../components/JobCard";
import { matchSorter } from "match-sorter";
import { BsSearch } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

export const JobsPage = () => {
  let { userType } = useParams();
  console.log(userType);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queryParams, setQueryParams] = useState("companyname");
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const response = await fetch("http://localhost:5091/api/job");
    const data = await response.json();
    console.log(data);
    setJobs(data);
    setLoading(false);
    console.log(data);
  };

  const queryParamsArr = ["salary", "location", "companyname"];
  // matchSorter(objList, 'P', { keys: ['companyname'] })
  return (
    <Flex direction="column" w="100%" m="3">
      <Text fontSize="2xl" fontWeight="600">
        List of Jobs
      </Text>
      <Flex w="100%" justifyContent="space-between" gap="3" mb="4">
        <InputGroup size="md">
          <InputLeftElement pointerEvents="none" children={<BsSearch />} />
          <Input
            bg="#fff"
            placeholder="Enter query"
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>
        <Select
          w="30%"
          bg="#fff"
          variant="filled"
          placeholder="Select Search type"
          onChange={(e) => setQueryParams(e.target.value)}
        >
          {queryParamsArr.map((item, i) => (
            <option value={item} key={i}>
              {item}
            </option>
          ))}
        </Select>
        {userType === "admin" && (
          <Button w="10%" colorScheme="purple" as={Link} to="/admin/create">
            Create
          </Button>
        )}
      </Flex>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <SimpleGrid
          spacing={2}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {matchSorter(jobs, query, { keys: [queryParams] }).map((job) => (
            <JobCard data={job} userType={userType} />
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
};
