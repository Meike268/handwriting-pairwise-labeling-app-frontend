import React, {useContext} from "react";
import {post, put} from "../authentication/io";
import {
    APP_BATCH_LABELING_SAMPLE,
    BACKEND_ANSWER,
    APP_BATCH_LABELING_END
} from "../constants/Urls";
import Task from "../components/Task";
import { useNavigate, useParams} from "react-router-dom";
import {BatchContext} from "../util/BatchProvider";
import {Sample, Score, TaskBatch} from "../entities/Batch";
import BatchLabelingWrapper from "../components/BatchLabelingWrapper";


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
        <Task question={batch.question} referenceSentence={batch.referenceSentence} example={batch.example} sample={currentSample} onSubmit={(score) => onSubmit(score)}/>
    </BatchLabelingWrapper>
}

export default BatchLabelingMain;