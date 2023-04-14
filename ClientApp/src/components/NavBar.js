import {
    Avatar,
    Button,
    Container,
    Divider,
    Flex,
    Heading,
    Text,

} from '@chakra-ui/react';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import styles from '../styles/navbar.module.css';
const NavBarProject = () => {
    const navItems = [
        {
            title: 'Home',
            path: '/'
        },
        {
            title: 'Jobs',
            path: '/admin/jobs'
        },
    ];


    return (
        <Flex direction="column"  bg="#fff" px="10" py="2" w="100%" position="sticky" top="0" zIndex="1000">
            <Flex justify="space-between" alignItems="center">
                <Heading as="h1" fontWeight="800" fontSize="2xl">
                    Job Portal
                </Heading>{' '}
                <Flex gap={5} alignItems="baseline">
                    {navItems.map((item, i) => (
                        <Link to={item.path} key={item.title}>
                            <Text
                                fontSize="md"
                                fontWeight="600"
                                style={{ cursor: 'pointer' }}
                                key={i}>
                                {item.title}
                            </Text>
                        </Link>
                    ))}
                    <Button>Sign in</Button>
                    <Button colorScheme='telegram'>Register</Button>
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