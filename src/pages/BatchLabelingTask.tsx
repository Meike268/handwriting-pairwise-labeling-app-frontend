import React, {useContext, useState} from "react";
import {post, put} from "../authentication/io";
import {
    APP_BATCH_LABELING_SAMPLE,
    BACKEND_ANSWER,
    APP_BATCH_LABELING_END, APP_BATCH_LABELING_INTRO
} from "../constants/Urls";
import {useNavigate, useParams} from "react-router-dom";
import {BatchContext} from "../util/BatchProvider";
import {Sample, Score, TaskBatch} from "../entities/Batch";
import BatchLabelingWrapper from "../components/BatchLabelingWrapper";
import QuestionDescription from "../components/QuestionDescription";
import {Image} from "../components/Image";
import ScoreDescriptor from "../components/ScoreDescriptor";
import BatchLabelingTaskLayout from "../components/BatchLabelingTaskLayout";
import {getHeader} from "./BatchLabelingIntro";
import {Flag} from "@mui/icons-material";
import ReportPopup from "../components/ReportPopup";

const BatchLabelingMain: React.FC = () => {
    const {sampleIndex} = useParams()
    const sampleInd = +sampleIndex!
    const navigate = useNavigate()
    const [maybeBatch, setBatch] = useContext(BatchContext)!
    const batch: TaskBatch = maybeBatch!
    const [showReportPopup, setShowReportPopup] = useState<boolean>(false)

    const currentSample = batch.samples[sampleInd]

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

    function onSubmit(score: Score) {
        updateScore(score, currentSample!).then()
        nextPage()
    }

    function nextPage() {
        navigate(sampleInd < batch.samples.length - 1 ? APP_BATCH_LABELING_SAMPLE(sampleInd + 1) : APP_BATCH_LABELING_END)
    }

    function prevPage() {
        navigate(sampleInd > 0 ? APP_BATCH_LABELING_SAMPLE(sampleInd - 1) : APP_BATCH_LABELING_INTRO)
    }

    return <BatchLabelingWrapper
        headline={getHeader(batch.question.id)}
        navigatePrevPage={() => prevPage()}
        navigateNextPage={currentSample?.score === undefined ? null : () => nextPage()}
        progress={{current: sampleInd, end: batch.samples.length}}
    >
        { showReportPopup && <ReportPopup onClose={() => setShowReportPopup(false)} batch={batch} sample={currentSample}/> }
        <BatchLabelingTaskLayout
            descriptionText={<QuestionDescription question={batch.question}/>}
            image={<div style={{display: "flex", flexDirection: "column", height: "100%", width: "100%"}}>
                <Image src={currentSample.image} alt={"sample"}/>
                <div className={"reportButton"} style={{alignSelf: "flex-end", opacity: "50%", display: "flex", alignItems: "center", cursor: "pointer"}} onClick={() => setShowReportPopup(true)}>
                    <Flag sx={{fontSize: "1vh"}}/><div style={{fontSize: "smaller"}}> Problem melden</div>
                </div>
            </div>}
            actions={<>
                {[...Array(5)].map((_, score) => <button
                        className={"score-button"}
                        key={`${currentSample.id}_${score}`}  // extra key per sample to remove hasactive-css-class between samples
                        onClick={() => onSubmit(score as Score)}
                        style={{
                            height: 98 / 5 + "%",
                            backgroundColor: currentSample.score === score ? "green" : undefined,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "left",
                            alignItems: "center",
                            padding: "5px"
                        }}
                    >
                        <div style={{color: "lightgreen", marginRight: "10px"}}><b>{score + 1}</b></div>
                        <ScoreDescriptor score={score + 1} question={batch.question}/>
                    </button>
                )}
            </>
            }/>
    </BatchLabelingWrapper>
}

export default BatchLabelingMain;