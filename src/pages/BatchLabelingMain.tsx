import React, {useContext} from "react";
import {DisplayContext} from "../util/DisplayContext";
import {post, put} from "../authentication/io";
import {APP_BATCH_LABELING_SAMPLE, APP_BATCH_LABELING_PATH, BACKEND_ANSWER} from "../constants/Urls";
import Task from "../components/Task";
import { useNavigate, useParams} from "react-router-dom";
import {BatchContext} from "../util/BatchProvider";
import {Sample, Score, TaskBatch} from "../entities/Batch";
import ProgressBar from "../components/ProgressBar";

const NAVIGATION_BUTTON_RELATIVE_WIDTH = 15

const BatchLabelingMain: React.FC = () => {
    const {sampleIndex} = useParams()
    const sampleInd = +sampleIndex!
    const display = useContext(DisplayContext)!
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
            setBatch(undefined)
            navigate(APP_BATCH_LABELING_PATH + "/")
        }
    }

    function prevPage() {
        navigate(APP_BATCH_LABELING_SAMPLE(sampleInd-1))
    }


    return <div style={{width: display.width, height: display.height, maxWidth: "1024px"}}>
        <div style={{position: "relative", width: "100%", top: "0", height: "6%", overflow: "hidden", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            { sampleInd <= 0 ? <div style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%"}}/> :
                <button onClick={() => prevPage()} style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%", height: "100%", color: "lightgreen", fontWeight: "bolder", cursor: "pointer"}}>zurück</button>
            }
            <h1 style={{height: "min-content", maxWidth: (100-NAVIGATION_BUTTON_RELATIVE_WIDTH*2) + "%"}}>{batch.question.description}</h1>
            { currentSample?.score === undefined ? <div style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%"}}/> :
                <button onClick={() => nextPage()} style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%", height: "100%", color: "lightgreen", fontWeight: "bolder", cursor: "pointer"}}>weiter</button>
            }
        </div>
        <ProgressBar style={{height: "1.5%"}} current={currentSample === null ? 0 : sampleInd-1} end={batch.samples.length}/>
        <div style={{height: "92.5%", width: "100%", display:"flex", justifyItems: "center", alignItems: "center"}}>
            <Task question={batch.question} referenceSentence={batch.referenceSentence} examplePair={batch.examplePair} sample={currentSample} onSubmit={(score) => onSubmit(score)}/>
        </div>
    </div>
}

export default BatchLabelingMain;