import "./QuestionPage.css"
import React from "react";
import {ExamplePair, Question, ReferenceSentence, Sample, Score} from "../entities/Batch";

const TaskPage: React.FC<{question: Question, referenceSentence: ReferenceSentence, examplePair: ExamplePair, sample: Sample, onSubmit: (score: Score)=>void}> = ({question, referenceSentence, examplePair, sample,  onSubmit=()=>{}}) => {
    return <div style={{height: "100%", width: "100%"}}>
        Question: {JSON.stringify(question)}<br/>
        Sentence: {JSON.stringify(referenceSentence)}<br/>
        <img src={sample.image.src} alt={"sample"}/>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <img src={examplePair.positive.src} alt={"positive_example"}/>
            <button onClick={() => onSubmit(0)}>0</button>
            <button onClick={() => onSubmit(1)}>1</button>
            <button onClick={() => onSubmit(2)}>2</button>
            <button onClick={() => onSubmit(3)}>3</button>
            <button onClick={() => onSubmit(4)}>4</button>
            <img src={examplePair.negative.src} alt={"negative_example"}/>
        </div>


    </div>
}

export default TaskPage