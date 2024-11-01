import moment from 'moment'
import React from 'react'
import icons from  '../utils/icons'
import { useDispatch, useSelector } from 'react-redux'
import {AudioLoading} from  '../components'
import * as  actions from '../store/actions'
const {BsFillPlayFill} =icons
const Thumb = (props) => {
  const { thumbnail, title, contentLastUpdate, artistsNames, likes } = props;
  const { isPlaying } = useSelector(state => state.music)
  const dispatch = useDispatch()
  return (
    <div>
      <div className='w-full relative overflow-hidden '>
      <img
        src={thumbnail}
        alt="thumbnail"
        className='w-full object-contain rounded-md shadow-md' 
        
        />
        <div className={`absolute inset-0  text-white flex items-center justify-center ${isPlaying ? '':'hover:bg-overlay-30 '}`}>
          <span className='p-3 border border-white rounded-full'>
          {isPlaying ? <AudioLoading />: <BsFillPlayFill size={30}/>}
          </span>
        </div>
      </div>
      <div className='flex flex-col gap-1 items-center '>
        <h3 className='text-[20px] text-white  font-bold'>  
          {title} </h3>
        <span className='text-gray-500 text-xs'>
          <span >
            Cập nhật:&nbsp;
          </span>
          <span>
            {moment.unix(contentLastUpdate).format("DD/MM/YYYY")}
          </span>
        </span>
        <span className="text-center text-gray-500 gap-2  text-xs flex items-center">
          {artistsNames}
        </span>
        <span className='flex items-center text-gray-500  gap-2 text-xs pb-4'>{`${Math.round(likes / 1000)}K người yêu thích`}</span>
      </div>
    </div>
  )
}
export default Thumb
