import React from 'react'
import { BeatLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center bg-neutral-800'>
        <BeatLoader
        color='#22c55e'
        size={10}
       />
    </div>
    
  )
}
    
export default Loading