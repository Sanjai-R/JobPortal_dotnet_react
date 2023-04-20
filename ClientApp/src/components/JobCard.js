import React from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  Badge,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { color } from "../utils/color";
import { deleteJobs } from "../API/jobs";
import { Link } from "react-router-dom";

export const JobCard = ({ data, userType }) => {
  console.log(data.id);
  const { isOpen, onOpen, onClose } = useDisclosure();
   const handleDelete = async () => {
     const res = await deleteJobs(data.id);
     console.log(res);
     if (res.status) {
       onClose();
       window.location.reload();
     }
     // onClose();
   };
  return (
    <Box bg="white" borderRadius="md" shadow="md" p="4">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex direction="column" mr="4">
          <Text fontSize="lg" fontWeight="700">
            {data.jobName}
          </Text>
          <Flex alignItems="center" mt="2" w="100%">
            <HiOutlineLocationMarker
              color={color.secondary}
              style={{ fontWeight: "800", marginRight: "2" }}
            />
            <Text fontSize="md" fontWeight="500" color={color.secondary}>
              {data.location}
            </Text>
          </Flex>
          <Text fontSize="sm" fontWeight="500" color={color.secondary} mt="2">
            {data.companyname}
          </Text>
          <Text fontSize="sm" fontWeight="500" color={color.secondary} mt="2">
            Category: {data.category}
          </Text>
        </Flex>
        <Box>
          <Text fontSize="lg" fontWeight="700" color={color.primary}>
            ${data.salary}
          </Text>
          <Badge
            fontSize="sm"
            colorScheme={data.type === "On-Company" ? "green" : "orange"}
            mt="2"
          >
            {data.type}
          </Badge>
        </Box>
      </Flex>
      <Divider my="4" borderColor={color.secondary} />
      <Text fontSize="sm" fontWeight="500" color={color.secondary}>
        Seeking a skilled to develop and maintain web applications, troubleshoot
        issues
      </Text>
      {userType === "admin" ? (
        <Flex justify="flex-end" mt={4}>
          <Button
            variant="outline"
            colorScheme="blue"
            size="sm"
            mr={2}
            as={Link}
            to={`/admin/edit/${data.id}`}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            colorScheme="red"
            size="sm"
            onClick={onOpen}
          >
            Delete
          </Button>
        </Flex>
      ) : (
        <Button
          colorScheme="purple"
          size="sm"
          w="100%"
          mt="4"
          onClick={() => alert("Applied!")}
        >
          Apply Now
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Appointment</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this appointment?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
