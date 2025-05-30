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

    const currentSample = batch.samples[sampleInd] // get current sample pair
    const currentSample1 = currentSample[0] // get sample 1
    const currentSample2 = currentSample[1] // get sample 2
    console.log("currentSample", currentSample)
    console.log("currentSample1", currentSample1)
    console.log("currentSample2", currentSample2)


    async function updateScore(score: Score, sample1: Sample, sample2: Sample) {
        // Check if either sample has already been scored in this pair
        //const exists = sample1.score !== undefined && sample2.score !== undefined;

        console.log("currentSample1.score", sample1.score)
        console.log("currentSample2.score", sample2.score)

        // Store the result locally (optional, helps with rendering or state updates)
        sample1.score = score === 1 ? 1 : 0;   // sample1 won → 1, else 0
        sample2.score = score === -1 ? 1 : 0;  // sample2 won → 1, else 0

        setBatch(batch)

        const answer = {
            sampleId1: currentSample1.id,
            sampleId2: currentSample2.id,
            questionId: batch.question.id,
            score: score, // +1 if sample1 won, -1 if sample2 won
            submissionTimestamp: Date.now().valueOf()
        }

        console.log("answer:", answer)

        try {
            let res
            res = await post(BACKEND_ANSWER, answer)
            console.info(`Successfully sent answer ${JSON.stringify(res)}`)
            return res
        } catch (error) {
            console.warn("Something went wrong while sending new score to backend.")
            console.error(error)
        }
    }

    function onSubmit(score: Score) {
        updateScore(score, currentSample1, currentSample2).then()
        nextPage()
    }


    function nextPage() {
        navigate(sampleInd < batch.samples.length - 1 ? APP_BATCH_LABELING_SAMPLE(sampleInd + 1) : APP_BATCH_LABELING_END)
    }

    //function prevPage() {
    //    navigate(sampleInd > 0 ? APP_BATCH_LABELING_SAMPLE(sampleInd - 1) : APP_BATCH_LABELING_INTRO)
    //}

    return <BatchLabelingWrapper
        headline={getHeader(batch.question.id)}
        //navigatePrevPage={() => prevPage()}
        navigateNextPage={
          currentSample1.score === undefined && currentSample2.score === undefined
            ? null
            : () => nextPage()
        }
        progress={{
          current: sampleInd,
          end: batch.samples.length
        }}
    >
        {showExamplePopup && <ExampleImagePopup onClose={() => setShowExamplePopup(false)} batch={batch}/>}
        {showReportPopup &&
            <ReportPopup
                onClose={() => setShowReportPopup(false)}
                batch={batch}
                sample1={currentSample1}
                sample2={currentSample2}
              />}
        <BatchLabelingTaskLayout
            descriptionText={<QuestionDescription question={batch.question}/>}

            image={
              <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
                {/* Image Row */}
                <div style={{ display: "flex", flexDirection: "row", gap: "2%", width: "100%", height: "100%" }}>
                  {[currentSample1, currentSample2].map((sample, idx) => (
                    <div
                      key={sample.id}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      <Image src={sample.image} alt={`sample-${idx + 1}`} />
                    </div>
                  ))}
                </div>

                {/* Shared Buttons Row */}
                <div
                  className={"popups-container"}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: "10px auto 0",
                    width: "100%",
                  }}
                >
                  <div
                    className={"exampleButton"}
                    style={{
                      opacity: "60%",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: "10px",
                    }}
                    onClick={() => setShowExamplePopup(true)}
                  >
                    <ImageSearch sx={{ fontSize: "2vmin" }} />
                    <div style={{ fontSize: "smaller" }}>Beispiele ansehen</div>
                  </div>

                  <div
                    className={"reportButton"}
                    style={{
                      opacity: "60%",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: "10px",
                    }}
                    onClick={() => setShowReportPopup(true)}
                  >
                    <Flag sx={{ fontSize: "2vmin" }} />
                    <div style={{ fontSize: "smaller" }}>Problem melden</div>
                  </div>
                </div>
              </div>
            }


            actions={<>
                <div style={{display: "flex", justifyContent: "center", gap: "2rem"}}>
                    <button
                        className={"score-button"}
                        onClick={() => onSubmit(1)}
                        style={{padding: "1rem", backgroundColor: themeHighlight.main}}
                    >
                        Sample 1 is better
                    </button>
                    <button
                        className={"score-button"}
                        onClick={() => onSubmit(-1)}
                        style={{padding: "1rem", backgroundColor: themeHighlight.main}}
                    >
                        Sample 2 is better
                    </button>
                </div>
            </>
            }/>
    </BatchLabelingWrapper>
}

export default BatchLabelingMain;