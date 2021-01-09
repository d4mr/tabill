// Credit: Mateusz Rybczonec

import { useCallback, useEffect, useState } from "react";
import { colors } from "tailwindcss/defaultTheme";

export default function CountdownTimer({ width, height, children, isPlaying, className, color }) {
    const RADIUS = 40;
    const FULL_DASH_ARRAY = 2 * Math.PI * RADIUS;
    // const WARNING_THRESHOLD = 1500;
    // const ALERT_THRESHOLD = 800;
    const TIME_LIMIT = 2000;
    const [startTime, setStartTime] = useState(null);
    // const COLOR_CODES = {
    //     info: {
    //         color: "green"
    //     },
    //     warning: {
    //         color: "yellow",
    //         threshold: WARNING_THRESHOLD
    //     },
    //     alert: {
    //         color: "red",
    //         threshold: ALERT_THRESHOLD
    //     }
    // };

    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    // const [remainingTimeColour, setRemainingTimeColour] = useState(COLOR_CODES.info.color);
    const [circleDashArray, setCircleDashArray] = useState(`${FULL_DASH_ARRAY} ${FULL_DASH_ARRAY}`);

    useEffect(() => {
        setStartTime(Date.now());
    }, []);

    useEffect(() => {
        if (timeLeft < 1) {
            // console.log(Date.now() - startTime);
            return;
        }
        if (!isPlaying) return;
        if (!startTime) return;

        let timeInterval = setInterval(() => {
            setTimeLeft(TIME_LIMIT - Date.now() + startTime);
            // console.log({ timeLeft, delta: Date.now() - startTime });
        }, 10);

        return () => clearInterval(timeInterval);
    }, [timeLeft, isPlaying, startTime]);

    useEffect(() => {
        let timeFraction = timeLeft / TIME_LIMIT;
        // let timeFraction = rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);

        setCircleDashArray(`${(
            timeFraction * FULL_DASH_ARRAY
        ).toFixed(0)} ${FULL_DASH_ARRAY}`);

    }, [timeLeft]);

    // useEffect(() => {
    //     const { alert, warning } = COLOR_CODES;
    //     if (timeLeft <= alert.threshold) {
    //         setRemainingTimeColour(alert.color);
    //     } else if (timeLeft <= warning.threshold) {
    //         setRemainingTimeColour(warning.color);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [timeLeft]);

    return (
        <div className={["relative", className].join(" ")} id="base-timer">
            <svg id="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g id="base-timer__circle" style={{ fill: 'none', stroke: 'none' }}>
                    <circle id="base-timer__path-elapsed-outline" style={{ strokeWidth: 11, stroke: 'black' }} cx="50" cy="50" r={RADIUS}></circle>
                    <circle id="base-timer__path-elapsed" style={{ strokeWidth: 7, stroke: colors.gray[300] }} cx="50" cy="50" r={RADIUS}></circle>

                    <path
                        style={{
                            color: color,
                            strokeWidth: "7px",
                            strokeLinecap: "round",
                            transform: "rotate(90deg)",
                            transformOrigin: "center",
                            transition: "0.5s linear color",
                            fillRule: "nonzero",
                            stroke: "currentColor",
                        }}
                        id="base-timer-path-remaining"
                        strokeDasharray={circleDashArray}
                        d={`
                        M 50, 50
                        m -${RADIUS}, 0
                        a ${RADIUS},${RADIUS} 0 1,0 ${2*RADIUS},0
                        a ${RADIUS},${RADIUS} 0 1,0 -${2*RADIUS},0
                        `}
                    ></path>
                </g>
            </svg>
            <div id="timer-contents" style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
            }}>{children}</div>

        </div>
    );


    // function formatTime(time) {
    //     const minutes = Math.floor(time / 60);
    //     let seconds = time % 60;

    //     if (seconds < 10) {
    //         seconds = `0${seconds}`;
    //     }

    //     return `${minutes}:${seconds}`;
    // }


}