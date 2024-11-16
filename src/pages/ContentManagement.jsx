import React, { useState } from 'react';
import axios from 'axios';

const ContentManagement = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contentType, setContentType] = useState('Video'); // Default type
    const [thumbnail, setThumbnail] = useState(null); // For image file
    const [file, setFile] = useState(null); // For main content file
    const [isPremium, setIsPremium] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const handleContentSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission

        // Reset previous messages
        setError('');
        setSuccessMessage('');
        setLoading(true); // Set loading state to true

        // Create a FormData object
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('contentType', contentType);
        formData.append('isPremium', isPremium);

        // Check for image file upload
        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        } else {
            setError('Please upload a thumbnail image.');
            setLoading(false);
            return; // Exit if thumbnail is missing
        }

        // Check for content file upload
        if (file) {
            formData.append('file', file);
        } else {
            setError('Please upload a content file.');
            setLoading(false);
            return; // Exit if file is missing
        }

        try {
            // Get the token from local storage
            const token = localStorage.getItem('token'); 

            // Make the API request
            const response = await axios.post('https://motivata.onrender.com/api/content', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Add the token to the header
                },
            });

            console.log('Content submitted successfully:', response.data);
            setSuccessMessage('Content uploaded successfully!'); // Success message
            resetForm(); // Reset form fields after a successful submission
        } catch (err) {
            console.error('Error submitting content:', err.response ? err.response.data : err.message);
            setError(err.response?.data || 'Failed to submit content. Please try again.'); // General error message
        } finally {
            setLoading(false); // Set loading state back to false
        }
    };

    // Reset the form fields
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setContentType('Video');
        setThumbnail(null);
        setFile(null);
        setIsPremium(false);
    };

    return (
        <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-md bg-gray-50">
            <h2 className="text-xl font-bold text-center mb-4">Create Content</h2>
            <form onSubmit={handleContentSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block font-semibold mb-1">Title:</label>
                    <input 
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        placeholder="Enter the title"
                    />
                </div>
                
                <div>
                    <label htmlFor="description" className="block font-semibold mb-1">Description:</label>
                    <textarea 
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        placeholder="Provide a brief description"
                        rows={4} // More visible space for input
                    />
                </div>
                
                <div>
                    <label htmlFor="contentType" className="block font-semibold mb-1">Content Type:</label>
                    <select 
                        id="contentType"
                        value={contentType}
                        onChange={(e) => setContentType(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        <option value="Video">Video</option>
                        <option value="Podcast">Podcast</option>
                        <option value="Article">Article</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="thumbnail" className="block font-semibold mb-1">Thumbnail:</label>
                    <input 
                        id="thumbnail"
                        type="file"
                        accept="image/*" 
                        onChange={(e) => setThumbnail(e.target.files[0])}
                        required
                        className="block w-full border border-gray-300 rounded-md focus:outline-none"
                    />
                </div>
                
                <div>
                    <label htmlFor="file" className="block font-semibold mb-1">File:</label>
                    <input 
                        id="file"
                        type="file"
                        accept=".mp4, .mkv, .webm, .avi, .mp3, .wav, .pdf, .docx, .xlsx, .pptx"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                        className="block w-full border border-gray-300 rounded-md focus:outline-none"
                    />
                </div>
                
                <div className="flex items-center">
                    <input 
                        type="checkbox"
                        checked={isPremium}
                        onChange={(e) => setIsPremium(e.target.checked)}
                        className="mr-2" 
                    />
                    <label className="font-semibold">Is Premium:</label>
                </div>
                
                {error && <div className="text-red-600 mt-2">{error}</div>}
                {successMessage && <div className="text-green-600 mt-2">{successMessage}</div>}
                
                <button 
                    type="submit" 
                    disabled={loading} // Disable button when loading
                    className={`w-full p-2 text-white rounded-md transition duration-200 ${
                        loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {loading ? 'Submitting...' : 'Submit Content'} 
                </button>
            </form>
        </div>
    );
};

export default ContentManagement;