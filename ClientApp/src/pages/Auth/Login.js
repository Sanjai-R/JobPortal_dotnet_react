import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  InputGroup,
  InputRightElement,
  Center,
  FormErrorMessage,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ReactLink } from "react-router-dom";
import { Login } from "../../API/user";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const [formData, setFormData] = React.useState({
    Email: "",
    Password: "",
  });
  const [errors, setErrors] = React.useState({});
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (JSON.parse(userData)) {
      navigate("/");
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const data = await Login(formData);
      if (data.status) {
        console.log(data.data);
        localStorage.setItem("userData", JSON.stringify(data.data));
        navigate(`/${data.data.role}/jobs`);
        window.location.reload();
      }
    }
  };
  const validateForm = (data) => {
    const errors = {};
    if (!data.Email) {
      errors.email = "Email is required";
    }
    if (!data.Password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleClick = () => setShow(!show);

  return (
    <Center w="100vw" h="80vh">
      <Box rounded={"lg"} bg="white" w="380px" boxShadow={"lg"} p={6}>
        <Heading size="lg" mb={6} textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Stack spacing={1}>
            <FormControl id="Email" isInvalid={Boolean(errors.email)}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.Email}</FormErrorMessage>
            </FormControl>
            <FormControl id="Password" isInvalid={Boolean(errors.password)}>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.Password}</FormErrorMessage>
            </FormControl>

            <Stack spacing={5} mt={10} pt={3}>
              <Link color={"blue.400"} as={ReactLink} to="/forgetPassword">
                Forgot password?
              </Link>
              <Button type="submit" colorScheme="purple">
                Sign in
              </Button>
            </Stack>
            <Stack pt={6} w="100%">
              <Text align={"center"}>
                Don't have an Account?{" "}
                <Link color={"blue.400"} as={ReactLink} to="/signup">
                  signup
                </Link>
              </Text>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Center>
  );
};
export default LoginPage;
