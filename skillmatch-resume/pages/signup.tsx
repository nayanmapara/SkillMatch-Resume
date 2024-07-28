import { NextPage } from 'next';
import { Box, Center, Stack, Text } from '@chakra-ui/react';
import { Link } from '@saas-ui/react';
import { Auth } from '@saas-ui/auth';
import { BackgroundGradient } from 'components/gradients/background-gradient';
import { Section } from 'components/section';
import siteConfig from 'data/config';
import { PageTransition } from 'components/motion/page-transition';

const Signup: NextPage = () => {
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
          <Box width="full" pt="8" px="8">
            <Auth
              view="signup"
              title="Join the AI Resume Optimization Revolution"
              loginLink={<Link href="/login">Log in</Link>}
            >
              <Text color="muted" fontSize="sm">
                By signing up you agree to our{' '}
                <Link href={siteConfig.termsUrl} color="white">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href={siteConfig.privacyUrl} color="white">
                  Privacy Policy
                </Link>
              </Text>
            </Auth>
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
