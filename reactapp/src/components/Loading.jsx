import React from 'react';
import '../css/TestButton.css';
import InitialLogo from '../icon/InitialLogo.png';

const Loading = () => {
  return (
    <div className="overlay">
        <div className="center">
            <div className="logo">
                <span className="logoText">
                    <img src={InitialLogo} alt="Logo" />
                </span>
            </div>
        </div>
    </div>
  );
};

export default Loading;
