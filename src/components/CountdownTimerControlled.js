// Credit: Mateusz Rybczonec

import { useEffect, useState } from "react";
import { colors } from "tailwindcss/defaultTheme";

export default function CountdownTimerController({ children, isPlaying, className, color, progressRatio }) {
    const RADIUS = 40;
    const FULL_DASH_ARRAY = 2 * Math.PI * RADIUS;

    const [circleDashArray, setCircleDashArray] = useState(`${FULL_DASH_ARRAY} ${FULL_DASH_ARRAY}`);


    useEffect(() => {
        let timeFraction = progressRatio;

        setCircleDashArray(`${(
            timeFraction * FULL_DASH_ARRAY
        ).toFixed(0)} ${FULL_DASH_ARRAY}`);

    }, [FULL_DASH_ARRAY, progressRatio]);

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
                        a ${RADIUS},${RADIUS} 0 1,0 ${2 * RADIUS},0
                        a ${RADIUS},${RADIUS} 0 1,0 -${2 * RADIUS},0
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
}