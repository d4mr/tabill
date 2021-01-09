import React, { useEffect, useState } from 'react';
import FullPager from '../../components/FullPager';
// import { useOptions } from '../../providers/options-context';
import { useQuestion } from '../../providers/question-context';

import Fire from '../../assets/images/fire.svg'
import { colors } from "tailwindcss/defaultTheme";
import CountdownTimer from '../../components/CountdownTimer';

// import { Redirect } from 'react-router-dom';
// import PrimaryButton from '../../components/PrimaryButton';
// import { useAuth } from '../../providers/auth-context';

// import { useUser } from '../../providers/user-context';
// import Sidebar from './Sidebar/Sidebar';

export default function Game() {
    const [answerInput, setAnswerInput] = useState("");
    const [answerStatus, setAnswerStatus] = useState("answering");
    const [bg, setBg] = useState("");
    const [answerColor, setAnswerColor] = useState("");
    const [streak, setStreak] = useState(0);
    const [timer, setTimer] = useState();

    // const { maxMultiple, setMaxMultiple, tablesBeingAsked, setTablesBeingAsked } = useOptions();
    const { question, nextQuestion } = useQuestion();

    function showCorrectAnswer() {
        setStreak(0);
        clearTimeout(timer);
        setTimer(null);
        setAnswerStatus("correcting");
        setTimeout(moveToNextQuestion, 700);
    }

    function moveToNextQuestion() {
        clearTimeout(timer);
        setTimer(null);
        setAnswerInput("");
        setAnswerStatus("answering");
        nextQuestion();
    }

    useEffect(() => {
        switch (answerStatus) {
            case "wrong":
                clearTimeout(timer);
                setTimer(null);
                setBg("bg-red-300");
                setAnswerColor("text-red-700");
                setTimeout(() => showCorrectAnswer(), 400);
                break;
            case "correct":
                setStreak(streak + 1);
                clearTimeout(timer);
                setTimer(null);
                setBg("bg-green-300");
                setAnswerColor("text-green-700");
                setTimeout(() => { moveToNextQuestion(); setTimer(setTimeout(showCorrectAnswer, 2000)); }, 400);
                break;
            case "correcting":
                clearTimeout(timer);
                setTimer(null);
                setBg("bg-blue-300");
                setAnswerColor("text-blue-700");
                break;
            default:
                setBg("");
                setAnswerColor("");
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answerStatus]);

    useEffect(() => {
        if (Number(answerInput) > question[2]) {
            setAnswerStatus("wrong");
        } else if (Number(answerInput) === question[2]) {
            setAnswerStatus("correct");
        }
    }, [answerInput, question, timer]);

    // const user = useUser().user;
    // const auth = useAuth();
    // return !user ? <Redirect to="/auth/" />
    //     : 

    return <>
        <FullPager noScroll flexCol className={bg}>
            <div className="flex-grow flex flex-col justify-center items-center">
                <div>
                    <CountdownTimer
                        className="h-20 w-20 sm:h-36 sm:w-36"
                        key={question}
                        isPlaying={timer ? true : false}
                        duration={2}
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
                    <div className={["p-5", answerColor ? answerColor : "bg-red-100", !answerInput.trim() ? "w-16 h-24 sm:w-20 sm:h-36" : ""].join(" ")}>{answerStatus === "correcting" ? question[2] : answerInput}</div>
                </div>
            </div>

            <div className="absolute top-0 left-0 w-0 h-1 overflow-hidden">
                <input type="number" className="block m-0 p-0 w-1 outline-none border-none" autoFocus={true} onBlur={({ target }) => target.focus()} value={answerInput} onChange={(e) => (answerStatus === "answering") && setAnswerInput(e.target.value)} />
            </div>

        </FullPager>
    </>
}