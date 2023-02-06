import React from 'react'
import {download} from '../assets'
import { downloadImage } from '../utils'

const Card = ({_id,photo,prompt,name}) => {
  return (
    <div className='h-[300px] relative group rounded-xl p-2 bg-white hover:md'>
      <img className='h-full w-full object-cover' src={photo} alt={prompt} />
      <div className='hidden group-hover:block p-2  bg-[rgba(0,0,0,0.9)] absolute bottom-0 left-0 right-0 rounded-nd text-white '>
        <p>{prompt}</p>
        <div className='flex justify-between'>
      <div className='flex items-center gap-2'>
        <div className='w-7 h-7 flex justify-center items-center bg-green-700 text-center rounded-full'>
          {name[0]}
        </div>
        <span className='text-white'>{name}</span>
      </div>
      <button type='button' onClick={()=>downloadImage(photo,_id)} className='invert'>
        <img className='w-7 h-7' src={download} alt="" />
      </button>
        </div>
      </div>
    </div>
  )
}

export default Card