import {FaPlay, FaPause, FaUndo, FaForward} from 'react-icons/fa';
import React from 'react';

const ControlButtons = ({theme, handlePlayPause, handleReset, handleSkip, isPlaying }) => {
    const buttonClassName = `control-button control-button-${theme}`;
    return (
    <div className="control-buttons">
        <button className={`${buttonClassName} reset-button`} onClick={handleReset}>
            <FaUndo />
        </button>
        <button className= {`${buttonClassName} play-pause-button`} onClick={handlePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className={`${buttonClassName} skip-button`} onClick={handleSkip}>
            <FaForward />
        </button>
    </div>
    );
};

export default ControlButtons;