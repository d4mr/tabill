import React, { useCallback, useEffect, useRef, useState } from 'react';
import FullPager from '../../components/FullPager';
// import { useOptions } from '../../providers/options-context';
import { useQuestion } from '../../providers/question-context';

import Fire from '../../assets/images/fire.svg'
import { colors } from "tailwindcss/defaultTheme";
import CountdownTimer from '../../components/CountdownTimerControlled';
import PrimaryButton from '../../components/PrimaryButton';

import PauseMenu from './PauseMenu';
import GameOverMenu from './GameOverMenu';
import { useHistory } from 'react-router-dom';

// import { Redirect } from 'react-router-dom';
// import PrimaryButton from '../../components/PrimaryButton';
// import { useAuth } from '../../providers/auth-context';

// import { useUser } from '../../providers/user-context';
// import Sidebar from './Sidebar/Sidebar';

export default function Game() {
    const history = useHistory();
    const TIME_LIMIT = 2000;
    const hiddenInputField = useRef(null);
    const [answerInput, setAnswerInput] = useState("");

    const [answerStatus, setAnswerStatus] = useState("answering");
    const [gameOverMenuStatus, setGameOverMenuStatus] = useState(false);

    const [streak, setStreak] = useState(0);

    const [startTime, setStartTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);

    const [isPaused, setPaused] = useState(false);
    const [isSeekingUserInteraction, setIsSeekingUserInteraction] = useState(true);
    const { question, nextQuestion } = useQuestion();

    const moveToNextQuestion = useCallback(() => {
        setAnswerStatus("answering");
        setAnswerInput("");
        setStartTime(null);
        nextQuestion();
    }, [nextQuestion]);

    useEffect(() => {
        hiddenInputField && hiddenInputField.current && !gameOverMenuStatus && hiddenInputField.current.focus();
    }, [hiddenInputField, gameOverMenuStatus]);

    useEffect(() => {
        switch (answerStatus) {
            case "correct":
                setIsSeekingUserInteraction(false);
                setStreak(s => s + 1);
                setTimeout(() => { moveToNextQuestion(); setStartTime(Date.now()); }, 300);
                break;
            case "incorrect":
                setIsSeekingUserInteraction(false);
                setTimeout(() => setAnswerStatus("correcting"), 500);
                break;
            case "correcting":
                setTimeout(() => { setGameOverMenuStatus(true); moveToNextQuestion(); }, 700);
                break;
            case "timeout":
                setIsSeekingUserInteraction(false);
                setAnswerStatus("incorrect");
                break;
            default:
                setTimeLeft(TIME_LIMIT);
                setIsSeekingUserInteraction(true);
                break;
        }
    }, [answerStatus, moveToNextQuestion]);

    useEffect(() => {
        if (timeLeft === 0) {
            return;
        } else if (timeLeft < 0) {
            setTimeLeft(0);
            return;
        }

        if (isPaused || !isSeekingUserInteraction || !startTime) return;

        let timer = setTimeout(() => {
            setTimeLeft(TIME_LIMIT - Date.now() + startTime);
        }, 10);

        return () => clearTimeout(timer);
    }, [timeLeft, isPaused, startTime, isSeekingUserInteraction]);

    useEffect(() => {
        if (!isSeekingUserInteraction) return;
        if (timeLeft === 0) {
            setAnswerStatus("timeout");
            return;
        } else {
            if (Number(answerInput) > question[2]) {
                setAnswerStatus("incorrect");
            } else if (Number(answerInput) === question[2]) {
                setAnswerStatus("correct");
            }
        }
    }, [answerInput, isSeekingUserInteraction, question, timeLeft])

    // useEffect(() => {
    //     if (isPaused && timer) {
    //         clearTimeout(timer);
    //         setTimer(null);
    //     } else if (!isPaused && !timer) {
    //         moveToNextQuestion();
    //     }
    // }, [isPaused, moveToNextQuestion, timer]);

    // const user = useUser().user;
    // const auth = useAuth();
    // return !user ? <Redirect to="/auth/" />
    //     : 

    return <>
        <FullPager noScroll flexCol className="bg-doodle-pattern" onKeyDown={e => { e.key === "Escape" && streak===0 && history.push("/")}}>
            <div className={["absolute h-full w-full top-0 left-0 opacity-70 z-10", answerStatus === "correct" ? "bg-green-300" : "", answerStatus === "incorrect" ? "bg-red-300" : "", answerStatus === "correcting" ? "bg-blue-300" : "", answerStatus === "answering" ? "hidden" : ""].join(" ")}></div>
            <div className={["absolute top-0 left-0 bg-white mt-5 ml-5", answerStatus === "answering" ? "z-20" : "z-0", streak !== 0 ? "hidden" : ""].join(" ")}>
                <PrimaryButton onClick={() => { history.push("/") }}>
                <i className="flaticon-exit-hand-drawn-interface-symbol-variant"></i>
                </PrimaryButton>
            </div>
            <PauseMenu isPaused={isPaused} unpauseHandler={() => { setIsSeekingUserInteraction(true); setPaused(false); moveToNextQuestion(); setStartTime(Date.now()) }} />
            <GameOverMenu visible={gameOverMenuStatus} playAgainHandler={() => { setStreak(0); setGameOverMenuStatus(false); }} currentStreak={streak} />
            <div className="z-10 flex-grow flex flex-col justify-center items-center">
                <div>
                    <CountdownTimer
                        className="h-20 w-20 sm:h-36 sm:w-36"
                        progressRatio={timeLeft / TIME_LIMIT}
                        color={colors.green[700]}
                    >
                        <div>
                            <div className="text-3xl text-yellow-600 sm:text-5xl flex mx-auto items-center ">
                                <img src={Fire} alt="Streak" className="h-8 sm:h-12" />
                                {streak}
                            </div>
                        </div>
                    </CountdownTimer>
                </div>
                <div className="text-6xl sm:text-8xl flex mx-auto items-center py-20">
                    <div className="pr-4">{question[0]} x {question[1]} =</div>
                    <div className={["p-5", answerStatus === "correct" ? "text-green-700" : "", answerStatus === "incorrect" ? "text-red-700" : "", answerStatus === "correcting" ? "text-blue-700" : "", answerStatus === "answering" ? "bg-red-100 hand-drawn-border border-4 border-black" : "", !answerInput.trim() ? "w-16 h-24 sm:w-20 sm:h-36" : ""].join(" ")}>
                        {answerStatus === "correcting" ? question[2] : answerInput}
                    </div>
                </div>
            </div>

            <div className="absolute top-0 left-0 w-0 h-1 overflow-hidden" hidden={gameOverMenuStatus}>
                <input type="number" ref={hiddenInputField} className="block m-0 p-0 w-1 outline-none border-none" autoFocus={true} onBlur={({ target }) => target.focus()} value={answerInput} onChange={(e) => isSeekingUserInteraction && setAnswerInput(e.target.value)} />
            </div>

        </FullPager>
    </>
}