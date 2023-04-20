import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  IconButton,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Flex,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getSubcategories } from "../../API/rest";

const SubCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [method, setMethod] = useState("POST");
  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    const data = await getSubcategories();
    if (data.status) {
      setCategories(data.data);
    }
  };
  const OpenModel = (method) => {
    onOpen();
    setMethod(method);
  };
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    OpenModel("PUT");
  };

  const handleUpdateCategory = async (id, subCat) => {
    try {
      console.log(id, subCat);
      await fetch(
        `http://localhost:5091/api/subcategory/${editingCategory.subCatId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subCategory: subCat,
            catId: editingCategory.catId,
          }),
        }
      );
      fetchSubCategories();

      setEditingCategory(null);
      onClose();
    } catch (error) {
      console.error("Failed to update category", error);
    }
  };

  const handleCreateCategory = async (subcat) => {
    try {
      await fetch("http://localhost:5091/api/subcategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subCategory: subcat,
        }),
      });
      fetchSubCategories();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create category", error);
    }
  };

  const handleDeleteCategory = async (catId) => {
    try {
      await fetch(`http://localhost:5091/api/subcategory/${catId}`, {
        method: "DELETE",
      });
      fetchSubCategories();
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p={4} bg="white" w="100%">
      <Heading mb={4}>SubCategories</Heading>
      <Flex direction="column" w="100%" alignItems="flex-start">
        <Table width="100%" textAlign="center">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category) => (
              <Tr key={category.subCatId}>
                <Td>{category.subCategory}</Td>
                <Td>{category.category}</Td>
                <Td>
                  <Tooltip label="Edit" hasArrow>
                    <IconButton
                      aria-label="Edit"
                      icon={<FaEdit />}
                      onClick={() => handleEditCategory(category)}
                    />
                  </Tooltip>
                </Td>
                <Td>
                  <Tooltip label="Delete" hasArrow>
                    <IconButton
                      aria-label="Delete"
                      icon={<FaTrash />}
                      onClick={() => handleDeleteCategory(category.subCatId)}
                    />
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button
          mt={4}
          onClick={() => {
            OpenModel("POST");
          }}
        >
          Add SubCategory
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {method === "PUT" ? "Edit SubCategory" : "Add SubCategory"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} alignItems="stretch">
              <Input
                placeholder="SubCategory Name"
                // value={}
                // onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <Select
                placeholder="Select Category"
                // value={newCategoryParent}
                // onChange={(e) => setNewCategoryParent(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.subCatId} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </Select>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              onClick={
                editingCategory ? handleUpdateCategory : handleCreateCategory
              }
            >
              {editingCategory ? "Update" : "Create"}
            </Button>
            <Button onClick={() => onClose()}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SubCategoryPage;
