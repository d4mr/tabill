import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";

export default function PauseMenu({ isPaused, unpauseHandler, className, ...props }) {
    const history = useHistory();
    return <div className={["fixed top-0 left-0 z-30 h-full w-full flex", !isPaused ? "hidden" : ""].join(" ")}>
        <div className="p-5 bg-white hand-drawn-border border-black border-4 mx-auto my-auto z-40 flex flex-col items-stretch max-w-md">
            <h3 className="text-5xl font-medium px-5 pb-5 text-center">
                PAUSED
            </h3>
            <p className="text-xl text-center pb-5">
                NOTE: On resuming, the question changes, and the timer resets, but you still keep your streak.
            </p>
            <PrimaryButton focusOnLoad onClick={unpauseHandler} className="my-2 mx-5">
                Resume
            </PrimaryButton>
            <PrimaryButton onClick={() => history.push("/")} className="my-2 mx-5">
                Exit
            </PrimaryButton>
        </div>
        <div className="bg-gray-800 absolute top-0 left-0 h-full w-full opacity-60"></div>
    </div>
}