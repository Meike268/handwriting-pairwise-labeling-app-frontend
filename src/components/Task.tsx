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
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
        }}>
            <div style={{marginTop: "5%", margin: "10px"}}>{<QuestionDescription question={question}/>}</div>
        </div>
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
        }}>
            {sample && <Image style={{margin: "10px", maxWidth: "700px"}} src={sample.image} alt={"sample"}/>}
        </div>
        <div style={{
            height: "30%"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                height: "100%",
            }}>
                {sample ? <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    gap: "10px",
                }}>
                    {[...Array(5)].map((_, score) => {
                        return <button
                            className={"score-button"}
                            key={`${sample.id}_${score}`}  // extra key per sample to remove hasactive-css-class between samples
                            onClick={() => onSubmit(score as Score)}
                            style={{
                                backgroundColor: sample.score === score ? "green" : undefined,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                gap: "10px",
                                padding: "5px",
                            }}>
                            <div style={{color: "lightgreen"}}><b>{score}</b></div>
                            <ScoreDescriptor score={score} question={question}/>
                        </button>
                    })}
                </div> : <button style={{width: "30%", margin: "10px", textAlign: "center"}}
                                 onClick={() => onSubmit(null)}>Start</button>}
            </div>
        </div>
    </div>
}

export default Task