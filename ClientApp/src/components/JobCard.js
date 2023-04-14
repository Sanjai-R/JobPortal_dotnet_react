import React from 'react'
import { Card, CardBody, Text, Button, Flex, Divider, Badge, VStack } from '@chakra-ui/react'
import { HiOutlineLocationMarker } from 'react-icons/hi';

export const JobCard = ({ data }) => {
    return (
        <>
            <Card >
                <CardBody>
                    <Flex w="100%" justifyContent="space-between" >
                        <Flex direction="column" >
                            <Flex alignItems="center">
                                <Text fontSize='lg' fontWeight="700"> {data.role},</Text>
                                <Text fontSize='lg' fontWeight="600" >{data.companyname}</Text>
                            </Flex>
                            <Flex alignItems="center">
                                <HiOutlineLocationMarker color="#949494"  style={{ fontWeight: "800" }} />
                                <Text fontSize='md' fontWeight="500" color="#949494"> {data.location}</Text>
                            </Flex>
                        </Flex>
                        <VStack mb="3">
                            <Text fontSize='md' fontWeight="500" color="#0088CC"> ${data.salary}</Text>
                            <Badge fontSize='0.9em'>
                                REMOTE
                            </Badge>
                        </VStack>

                    </Flex>

                    <Divider fontWeight="900" color="#949494" />

                    <Text mt="3" color="#949494" fontWeight="500" fontSize='sm' textAlign="justify" >Seeking a skilled to develop and maintain web applications, troubleshoot issues, optimize performance, and collaborate with cross-functional teams to deliver high-quality software solutions</Text>

                    <Button colorScheme='telegram' size="sm" w="100%" mt="3">Apply</Button>
                </CardBody>
            </Card>

        </>
    );
}
