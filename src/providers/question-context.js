import React, { useState } from 'react';
import { useOptions } from './options-context';

const QuestionContext = React.createContext();

function QuestionProvider(props) {
    const { maxMultiple, tablesBeingAsked } = useOptions();
    const [question, setQuestion] = useState(generateNewQuestion());

    function generateNewQuestion() {
        let a = tablesBeingAsked[randomIntFromInterval(0, tablesBeingAsked.length - 1)];
        let b = randomIntFromInterval(1, maxMultiple);

        return [a, b, a * b];
    }

    const nextQuestion = () => {
        let newQuestion;
        while (true) {
            newQuestion = generateNewQuestion();
            if (newQuestion[0] !== question[0] || newQuestion[1] !== question[1]) break;
        }
        setQuestion(newQuestion);
    }


    return <QuestionContext.Provider value={{ question, nextQuestion }} {...props} />
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const useQuestion = () => React.useContext(QuestionContext);
export { QuestionProvider, useQuestion }