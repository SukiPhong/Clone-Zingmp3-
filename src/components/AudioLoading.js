import { memo } from 'react';
import { Audio } from 'react-loader-spinner';

const AudioLoading = () => {
  return (
    <Audio
      height="30"
      width="30"
      color="white"
      ariaLabel="audio-loading"
      wrapperClass="wrapper-class" // Optional: Only include if you have styling for this class
      visible={true}
    />
  );
};

export default memo(AudioLoading);
