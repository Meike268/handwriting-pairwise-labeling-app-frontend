import React, {useContext} from "react";
import {
    APP_BATCH_LABELING_SAMPLE, APP_BATCH_LABELING_RESET,
} from "../constants/Urls";
import {BatchContext, NextBatchContext, ThemeContext} from "../util/BatchProvider";
import {TaskBatch} from "../entities/Batch";
import BatchLabelingWrapper from "../components/BatchLabelingWrapper";
import {getHeader} from "./BatchLabelingIntro";
import {useNavigate} from "react-router-dom";

const BatchLabelingMain: React.FC = () => {
    const [maybeBatch] = useContext(BatchContext)!
    const themeHighlight = useContext(ThemeContext)
    const batch: TaskBatch = maybeBatch!
    const nextBatch: TaskBatch | null | undefined = useContext(NextBatchContext)
    const navigate = useNavigate()

    console.log(batch.question.id !== nextBatch?.question.id)

    return <BatchLabelingWrapper
        headline={getHeader(batch.question.id)}
        navigatePrevPage={() => navigate(APP_BATCH_LABELING_SAMPLE(batch.samples.length-1))}
        navigateNextPage={null}
        progress={{current: batch.samples.length, end: batch.samples.length}}
    >
        <div className={"basic-long-text-div"}>
            Toll! Du hast uns schon mit <b
            style={{color: themeHighlight.light}}>{batch.userAnswerCounts.submittedAnswersCount + batch.samples.length}</b> Bewertungen
            geholfen.<br/>
            Aktuell suchen wir noch <b
            style={{color: themeHighlight.light}}>{batch.userAnswerCounts.pendingAnswersCount ? batch.userAnswerCounts.pendingAnswersCount - batch.samples.length : ""}</b> weiter
            Bewertungen.<br/>
            <br/>
            Danke für deine mithilfe. Wir bereiten gleich neue Fragen für dich vor.<br/>
            Bitte achte darauf immer wieder kurze Pausen einzulegen und genug zu trinken, um konzentriert zu
            bleiben.<br/>
            <br/>
            Wir fragen verschiedene Eigenschaften über unsere Schreibproben ab. Unter Umständen wird die nächste
            Fragestellung also eine andere sein. Wenn das passiert ändern wir zusätzlich einige Farben auf der Seite,
            damit du es nicht übersiehst.<br/>
            <br/>
            {batch.question.id !== nextBatch?.question.id && <div><b style={{color: "red", fontSize: "3.5vmin"}}>ACHTUNG:</b><br/>Die Fragestellung wird jetzt eine andere sein!</div>}
        </div>
        <div className={"lastElement"} style={{height: "100%", width: "100%"}}>
            <div style={{height: "10%"}}/>
            <button className={"StartButton"} style={{height: "30%", width: "30%", textAlign: "center", color: themeHighlight.light}}
                    onClick={() => navigate(APP_BATCH_LABELING_RESET)}>
                Nächste Frage
            </button>
        </div>

    </BatchLabelingWrapper>
}

export default BatchLabelingMain;