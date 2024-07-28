import * as React from 'react';
import {
  Box,
  BoxProps,
  SimpleGrid,
  Container,
  Text,
  Stack,
  Flex,
} from '@chakra-ui/react';

import siteConfig from 'data/config';

export interface FooterProps extends BoxProps {
  columns?: number;
}

export const Footer: React.FC<FooterProps> = (props) => {
  const { columns = 2, ...rest } = props;
  return (
    <Box bg="white" _dark={{ bg: 'gray.900' }} {...rest}>
      <Container maxW="container.2xl" px="8" py="8">
        <SimpleGrid columns={columns}>
          <Stack spacing="8">
            <Stack alignItems="flex-start">
              <Flex>
                <Box fontWeight="bold" fontSize="lg">
                  Skill Match Resume
                </Box>
              </Flex>
              <Text fontSize="md" color="muted">
                
              </Text>
            </Stack>
            <Copyright>
              &copy; {new Date().getFullYear()} Skill Match Resume. All rights
              reserved.
            </Copyright>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export interface CopyrightProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

export const Copyright: React.FC<CopyrightProps> = ({
  title,
  children,
}: CopyrightProps) => {
  let content;
  if (title && !children) {
    content = `&copy; ${new Date().getFullYear()} - ${title}`;
  }
  return (
    <Text color="muted" fontSize="sm">
      {content || children}
    </Text>
  );
};
