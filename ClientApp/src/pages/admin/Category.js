import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Heading,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  useDisclosure, // Import useDisclosure from Chakra UI
} from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../API/category";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  // Replace useState with useDisclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [categories, setCategories] = useState([]); // Fetch category data from getCategories function
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  const toast = useToast();
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    if (data.status) {
      setCategories(data.data);
    }
  };

  const handleCreateCategory = async () => {
    if (newCategoryName) {
      const newCategory = {
        catName: newCategoryName,
      };
      const data = await createCategory(newCategory);
      if (data.status) {
        setCategories([...categories, data.data]);
        setNewCategoryName("");
        onClose();
        toast({
          title: "Category created.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/admin/category");
        window.location.reload();
      } else {
        toast({
          title: "Failed to create category.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category.catName);
    onOpen(); // Use onOpen from useDisclosure to open the modal
  };
  const navigate = useNavigate();
  const handleUpdateCategory = async () => {
    if (editingCategory && newCategoryName) {
      const data = await updateCategory(editingCategory.catID, newCategoryName);
      if (data.status) {
        setEditingCategory(null);
        setNewCategoryName("");
        onClose(); // Use onClose from useDisclosure to close the modal
        toast({
          title: "Category updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        window.location.reload();
        navigate("/admin/category");
      } else {
        toast({
          title: "Failed to update category.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleDeleteCategory = async (catID) => {
    console.log(catID);
    const data = await deleteCategory(catID);
    if (data.status) {
      const updatedCategories = categories.filter(
        (category) => category.catID !== catID
      );
      setCategories(updatedCategories);
      toast({
        title: "Category deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed to delete category.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <VStack spacing={4} align="stretch" mb={4}>
        <Heading>Categories</Heading>
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={onOpen}>
          Add Category
        </Button>
      </VStack>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Category Name</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => (
            <Tr key={category.catID}>
              <Td>{category.catName}</Td>
              <Td>
                <Tooltip label="Edit" hasArrow placement="top">
                  <IconButton
                    icon={<FaEdit />}
                    variant="ghost"
                    onClick={() => handleEditCategory(category)}
                  />
                </Tooltip>
                <Tooltip label="Delete" hasArrow placement="top">
                  <IconButton
                    icon={<FaTrash />}
                    variant="ghost"
                    onClick={() => handleDeleteCategory(category.catID)}
                  />
                </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* Modal for adding/editing category */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingCategory ? "Edit Category" : "Add Category"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              onClick={
                editingCategory ? handleUpdateCategory : handleCreateCategory
              }
            >
              {editingCategory ? "Update" : "Create"}
            </Button>
            <Button onClick={onClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CategoryPage;
