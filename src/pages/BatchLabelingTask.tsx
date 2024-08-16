import React, {useContext, useState} from "react";
import {post, put} from "../authentication/io";
import {
    APP_BATCH_LABELING_END,
    APP_BATCH_LABELING_INTRO,
    APP_BATCH_LABELING_SAMPLE,
    BACKEND_ANSWER
} from "../constants/Urls";
import {useNavigate, useParams} from "react-router-dom";
import {BatchContext, ThemeContext} from "../util/BatchProvider";
import {Sample, Score, TaskBatch} from "../entities/Batch";
import BatchLabelingWrapper from "../components/BatchLabelingWrapper";
import QuestionDescription from "../components/QuestionDescription";
import {Image} from "../components/Image";
import ScoreDescriptor from "../components/ScoreDescriptor";
import BatchLabelingTaskLayout from "../components/BatchLabelingTaskLayout";
import {getHeader} from "./BatchLabelingIntro";
import {Flag, ImageSearch} from "@mui/icons-material";
import ReportPopup from "../components/ReportPopup";
import ExampleImagePopup from "../components/ExampleImagePopup";
import {DisplayContext} from "../util/DisplayContext";

const BatchLabelingMain: React.FC = () => {
    const {sampleIndex} = useParams()
    const sampleInd = +sampleIndex!
    const navigate = useNavigate()
    const [maybeBatch, setBatch] = useContext(BatchContext)!
    const batch: TaskBatch = maybeBatch!
    const [showReportPopup, setShowReportPopup] = useState<boolean>(false)
    const [showExamplePopup, setShowExamplePopup] = useState<boolean>(false)
    const themeHighlight = useContext(ThemeContext)
    const display = useContext(DisplayContext)!

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
        {showExamplePopup && <ExampleImagePopup onClose={() => setShowExamplePopup(false)} batch={batch}/>}
        {showReportPopup &&
            <ReportPopup onClose={() => setShowReportPopup(false)} batch={batch} sample={currentSample}/>}
        <BatchLabelingTaskLayout
            descriptionText={<QuestionDescription question={batch.question}/>}
            image={<div style={{display: "flex", flexDirection: "column", height: "100%", width: "100%"}}>
                <Image src={currentSample.image} alt={"sample"}/>
                <div className={"popups-container"} style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between"
                }}>
                    <div className={"exampleButton"} style={{
                        alignSelf: "flex-start",
                        opacity: "60%",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "10px"
                    }} onClick={() => setShowExamplePopup(true)}>
                        <ImageSearch sx={{fontSize: "2vh"}}/>
                        <div style={{fontSize: "smaller"}}>Beispiele ansehen</div>
                    </div>
                    <div className={"reportButton"} style={{
                        alignSelf: "flex-end",
                        opacity: "60%",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "10px"
                    }} onClick={() => setShowReportPopup(true)}>
                        <Flag sx={{fontSize: "2vh"}}/>
                        <div style={{fontSize: "smaller"}}> Problem melden</div>
                    </div>
                </div>
            </div>}
            actions={<>
                {[...Array(5)].map((_, score) => <button
                    className={"score-button"}
                    key={`${currentSample.id}_${score}`}  // extra key per sample to remove hasactive-css-class between samples
                    onClick={() => onSubmit(score as Score)}
                    style={display.height > 600 ?
                        {height: 98 / 5 + "%", backgroundColor: currentSample.score === score ? themeHighlight.main : undefined, display: "flex", flexDirection: "row",justifyContent: "left", alignItems: "center", gap: "10px", padding: "5px"}
                        :
                        {height: "100%", width: 99 / 5 + "%", backgroundColor: currentSample.score === score ? themeHighlight.main : undefined, display:"flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", padding: "10px"}
                    }
                    >
                        <div style={{color: themeHighlight.light}}><b>{score + 1}</b></div>
                        <ScoreDescriptor score={score + 1} question={batch.question}/>
                    </button>
                )}
            </>
            }/>
    </BatchLabelingWrapper>
}

export default BatchLabelingMain;