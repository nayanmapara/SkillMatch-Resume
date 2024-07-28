import { Center, Stack, Text, Input, Button, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { Link } from '@saas-ui/react';
import { BackgroundGradient } from 'components/gradients/background-gradient';
import { PageTransition } from 'components/motion/page-transition';
import { Section } from 'components/section';
import { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const providers = {
  google: {
    name: 'Google',
    icon: FaGoogle,
  },
  github: {
    name: 'Github',
    icon: FaGithub,
    variant: 'solid',
  },
};

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const toast = useToast();
  const router = useRouter(); // Add this line

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://skill-match-backend.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        toast({
          title: "Login Successful",
          description: "You have successfully logged in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push('/upload'); // Redirect to /upload on success
      } else {
        setError(data.error);
        toast({
          title: "Login Failed",
          description: data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      setError('Network error. Please try again.');
      toast({
        title: "Network Error",
        description: "There was an error with the network. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section height="calc(100vh - 200px)" innerWidth="container.sm">
      <BackgroundGradient zIndex="-1" />

      <Center height="100%" pt="20">
        <PageTransition width="100%">
          <Stack spacing="4" maxWidth="lg" margin="auto">
            <Stack spacing="4">
              <Text fontSize="3xl" mb="5" color="white" textAlign="center">
                Log In to Your Account
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
                    Log In
                  </Button>
                </Stack>
                {error && <Text color="red.500" mt="4">{error}</Text>}
                {success && <Text color="green.500" mt="4">{success}</Text>}
              </form>
              <Text color="muted" fontSize="sm" mt="4" textAlign="center">
                Don’t have an account?{' '}
                <Link href="/signup" color="white">
                  Sign up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </PageTransition>
      </Center>
    </Section>
  );
};

export default Login;
