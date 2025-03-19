import axios from 'axios';

/**
 * Uploads a file to the PHP server and returns the public URL.
 * @param file - The file to upload.
 * @returns The public URL of the uploaded file.
 * @throws Error if the file is a video or if the upload fails.
 */
export async function uploadFileToHstinger(file: File): Promise<string> {
    // Check if the file is a video
    if (file.type.startsWith('video/')) {
        throw new Error('Videos are not supported.');
    }

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);

    try {
        // Send the file to the PHP server
        const response = await axios.post('https://storage.sourcemediaagency.com', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Check if the upload was successful
        if (response.data.status === 'success') {
            return response.data.file_url; // Return the public URL
        } else {
            throw new Error(response.data.message || 'Failed to upload file.');
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            throw new Error(`Upload failed: ${error.message}`);
        } else {
            // Handle other errors
            throw new Error('An unexpected error occurred during upload.');
        }
    }
}

