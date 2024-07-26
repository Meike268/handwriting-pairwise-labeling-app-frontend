import "./QuestionPage.css"
import React from "react";
import {Question, Sample, Score} from "../entities/Batch";

const TaskPage: React.FC<{sample: Sample, question: Question, onSubmit: (score: Score)=>void}> = ({sample, question, onSubmit=()=>{}}) => {
    return <div style={{height: "100%", width: "100%"}}>
        Sample: {JSON.stringify(sample)}<br/>
        Question: {JSON.stringify(question)}<br/>
        <button onClick={() => onSubmit(0)}>0</button>
        <button onClick={() => onSubmit(1)}>1</button>
        <button onClick={() => onSubmit(2)}>2</button>
        <button onClick={() => onSubmit(3)}>3</button>
        <button onClick={() => onSubmit(4)}>4</button>

    </div>
}

export default TaskPage