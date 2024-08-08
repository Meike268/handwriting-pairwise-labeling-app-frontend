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
        <div className={"AnswerOrStartWrapper"} style={{
            height: "30%"
        }}>
            {sample === null
                ?
                <button className={"StartButton"} style={{height: "100%", width: "30%", textAlign: "center"}}
                                            onClick={() => onSubmit(null)}>Start</button>
                :
                <div className={"AnswerWrapper"} style={{height: "100%", width: "30%", display: "flex", flexDirection: "column", justifyContent: "space-between", margin: "auto"}}>
                    {[...Array(5)].map((_, score) => {
                        return <button
                            className={"score-button"}
                            key={`${sample.id}_${score}`}  // extra key per sample to remove hasactive-css-class between samples
                            onClick={() => onSubmit(score as Score)}
                            style={{
                                height: 98/5+"%",
                                backgroundColor: sample.score === score ? "green" : undefined,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "left",
                                alignItems: "center",
                                padding: "5px",
                            }}>
                            <div style={{color: "lightgreen", marginRight: "10px"}}><b>{score+1}</b></div>
                            <ScoreDescriptor score={score+1} question={question}/>
                        </button>
                    })}
                </div>}
        </div>
    </div>
}

export default Task