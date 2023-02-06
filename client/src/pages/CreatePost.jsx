import React,{useState} from 'react'
import {FormField, Loader} from '../components'
import {preview} from "../assets"
import {getRandomPrompt} from '../utils'

import {useNavigate} from 'react-router-dom'

const CreatePost = () => {
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
  const [generatingImg,setGeneratingImg]=useState(false);
  const [form,setForm]=useState({
    name:'',
    prompt:'',
    image:''
  })

  const generateImage=async()=>{
      if(form.prompt) {
          try{
            setGeneratingImg(true);
            const response=await fetch('http://localhost:8080/api/v1/dalles',{
              method:'POST',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({prompt:form.prompt})
            })
            const image=await response.json();
            setForm({...form,image:`data:image/jpeg;base64,${image.photo}`})
          }catch(err) {
           console.log(err);
          }finally {
            setGeneratingImg(false);
          }
      }else{
        alert('Please provide prompt')
      }
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(form.prompt&&form.image) {
        setLoading(true);
      try{
        const response=await fetch('http://localhost:8080/api/v1/posts',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(form)
        }) 
        await response.json();
        navigate('/');
        
      }catch(err) {
        alert(err);
      }finally {
        setLoading(false);
      }
    }else{
      alert('Please provide prompt and generate image')
    }
  }

  const handleChange=e=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handleSurpriseMe=()=>{
    const randomPrompt=getRandomPrompt(form.prompt);
    setForm({...form,prompt:randomPrompt})
  }
  return (
   <section className='max-w-7xl mx-auto'>
    <div>
      <h1 className='font-extrabold text-[32px]'>Create</h1>
      <p className='max-w-[500px] mt-2 text-gray-800'>Browse through our imaginative images that are pretty super and very lovely to see</p>
    </div>
    <form className='mt-16' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-5'>
      <FormField
      labelName="Your Name"
      placeholder="John Doe"
      type="text"
      value={form.name}
      handleChange={handleChange}
      name="name"
      />
      <FormField
      labelName="Prompt"
      placeholder='A plush toy robot sitting against a yellow wall'
      type="text"
      value={form.prompt}
      handleChange={handleChange}
      name="prompt"
      isSurpriseMe
      handleSurpriseMe={handleSurpriseMe}
      />
      <div className='relative w-64 h-64'>
        {form.image ? (
          <img className='object-contain' src={form.image} alt={form.prompt} />
        ):(
          <img className='object-contain opacity-40' src={preview} alt="preview"/>
        )}
        {generatingImg && <div className='absolute top-0 left-0 right-0 bottom-0 m-auto bg-[rgba(0,0,0,0.6)]  flex justify-center items-center'><Loader/></div>}
      </div>
      </div>
      <div className='mt-5'>
         <button type='button' onClick={generateImage} className='w-full bg-green-700 text-white px-4 py-2.5 rounded-md'>{generatingImg?'Generating...':'Generate'}</button>
      </div>
      <div className='mt-10'>
        <p className='text-gray-500 text-small'> *Once you generated your imaginative pic, you can share it with community</p>
        <button className='w-full bg-purple-500 text-white rounded-md px-5 py-2.5 mt-2'>{loading?'Sharing...':'Share with community'}</button>
      </div>
    </form>
   </section>
  )
}

export default CreatePost