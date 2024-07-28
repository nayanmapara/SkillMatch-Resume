import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Alert, AlertIcon, Heading } from '@chakra-ui/react';
import { Section } from '../components/section'; // Import the Section component

const UploadPage = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleResumeTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (resumeText) {
      // Here you would send jobDescription and resumeText to the backend
      console.log('Job Description:', jobDescription);
      console.log('Resume Text:', resumeText);

      // For now, just log and navigate to a success page or display a success message
      alert('Job Description and Resume Text submitted successfully!');
      router.push('/success'); // Example route, create this page if you want to show a success message
    } else {
      setError('Please enter your resume text.');
    }
  };

  return (
    <Section variant="alternate"> {/* Use the Section component with the alternate variant */}
      <Box p={8} maxWidth="600px" mx="auto" mt={10}>
        <Heading as="h1" fontSize="4xl" mb={4} textAlign="center">Upload Your Resume</Heading> {/* Add a title to the page */}
        <form onSubmit={handleSubmit}>
          <FormControl id="job-description" isRequired mb={4}>
            <FormLabel>Job Description</FormLabel>
            <Textarea
              placeholder="Enter the job description"
              value={jobDescription}
              onChange={handleJobDescriptionChange}
              fontSize="lg" 
            />
          </FormControl>

          <FormControl id="resume-text" isRequired mb={4}>
            <FormLabel>Resume Text</FormLabel>
            <Textarea
              placeholder="Enter your resume text"
              value={resumeText}
              onChange={handleResumeTextChange}
              fontSize="lg"
            />
          </FormControl>

          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Button type="submit" colorScheme="purple" width="full">
            Submit
          </Button>
        </form>
      </Box>
    </Section>
  );
};

export default UploadPage;