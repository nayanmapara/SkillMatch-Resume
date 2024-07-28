import * as React from "react";
import type { NextPage } from "next";
import NextLink from 'next/link';
import {
  Box,
  Container,
  Stack,
  HStack,
  ButtonGroup,
  Button,
  Icon,
  Heading,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import { FallInPlace } from "components/motion/fall-in-place";
import { Hero } from "components/hero";
import { Link } from "@chakra-ui/react";
import { NextjsLogo, ChakraLogo } from "components/logos";
import {
  FiArrowRight,
  FiSmile,
  FiSliders,
  FiGrid,
  FiThumbsUp,
} from "react-icons/fi";
import { Features } from "components/features";
import { BackgroundGradient } from "components/gradients/background-gradient";

const Home: NextPage = () => {
  return (
    <Box>
      <SEO
        title="AI Resume Optimizer"
        description="Optimize your resume for job applications using AI"
      />
      <Box>
        <HeroSection />
        <FeaturesSection />
      </Box>
    </Box>
  );
};

const HeroSection: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient height="100%" zIndex="-1" />
      <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="40">
        <Stack direction={{ base: "column", lg: "row" }} alignItems="center">
          <Hero
            id="home"
            justifyContent="flex-start"
            px="0"
            title={
              <FallInPlace>
                Optimize Your Resume
                <br /> With AI
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                Our AI-powered tool helps you <br /> create job-winning resumes
                tailored <br /> to specific job descriptions.
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>
              <HStack pt="4" pb="12" spacing="8">
                
              </HStack>
              <ButtonGroup spacing={4} alignItems="center">
                <NextLink href="/signup" passHref>
                  <Button colorScheme="primary" size="lg">
                    Sign Up
                  </Button>
                </NextLink>
                <NextLink href="#features" passHref>
                  <Button
                    size="lg"
                    variant="outline"
                    rightIcon={
                      <Icon
                        as={FiArrowRight}
                        sx={{
                          transitionProperty: "common",
                          transitionDuration: "normal",
                          ".chakra-button:hover &": {
                            transform: "translate(5px)",
                          },
                        }}
                      />
                    }
                  >
                    Learn More
                  </Button>
                </NextLink>
              </ButtonGroup>
            </FallInPlace>
          </Hero>
        </Stack>
      </Container>
    </Box>
  );
};

const FeaturesSection = () => {
  return (
    <Features
      id="features"
      title={
        <Heading
          lineHeight="short"
          fontSize={["2xl", null, "4xl"]}
          textAlign="left"
          as="p"
        >
          Powerful Features
        </Heading>
      }
      description={
        <>
          Our AI Resume Optimizer includes everything you need to create
          job-winning resumes.
          <br />
          Use it to tailor your resume for each job application.
        </>
      }
      align="left"
      columns={[1, 2, 3]}
      iconSize={4}
      features={[
        {
          title: "AI-Powered Optimization",
          icon: FiSmile,
          description:
            "Utilize advanced AI algorithms to optimize your resume for specific job descriptions.",
          variant: "inline",
        },
        {
          title: "Customizable Templates",
          icon: FiSliders,
          description:
            "Choose from a variety of templates and customize them to match your personal style.",
          variant: "inline",
        },
        {
          title: "Real-Time Feedback",
          icon: FiThumbsUp,
          description:
            "Get instant feedback on your resume's effectiveness and areas for improvement.",
          variant: "inline",
        },
        {
          title: "Job Matching",
          icon: FiGrid,
          description:
            "Match your resume with the best job openings based on your skills and experience.",
          variant: "inline",
        },
      ]}
    />
  );
};

export default Home;
