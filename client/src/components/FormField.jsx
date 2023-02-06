import React from 'react'

const FormField = ({labelName,type,name,value,placeholder,handleChange,isSurpriseMe,handleSurpriseMe}) => {
  return (
    <div>
      <div className='flex items-center gap-3 mb-2'>
      <label className='text-xl block' htmlFor='name'>{labelName}</label>
      {isSurpriseMe && <button type="button" onClick={handleSurpriseMe} className=' rounded-md bg-white p-2'>Surprise Me</button>}

      </div>
      <input className='w-full p-2 outline-none' type={type} placeholder={placeholder} name={name} value={value} onChange={handleChange} />
    </div>
  )
}

export default FormField;

