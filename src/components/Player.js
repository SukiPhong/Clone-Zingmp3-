import React from 'react'

const Player = () => {
  return (
    <div className='flex bg-main-400 px-5 h-full'>
      <div
        className='w-1/3 flex-auto border border-red-500 flex  items-center '>1</div>
      <div
        className='w-2/5 flex-auto border border-red-500 flex  items-center '>2</div>
      <div
        className='w-1/3 flex-auto border border-red-500 flex  items-center '>3</div>
    </div>
  )
}

export default Player