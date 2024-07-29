import React from "react";
import {ExamplePair, Question, ReferenceSentence, Sample, Score} from "../entities/Batch";
import QuestionDescription from "./QuestionDescription";
import ScoreDescriptor from "./ScoreDescriptor";

const Task: React.FC<{
    question: Question,
    referenceSentence: ReferenceSentence,
    examplePair: ExamplePair,
    sample: Sample | null,
    onSubmit: (score: Score | null) => void
}> = ({
          question, referenceSentence, examplePair, sample, onSubmit = () => {
    }
      }) => {
    return <div style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }}>
        <div style={{marginTop: "5%"}}>{<QuestionDescription question={question}/>}</div>
        {sample && <img src={sample.image.src} alt={"sample"}/>}
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            height: "15%"
        }}>
            <img src={examplePair.positive.src} alt={"positive_example"} style={{width: "35%", objectFit: "contain"}}/>
            {sample ? <div style={{
                width: "30%",
                display: "flex",
                justifyContent: "space-around"
            }}>
                {[...Array(5)].map((_, score) => {
                    return <button
                        className={"score-button"}
                        key={`${sample.id}_${score}`}  // extra key per sample to remove hasactive-css-class between samples
                        onClick={() => onSubmit(score as Score)}
                        style={{
                            width: "19%",
                            backgroundColor: sample.score === score ? "green" : undefined,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}>
                        <div style={{color: "lightgreen"}}><b>{score}</b></div>
                        <ScoreDescriptor score={score} question={question}/>
                    </button>
                })}
            </div> : <button style={{width: "100%", margin: "10px"}} onClick={() => onSubmit(null)}>Start</button>}
            <img src={examplePair.negative.src} alt={"negative_example"}
                 style={{width: "35%", objectFit: "contain"}}/>
        </div>
    </div>
}

export default Task