import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';
const Quiz = () => {

    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [Lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [Result, setResult] = useState(false);

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let options_arry = [option1, option2, option3, option4];


    const checkans = (e, ans) => {

        if (Lock === false) {
            if (index === data.length - 1) {
                setResult(true);
                return 0;
            }
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);


            }
            else {
                e.target.classList.add("wrong");
                setLock(true);
                options_arry[question.ans - 1].current.classList.add("correct");
            }

        }


    }
    const next = () => {
        if (Lock === true) {
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            options_arry.map((option) => {
                option.current.classList.remove("correct");
                option.current.classList.remove("wrong");
                return null;
            })
        }
    }
    const Reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setLock(false);
        setScore(0);
        setResult(0);
    }
    return (
        <div className='container'>

            <h1>Quiz App</h1>
            <hr />
            {Result ? <></> : <><h2> {index + 1}. {question.question}</h2>
                <ul>
                    <li ref={option1} onClick={(e) => { checkans(e, 1) }}>{question.option1}</li>
                    <li ref={option2} onClick={(e) => { checkans(e, 2) }}>{question.option2}</li>
                    <li ref={option3} onClick={(e) => { checkans(e, 3) }}>{question.option3}</li>
                    <li ref={option4} onClick={(e) => { checkans(e, 4) }}>{question.option4}</li>
                </ul>
                <button onClick={next}>Next</button>
                <div className="index">{index + 1} fo {data.length} questions</div></>}


            {Result ? <><h2>You scored {score} out of {data.length}</h2>
                <button onClick={Reset}>Reset</button>
            </> : <></>}
            {Result ? <><div className="firework"></div>
                <div className="firework"></div>
                <div className="firework"></div>
                <div className="firework"></div>
                <div className="firework"></div>
                <div className="firework"></div>
                <div className="firework"></div>
            </> : <></>}
        </div>

    )
}

export default Quiz