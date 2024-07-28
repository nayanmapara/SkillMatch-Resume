import * as React from "react";
import type { NextPage } from "next";
import {
  Box,
  Container,
  Stack,
  Heading,
  Text,
  VStack,
  Avatar,
} from "@chakra-ui/react";
import { SEO } from "components/seo/seo";


const About: NextPage = () => {
  const authors = [
    {
      name: "Ryan Farekh",
      description: "Description about Author 1.",
      avatar: "/static/images/avatar1.jpg",
    },
    
    {
      name: "Niharika Pathuri",
      description: "Description about Author Niharika",
      avatar: "/static/images/avatar3.jpg",
    },
    {
        name: "Nayan Mapara",
        description: "Description about Author Nayan",
        avatar: "/static/images/avatar3.jpg",
      },
  ];

  return (
    <Box>
      <SEO title="About Us" description="Learn more about the authors" />
      <Container maxW="container.xl" py="12">
        <Heading as="h1" mb="8" textAlign="center">
          About Us
        </Heading>
        <Stack spacing="12">
          {authors.map((author, index) => (
            <AuthorCard key={index} {...author} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

const AuthorCard: React.FC<{
  name: string;
  description: string;
  avatar: string;
}> = ({ name, description, avatar }) => {
  return (
    <VStack spacing="4" alignItems="flex-start">
      <Avatar src={avatar} size="xl" />
      <Box>
        <Heading as="h3" size="md">
          {name}
        </Heading>
        <Text>{description}</Text>
      </Box>
    </VStack>
  );
};

export default About;
