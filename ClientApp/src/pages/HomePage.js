import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { JobCard } from "../components/JobCard";
import { Link } from "react-router-dom";

const Home = () => {
  const data = [
    {
      id: 1,
      salary: 5000.0,
      desc: "Web Developer job",
      type: "Remote",
      category: "IT",
      companyname: "Apple",
      jobName: "Web Development",
      location: "USA",
    },
    {
      id: 2,
      salary: 6000.0,
      desc: "Data Scientist job",
      type: "On-Company",
      category: "IT",
      companyname: "Amazon",
      jobName: "Data Science",
      location: "Canada",
    },
    {
      id: 3,
      salary: 4000.0,
      desc: "Accountant job",
      type: "Remote",
      category: "Finance",
      companyname: "Presidio",
      jobName: "Accounting",
      location: "Mexico",
    },
  ];
  return (
    <Box bg="purple.500" minHeight="100vh" w="100%">
      <Container maxW="3xl" w="100%" py="12" textAlign="center">
        <Heading size="2xl" mb="6" color="white">
          Find Your Dream Job
        </Heading>
        <Text fontSize="lg" color="gray.100" mb="8">
          Discover and Apply for Exciting Job Opportunities
        </Text>
        <Button colorScheme="teal" size="lg" as={Link} to="/admin/jobs">
          Explore Job Opportunities
        </Button>
      </Container>

      <Box bg="gray.100" py="12" w="100%">
        <Heading size="xl" mb="8">
          Why Choose Our Job Portal?
        </Heading>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "8", md: "12" }}
        >
          <Box
            flex="1"
            borderRadius="md"
            bg="teal.300"
            p={6}
            _hover={{ bg: "teal.500", boxShadow: "md" }}
            transition="background-color 0.2s, box-shadow 0.2s"
          >
            <Heading size="md" fontWeight="bold" mb={4} color="white">
              Wide Range of Job Opportunities
            </Heading>
            <Text fontSize="md" color="white">
              Our job portal offers a diverse range of job opportunities across
              various industries and locations, catering to job seekers with
              different skills and experience levels.
            </Text>
          </Box>
          <Box
            flex="1"
            borderRadius="md"
            bg="pink.300"
            p={6}
            _hover={{ bg: "pink.500", boxShadow: "md" }}
            transition="background-color 0.2s, box-shadow 0.2s"
          >
            <Heading size="md" fontWeight="bold" mb={4} color="white">
              User-Friendly Interface
            </Heading>
            <Text fontSize="md" color="white">
              Our platform features an easy-to-use interface, making it simple
              for job seekers to search, filter, and apply to jobs effortlessly.
            </Text>
          </Box>
          <Box
            flex="1"
            borderRadius="md"
            bg="blue.300"
            p={6}
            _hover={{ bg: "blue.500", boxShadow: "md" }}
            transition="background-color 0.2s, box-shadow 0.2s"
          >
            <Heading size="md" fontWeight="bold" mb={4} color="white">
              Job Listing Updates
            </Heading>
            <Text fontSize="md" color="white">
              Regularly update job listings to ensure they are current and
              accurate. This can involve verifying job status, salary
              information, and other relevant details to ensure that job seekers
              are provided with up-to-date and reliable information.
            </Text>
          </Box>
        </Stack>
      </Box>

      <Box bg="gray.100" py="7" w="100%">
        <Heading size="xl" mb="8">
          Latest Job Opportunities
        </Heading>
        <SimpleGrid
          bg="gray.100"
          spacing={2}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {data.map((job) => (
            <JobCard data={job} />
          ))}
        </SimpleGrid>
      </Box>
      <Box bg="purple.500" py="12" color="white">
        <Container maxW="xl" textAlign="center">
          <Heading size="xl" mb="6">
            Join Our Job Portal Today!
          </Heading>
          <Text fontSize="lg" mb="8">
            Sign up now and start exploring job opportunities
          </Text>
          <Button
            bg="white"
            color="purple.600"
            size="lg"
            as={Link}
            to="/signup"
          >
            Sign Up
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
