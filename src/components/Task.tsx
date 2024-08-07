import React from "react";
import {ExamplePair, Question, ReferenceSentence, Sample, Score} from "../entities/Batch";
import QuestionDescription from "./QuestionDescription";
import ScoreDescriptor from "./ScoreDescriptor";
import {Image} from "./Image";

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

        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
        }}>
            <div style={{marginTop: "5%"}}>{<QuestionDescription question={question}/>}</div>
        </div>

        {sample && <Image src={sample.image} alt={"sample"}/>}

        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            height: "20%",
            marginBottom: "5%"
        }}>
            {sample ? <div style={{
                maxWidth: "70%",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>
                {[...Array(5)].map((_, scoreButtonIndex) => {
                    let score = scoreButtonIndex + 1
                    return <button
                        className={"score-button"}
                        key={`${sample.id}_${score}`}  // extra key per sample to remove hasactive-css-class between samples
                        onClick={() => onSubmit(score as Score)}
                        style={{
                            width: "100%",
                            backgroundColor: sample.score === score ? "green" : undefined,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            padding: "10px"
                        }}>
                        <div style={{color: "lightgreen"}}><b>{score}</b></div>
                        <ScoreDescriptor score={score} question={question}/>
                    </button>
                })}
            </div> : <button style={{width: "30%", margin: "10px"}} onClick={() => onSubmit(null)}>Start</button>}
        </div>
    </div>
}

export default Task