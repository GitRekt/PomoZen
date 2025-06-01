
import React, { useEffect } from "react";
import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TimerDisplay from "./timerdisplay";
import ControlButtons from "./controlbuttons";

const Pomodoro = () => {
    const [isBreak, setIsBreak] = React.useState(false);
    const theme = isBreak ? "break" : "work";

    const WORK_TIME = 25 * 60; // 25 minutes in seconds
    const BREAK_TIME = 5 * 60; // 5 minutes in seconds
    const [timeLeft, setTimeLeft] = React.useState(WORK_TIME); 

    const [isPlaying, setIsPlaying] = React.useState(false);
    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };
    const handleReset = () => {
        setIsPlaying(false);
        setTimeLeft(isBreak ? BREAK_TIME : WORK_TIME);
    }
    const handleSkip = () => {
        setIsPlaying(false);
        setTimeLeft(isBreak ? WORK_TIME : BREAK_TIME);
        setIsBreak(!isBreak);
    };

    const playNotification = (isBreak) => {
        const audio = new Audio(isBreak ? "here-we-go-again.mp3" : "wow.mp3");
        audio.play().catch((error) => {
            console.error("Error playing notification sound:", error);
        });
    }

    useEffect(() => {
        let timer;
        if (isPlaying) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setIsBreak(!isBreak);
                        playNotification(isBreak);
                        return isBreak ? WORK_TIME : BREAK_TIME;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isPlaying, isBreak]);

    // Calculate the progress percentage based on the time left
    const calculateProgress = () => {
        const totalTime = isBreak ? BREAK_TIME : WORK_TIME;
        return ((totalTime - timeLeft) / totalTime) * 100;
    }
    
    return (
        <div className={`background background-${theme}`}>
            <div className="pomodoro-container">
                <CircularProgressbarWithChildren 
                value={calculateProgress()}
                styles={buildStyles({
                    pathColor: `var(--${theme}-primary)`,
                    trailColor: "#f5f5f5",
                })} >
                    <h2 className="timer-label">{isBreak?'Break':'Work'} Timer</h2>
                    <TimerDisplay timeLeft={timeLeft} theme={theme} />
                    <ControlButtons 
                    theme={theme}
                    handlePlayPause={handlePlayPause}
                    handleReset={handleReset}
                    handleSkip={handleSkip}
                    isPlaying={isPlaying}
                    />
                </CircularProgressbarWithChildren>
            </div>
        </div>
    );
};

export default Pomodoro;