import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'

const CreatePost = () => {

    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
        blob:''
    })

    const [generatingImg, setGeneratingImg] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (form.prompt && form.photo) {
          setLoading(true);
          try {
            const response = await fetch('https://ai-mern-app.onrender.com/api/v1/posts', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ...form }),
            });
    
            await response.json();
            alert('Success');
            navigate('/');
          } catch (err) {
            alert(err);
          } finally {
            setLoading(false);
          }
        } else {
          alert('Please generate an image with proper details');
        }
      };

    const handleChange = (e) => {
     setForm({
        ...form,
        [e.target.name] : e.target.value
     })
    }

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt)
        setForm({...form, prompt: randomPrompt})
    }

    const generateImage = async () => {
        if (form.prompt) {
            try {

                setGeneratingImg(true)
                const response = await fetch(
                    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
                    {
                        headers: { Authorization: "Bearer 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" },
                        method: "POST",
                        body: JSON.stringify({ "inputs": form.prompt }),
                    }
                );
    
                // Check if the response is OK
                if (!response.ok) {
                    throw new Error('Failed to fetch image');
                }
    
                const blob1 = await response.blob();
    
                // Convert Blob to Base64
                const reader = new FileReader();
                reader.readAsDataURL(blob1);
                reader.onloadend = () => {
                    const base64data = reader.result;
                    
                    // Set the Base64 data as the photo property of the form
                    setForm({ ...form, photo: base64data });
                };
            } catch (error) {
                console.error(error);
                alert('Failed to generate image');
            }finally {
                setGeneratingImg(false); // Set generatingImg to false after API call completes
            }
        } else {
            alert('Please enter a prompt');
        }
        
    };
    

    return (
        <section className='max-w-7xl mx-auto'>
            <div>
                <h1
                    className='font-extrabold text-[#fdfdfd] text-[32px]'
                >Create</h1>
                <p className="mt-2 text-[#666e75] text-[16px] max-w-[1000px]">Create imaginative and visually stunning images through DALL-E AI and share with community
                </p>
            </div>

            <form className='mt-10 max-w-3xl '
                onSubmit={handleSubmit}>
                <div className='flex flex-col gap-5'>
                    <FormField
                        labelName="Your Name"
                        type="text"
                        name="name"
                        placeholder="Ex. Jhon Doe"
                        value={form.name}
                        handleChange={handleChange}
                    />

                    <FormField
                        labelName="Prompt"
                        type="text"
                        name="prompt"
                        placeholder="Ex. an oil pastel drawing of an annoyed cat in a spaceship"
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSurpriseMe}
                    />

                    <div className="relative bg-[#303237] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                        {form.photo ? (
                            <img
                                src={form.photo}
                                alt={form.prompt}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <img
                                src={preview}
                                alt="preview"
                                className="w-9/12 h-9/12 object-contain opacity-[50%]"
                            />
                        )}

                        {generatingImg && (
                            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                                <Loader />
                            </div>
                        )}
                        
                    
                </div>
            </div>

            <div className='mt-5 flex gap-5'>
                <button
                type="button"
                onClick={generateImage}
                className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
                    {generatingImg? "Generating.." : "Generate Image"}
                </button>
            </div>

            <div className='mt-10'>
                <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the Image, if you want you can share with others in community</p>
                <button
                type="submit"
                className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
                    {loading? "sharing": "Share with community"}
                </button>
            </div>
        </form>
        </section >
    )
}

export default CreatePost