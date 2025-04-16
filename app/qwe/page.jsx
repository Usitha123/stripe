"use client"
import { useState } from 'react';
import supabase from '@/lib/supabase';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    // Generate a unique file name
    const fileName = `${Date.now()}_${image.name}`;

    const { data, error } = await supabase.storage
      .from('images') // Specify your bucket name
      .upload(fileName, image);

    if (error) {
      console.error('Error uploading image:', error);
      return;
    }

    // Get the public URL of the uploaded image
    const { publicURL, error: urlError } = supabase.storage
      .from('images')
      .getPublicUrl(fileName);

    if (urlError) {
      console.error('Error getting public URL:', urlError);
      return;
    }

    setImageUrl(publicURL); // Set the URL for preview
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={uploadImage}>Upload Image</button>

      {imageUrl && <img src={imageUrl} alt="Uploaded Preview" />}
    </div>
  );
};

export default ImageUpload;
