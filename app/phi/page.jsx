"use client";
import { useState } from 'react';
import { supabase } from "@/lib/supabase";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError('');  // Reset error when new file is selected
  };

  // Upload image to Supabase
  const uploadImage = async () => {
    if (!file) {
      setError('Please select an image file!');
      return;
    }

    setLoading(true);
    setError('');

    const fileName = `images/${Date.now()}_${file.name}`;

    try {
      // Upload the image to Supabase Storage
      const { data, error } = await supabase.storage
        .from('images') // Replace with your Supabase bucket name
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Supabase error:', error.message);
        throw error;
      }

      // Get the public URL of the uploaded image
      const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.path}`;
      setImageUrl(imageUrl);
      console.log('Image uploaded successfully:', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(`Error uploading image: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-upload-container">
      <h1>Upload Image to Supabase</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImage} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {error && <p className="error">{error}</p>}

      {imageUrl && (
        <div>
          <p>Image uploaded successfully! You can view it below:</p>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '500px', marginTop: '20px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
