import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ totalTime }) => {
    const [remainingTime, setRemainingTime] = useState(totalTime);

    useEffect(() => {
        //to stop timer on zero values if condition is put
        if (totalTime > -1) {
            const interval = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1000);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [totalTime]);

    // Calculate the days, hours, minutes, and seconds from remainingTime
    const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
    //const seconds = remainingTime % 60;
    const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

    return (
        <div className="ml-auto">
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">{days}</span>
                    days
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">{hours}</span>
                    hours
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">{minutes}</span>
                    min
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">{seconds}</span>
                    sec
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
