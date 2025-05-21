import Popup from "./Popup";
import React, {useState} from "react";
import {Sample, TaskBatch} from "../entities/Batch";
import {TextField} from "@mui/material";
import {post} from "../authentication/io";
import {BACKEND_REPORT} from "../constants/Urls";

const ReportPopup: React.FC<{onClose: () => void, batch: TaskBatch, sample1: Sample, sample2: Sample}> = ({onClose, sample1, sample2, batch}) => {
    const [message, setMessage] = useState("")

    function onSubmit() {
        post(BACKEND_REPORT, {
            sampleId1: sample1.id,
            sampleId2: sample2.id,
            questionId: batch.question.id,
            message: message,
            submissionTimestamp: Date.now().valueOf()
        }).then(() => console.info("Successfully sent report"))
        onClose()
    }

    return <Popup onClose={onClose} title={"Problem melden"}>
        <div>Bitte beschreibe das aufgetretene Problem <br/>
        z.B. "Hier steht nicht '{batch.referenceSentence.content}'"
        </div>
        <TextField multiline={true} value={message} onChange={event => setMessage(event.target.value)} sx={{backgroundColor: "white", width: "100%"}}/>
        <button onClick={() => onSubmit()}>Nachricht senden</button>
    </Popup>
}

export default ReportPopup;