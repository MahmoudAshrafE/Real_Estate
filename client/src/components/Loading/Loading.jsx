import React from 'react';
import './loading.css'; 
import { PulseLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="loading-page">
      <PulseLoader color="var(--blue)" />
    </div>
  );
};

export default Loading;
