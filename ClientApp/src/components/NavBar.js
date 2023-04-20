import {
  Avatar,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Link as ReactLink } from "react-router-dom";
import styles from "../styles/navbar.module.css";
const NavBarProject = () => {
  const [isLogged, setIsLogged] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = React.useState({});
  const navItems = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Jobs",
      path: isLogged ? `/${userData.role}/jobs` : "/user/jobs/",
    },
  ];
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (JSON.parse(userData)) {
      setIsLogged(true);
      setUserData(JSON.parse(userData));
    }
  }, []);
  console.log(isLogged && userData.role);
  const handleLogout = () => {
    onClose(); // Close the logout confirmation modal
    localStorage.clear("userData");
    window.location.reload();
  };

  return (
    <Flex direction="column" bg="#fff" px="10" py="2" w="100%">
      <Flex justify="space-between" alignItems="center">
        <Heading as="h1" fontWeight="800" fontSize="2xl">
          Job Portal
        </Heading>{" "}
        <Flex gap={5} alignItems="baseline">
          {navItems.map((item, i) => (
            <Link to={item.path} key={item.title}>
              <Text
                fontSize="md"
                fontWeight="600"
                style={{ cursor: "pointer" }}
                key={i}
                _hover={{ color: "purple.500" }}
              >
                {item.title}
              </Text>
            </Link>
          ))}
          {isLogged ? (
            <>
              <Button onClick={onOpen}>Logout</Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Logout Confirmation</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>Are you sure you want to logout?</Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleLogout}>
                      Logout
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          ) : (
            <>
              <Button
                as={ReactLink}
                to="/login"
                variant="ghost"
                colorScheme="blue"
              >
                Sign in
              </Button>
              <Button as={ReactLink} to="/signup" colorScheme="blue">
                Register
              </Button>
            </>
          )}
        </Flex>
        {/* <Avatar name={user.name} src={user.avatarURL} />{' '} */}
      </Flex>
      <Flex w="100%">
        <Outlet />
      </Flex>
    </Flex>
  );
};
export default NavBarProject;
