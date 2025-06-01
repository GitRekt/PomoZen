import React from "react";

const TimerDisplay = ({ timeLeft, theme }) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className={`timer-display timer-display ${theme}`}>
            {String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}
        </div>
    );
}

export default TimerDisplay;