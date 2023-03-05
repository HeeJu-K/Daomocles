import axios from 'axios';

// Define the API endpoint URL
const PINATA_BASE_URL = 'https://api.pinata.cloud';
const PINATA_UPLOAD_ENDPOINT = '/pinning/pinFileToIPFS';

// Define the Pinata API credentials
const PINATA_API_KEY = 'your-api-key';
const PINATA_SECRET_API_KEY = 'your-secret-api-key';

// Define the image file to be uploaded
const imageFile = new File([fileBlob], 'my-image.jpg', { type: 'image/jpeg' });

// Create a new FormData object and append the image file to it
const formData = new FormData();
formData.append('file', imageFile);

// Define the request headers with the API credentials
const headers = {
  'Content-Type': 'multipart/form-data',
  pinata_api_key: PINATA_API_KEY,
  pinata_secret_api_key: PINATA_SECRET_API_KEY,
};

// Make an HTTP POST request to Pinata's API endpoint to upload the image file
axios
  .post(`${PINATA_BASE_URL}${PINATA_UPLOAD_ENDPOINT}`, formData, { headers })
  .then((response) => {
    console.log('Upload success:', response.data);
  })
  .catch((error) => {
    console.error('Upload error:', error);
  });