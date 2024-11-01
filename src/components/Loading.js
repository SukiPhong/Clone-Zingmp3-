import React from 'react'
import { memo } from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Loading = () => {
  return (
    <RotatingLines
  visible={true}
  height="30"
  width="30"
  color="grey"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  )
}

export default memo(Loading)