import React from "react";

import NavMenu from "./NavBar";
import { Flex } from "@chakra-ui/react";

const Layout = (props) => {
  return (
    <d>
      <NavMenu />
      <Flex px="10" py="2" w="100%">
        {props.children}
      </Flex>
    </d>
  );
};

export default Layout;
