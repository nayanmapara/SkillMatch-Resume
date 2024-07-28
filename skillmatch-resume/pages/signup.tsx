import { NextPage } from 'next';
import { Box, Center, Stack, Text, Input, Button, FormControl, FormLabel, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from '@saas-ui/react';
import { Auth } from '@saas-ui/auth';
import { BackgroundGradient } from 'components/gradients/background-gradient';
import { Section } from 'components/section';
import siteConfig from 'data/config';
import { PageTransition } from 'components/motion/page-transition';
import { useState } from 'react';

const Signup: NextPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://skill-match-backend.vercel.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section height="100vh" innerWidth="container.sm">
      <BackgroundGradient
        zIndex="-1"
        width="full"
        left="auto"
        right="0"
        borderLeftWidth="1px"
        borderColor="gray.200"
        _dark={{
          borderColor: 'gray.700',
        }}
      />
      <PageTransition height="100%" display="flex" alignItems="center">
        <Center height="100%" flex="1">
          <Box width="full" pt="8" px="3">
            <Stack spacing="4">
              <Text fontSize="3xl" mb="5" color="white" textAlign="center">
                Join the AI Resume Optimization Revolution
              </Text>
              <form onSubmit={handleSubmit}>
                <Stack spacing="4">
                  <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <Button type="submit" colorScheme="purple" isLoading={loading}>
                    Sign Up
                  </Button>
                  <Text color="muted" fontSize="sm" textAlign="center">
                    By signing up you agree to our{' '}
                    <Link href={siteConfig.termsUrl} color="white">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href={siteConfig.privacyUrl} color="white">
                      Privacy Policy
                    </Link>
                  </Text>
                  <Text textAlign="center" mt="4">
                    Already have an account?{' '}
                    <ChakraLink href="/login" color="purple.500">
                      Log in
                    </ChakraLink>
                  </Text>
                </Stack>
                {error && <Text color="red.500" mt="4">{error}</Text>}
                {success && <Text color="green.500" mt="4">{success}</Text>}
              </form>
            </Stack>
          </Box>
        </Center>
      </PageTransition>
    </Section>
  );
};

export default Signup;

export const getStaticProps = () => {
  return {
    props: {
      header: {
        display: 'none',
      },
      footer: {
        borderTopWidth: '1px',
      },
    },
  };
};
