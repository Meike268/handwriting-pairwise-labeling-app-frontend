import React from "react";
import {TaskBatch} from "../entities/Batch";

import Popup from "./Popup";
import {Image} from "./Image";

const ReportPopup: React.FC<{onClose: () => void, batch: TaskBatch}> = ({onClose, batch}) => {

    return <Popup onClose={onClose} title={"Beispiele"}>
        <Image src={batch.example.image} alt={"example"}/>
        <button onClick={() => onClose()}>Schließen</button>
    </Popup>
}

export default ReportPopup;