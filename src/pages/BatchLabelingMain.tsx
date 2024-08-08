import React, {useContext} from "react";
import {post, put} from "../authentication/io";
import {
    APP_BATCH_LABELING_SAMPLE,
    BACKEND_ANSWER,
    APP_BATCH_LABELING_END
} from "../constants/Urls";
import { useNavigate, useParams} from "react-router-dom";
import {BatchContext} from "../util/BatchProvider";
import {Sample, Score, TaskBatch} from "../entities/Batch";
import BatchLabelingWrapper from "../components/BatchLabelingWrapper";
import QuestionDescription from "../components/QuestionDescription";
import {Image} from "../components/Image";
import ScoreDescriptor from "../components/ScoreDescriptor";


export function getHeader(questionId: number): string {
    switch (questionId) {
        case 1:
            return "Leserlichkeit";
        case 2:
            return "Neigung";
        case 3:
            return "Buchstabenform 'r', 'n' und 'h'";
        case 4:
            return "Buchstabenform 'a' und 'd'";
        case 5:
            return "Buchstabenform 'e' und 'l'";
        default:
            return "Schrift bewerten"
    }
}

const BatchLabelingMain: React.FC = () => {
    const {sampleIndex} = useParams()
    const sampleInd = +sampleIndex!
    const navigate = useNavigate()
    const [maybeBatch, setBatch] = useContext(BatchContext)!
    const batch: TaskBatch = maybeBatch!

    const currentSample = sampleInd === 0 ? null : batch.samples[sampleInd-1]

    async function updateScore(score: Score, sample: Sample) {
        const exists = sample.score !== undefined

        sample.score = score
        setBatch(batch)

        const answer = {
            sampleId: sample.id,
            questionId: batch.question.id,
            score: score,
            submissionTimestamp: Date.now().valueOf()
        }

        try {
            let res
            if (exists)
                res = await put(BACKEND_ANSWER, answer)
            else
                res = await post(BACKEND_ANSWER, answer)
            console.info(`Successfully sent answer ${JSON.stringify(res)}`)
            return res
        } catch (error) {
            console.warn("Something went wrong while sending new score to backend.")
            console.error(error)
        }
    }

    function onSubmit(score: Score | null) {
        if (score !== null)
            updateScore(score, currentSample!).then()
        nextPage()
    }

    function nextPage() {
        if (sampleInd < batch.samples.length)
            navigate(APP_BATCH_LABELING_SAMPLE(sampleInd+1))
        else {
            navigate(APP_BATCH_LABELING_END)
        }
    }

    function prevPage() {
        navigate(APP_BATCH_LABELING_SAMPLE(sampleInd-1))
    }

    return <BatchLabelingWrapper
        headline={getHeader(batch.question.id)}
        navigatePrevPage={sampleInd <= 0 ? null : () => prevPage()}
        navigateNextPage={currentSample?.score === undefined ? null : () => nextPage()}
        progress={{current: currentSample === null ? 0 : sampleInd-1, end: batch.samples.length}}
    >
        <QuestionDescription question={batch.question}/>
        {currentSample === null && <Image style={{margin: "10px", maxWidth: "1024px"}} src={batch.example.image} alt={"sample"}/>}
        {currentSample && <Image style={{margin: "10px", maxWidth: "700px"}} src={currentSample.image} alt={"sample"}/>}
        <div className={"AnswerOrStartWrapper"} style={{height: "30%", width: "100%"}}>
            {currentSample === null
                ?
                <button className={"StartButton"} style={{height: "100%", width: "30%", textAlign: "center"}}
                        onClick={() => onSubmit(null)}>Start</button>
                :
                <div className={"AnswerWrapper"} style={{height: "100%", width: "30%", display: "flex", flexDirection: "column", justifyContent: "space-between", margin: "auto"}}>
                    {[...Array(5)].map((_, score) => {
                        return <button
                            className={"score-button"}
                            key={`${currentSample.id}_${score}`}  // extra key per sample to remove hasactive-css-class between samples
                            onClick={() => onSubmit(score as Score)}
                            style={{height: 98/5+"%", backgroundColor: currentSample.score === score ? "green" : undefined, display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "center", padding: "5px"}}
                        >
                            <div style={{color: "lightgreen", marginRight: "10px"}}><b>{score+1}</b></div>
                            <ScoreDescriptor score={score+1} question={batch.question}/>
                        </button>
                    })}
                </div>
            }
        </div>
    </BatchLabelingWrapper>
}

export default BatchLabelingMain;