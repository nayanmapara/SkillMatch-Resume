import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Alert, AlertIcon } from '@chakra-ui/react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

const UploadPage = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file.');
        return;
      }
      setResumeFile(file);
      setError(''); // Clear error if file is valid
    }
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let text = '';

      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const content = await page.getTextContent();
        const pageText = content.items.map((item: any) => item.str).join(' ');
        text += pageText + '\n';
      }

      return text;
    } catch (error) {
      setError('Error extracting text from PDF.');
      return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (resumeFile) {
      const resumeText = await extractTextFromPDF(resumeFile);

      // Here you would send jobDescription and resumeText to the backend
      console.log('Job Description:', jobDescription);
      console.log('Resume Text:', resumeText);

      // For now, just log and navigate to a success page or display a success message
      alert('Job Description and Resume Text extracted successfully!');
      router.push('/success'); // Example route, create this page if you want to show a success message
    } else {
      setError('Please upload a resume file.');
    }
  };

  return (
    <Box p={8} maxWidth="600px" mx="auto" mt={10}>
      <form onSubmit={handleSubmit}>
        <FormControl id="job-description" isRequired mb={4}>
          <FormLabel>Job Description</FormLabel>
          <Textarea
            placeholder="Enter the job description"
            value={jobDescription}
            onChange={handleJobDescriptionChange}
          />
        </FormControl>

        <FormControl id="resume" isRequired mb={4}>
          <FormLabel>Upload Resume (PDF)</FormLabel>
          <Input type="file" accept="application/pdf" onChange={handleFileChange} />
        </FormControl>

        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}

        <Button type="submit" colorScheme="blue" width="full">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default UploadPage;