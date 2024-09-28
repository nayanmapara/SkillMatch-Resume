import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Alert,
  AlertIcon,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Flex,
  Spinner
} from '@chakra-ui/react';
import { Section } from '../components/section'; // Import the Section component

const UploadPage = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleResumeTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setModalContent('');
    setLoading(true); // Start loading

    if (resumeText && jobDescription) {
      try {
        // Use the backend endpoint
        // https://skill-match-backend.vercel.app/submit_resume
        const response = await fetch('http://127.0.0.1:5000/submit_resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ resume_content: resumeText, job_description: jobDescription }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess('Your resume has been successfully enhanced! Review the enhanced version below.');
          setModalContent(data.enhanced_resume_latex || 'Enhanced resume content is empty.');
          setModalOpen(true); // Open the modal
        } else {
          setError(data.error || 'Submission failed. Please try again.');
        }
      } catch (error) {
        setError('Network error. Please try again.');
        console.error('Error:', error);
      } finally {
        setLoading(false); // End loading
      }
    } else {
      setError('Please enter both resume text and job description.');
      setLoading(false); // End loading
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(modalContent)
      .then(() => {
        alert('Content copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
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

          {success && (
            <Alert status="success" mb={4}>
              <AlertIcon />
              {success}
            </Alert>
          )}

          <Button type="submit" colorScheme="purple" width="full" isDisabled={loading}>
            {loading ? <Spinner size="sm" /> : 'Submit'}
          </Button>
        </form>
      </Box>

      {/* Modal for showing the enhanced resume */}
      <Modal isOpen={modalOpen} onClose={handleCloseModal} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enhanced Resume</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={3}>
              <Button colorScheme="blue" onClick={handleCopyToClipboard} mb={3}>
                Copy to Clipboard
              </Button>
              <Box 
                borderWidth={1} 
                borderRadius="md" 
                padding={4} 
                height="300px" 
                overflowY="auto"
              >
                <Text fontSize="sm">{modalContent}</Text>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Section>
  );
};

export default UploadPage;
