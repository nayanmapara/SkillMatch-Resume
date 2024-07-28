import * as React from "react";
import type { NextPage } from "next";
import {
  Box,
  Container,
  Stack,
  Heading,
  Text,
  VStack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { SEO } from "components/seo/seo";

const About: NextPage = () => {
  const authors = [
    {
      name: "Ryan Farekh",
      description:
        "Hello! I'm Ryan Farekh, a computer engineering student at McMaster University with a passion for AI, machine learning, and robotics. I enjoy solving complex problems and developing innovative solutions. I am fascinated by the practical applications of AI, from creating intelligent systems to designing autonomous robots. My goal is to enhance processes and user experiences through smart, efficient technologies. I have expertise in Python, C, C++, Assembly, Java, JavaScript, and Verilog. I work with TensorFlow, PyTorch, Node.js, React.js, Arduino, and LTSpice, bringing projects from concept to reality. Please visit my personal website to learn more: ryanfarekh.com. Thanks for visiting!"
    },
    {
      name: "Niharika Pathuri",
      description:
        "I am a passionate fourth-year Software Engineering student with a keen interest in software engineering, AI, and machine learning. Dedicated to mastering cutting-edge technologies, I aim to drive innovation and solve real-world challenges. I am eager to apply my skills in developing impactful solutions that positively affect people’s lives. Currently, I am exploring opportunities to gain hands-on experience and contribute meaningfully to the field. You can find me on LinkedIn: https://www.linkedin.com/in/niharika-pathuri/",
    },
    {
      name: "Nayan Mapara",
      description: "Transforming ideas into reality with a creative edge and a relentless pursuit of perfection. To know more about me, visit my LinkedIn profile: https://www.linkedin.com/in/nayanmapara/",
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
}> = ({ name, description }) => {
  const bg = useColorModeValue("gray.100", "gray.700");

  return (
    <VStack
      spacing="4"
      alignItems="flex-start"
      w="full"
      p="5"
      borderRadius="md"
      bg={bg}
      boxShadow="md"
    >
      <Heading as="h3" size="md">
        {name}
      </Heading>
      <Text>{description}</Text>
    </VStack>
  );
};

export default About;
