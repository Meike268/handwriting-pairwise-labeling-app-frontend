import React, {useContext} from "react";
import {
    APP_BATCH_LABELING_SAMPLE, APP_BATCH_LABELING_START,
} from "../constants/Urls";
import {BatchContext} from "../util/BatchProvider";
import {TaskBatch} from "../entities/Batch";
import BatchLabelingWrapper from "../components/BatchLabelingWrapper";
import {getHeader} from "./BatchLabelingMain";
import {useNavigate} from "react-router-dom";

const BatchLabelingMain: React.FC = () => {
    const [maybeBatch] = useContext(BatchContext)!
    const batch: TaskBatch = maybeBatch!
    const navigate = useNavigate()

    return <BatchLabelingWrapper
        headline={getHeader(batch.question.id)}
        navigatePrevPage={() => navigate(APP_BATCH_LABELING_SAMPLE(batch.samples.length))}
        navigateNextPage={null}
        progress={{current: batch.samples.length, end: batch.samples.length}}
    >
        <div className={"basic-long-text-div"}>
            Danke für deine mithilfe. Wir bereiten gleich neue Fragen für dich vor.<br/>
            Bitte achte darauf immer wieder kurze Pausen einzulegen und genug zu trinken, um konzentriert zu
            bleiben.<br/>
            <br/>
            Wir fragen verschiedene Eigenschaften über unsere Schreibproben ab. Unter Umständen wird die nächste
            Fragestellung also eine andere sein.
        </div>
        <div className={"lastElement"} style={{height: "100%", width: "100%"}}>
            <div style={{height: "10%"}}/>
            <button className={"StartButton"} style={{height: "30%", width: "30%", textAlign: "center"}}
                    onClick={() => navigate(APP_BATCH_LABELING_START)}>
                Nächste Frage
            </button>
        </div>

    </BatchLabelingWrapper>
}

export default BatchLabelingMain;