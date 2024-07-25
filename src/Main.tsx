import React, {useContext} from "react";
import Feature from "./util/Feature";
import HintPage from "./pages/HintPage";
import {DisplayContext} from "./util/DisplayContext";
import {put} from "./authentication/io";
import {APP_BATCH_LABELING, BACKEND_ROOT} from "./constants/Urls";
import TaskPage from "./pages/TaskPage";
import {useNavigate, useParams} from "react-router-dom";
import {BatchContext, Score, TaskBatch} from "./util/BatchProvider";

const NAVIGATION_BUTTON_RELATIVE_WIDTH = 15

const Main: React.FC = () => {
    const {batchPos} = useParams()
    const batchPosition = +batchPos!
    const display = useContext(DisplayContext)!
    const navigate = useNavigate()
    const [maybeBatch, setBatch] = useContext(BatchContext)!
    const batch: TaskBatch = maybeBatch!

    function getCurrentPage() {
        if (batchPosition === 0)
            return <HintPage feature={Feature.BASELINE} onStart={() => nextPage()}/>
        else
            return <TaskPage sample={batch.samples[batchPosition-1]} question={batch.question} onSubmit={(score) => onSubmit(score)}/>
    }

    function onSubmit(score: Score) {
        batch.samples[batchPosition-1].score = score
        setBatch(batch)
        nextPage()
    }

    function nextPage() {
        navigate(APP_BATCH_LABELING(batchPosition+1))
    }

    function prevPage() {
        navigate(APP_BATCH_LABELING(batchPosition-1))
    }


    return <div style={{width: display.width, height: display.height, maxWidth: "1024px"}}>
        <button onClick={() => put(BACKEND_ROOT + "/greeting",{"clause": "oh hi", "name": "mark"}).then(async res => console.log(await res!.text()))}>AAAAAAAAAAAAAAAAAAAAAAAAAAAAA</button>
        <div style={{position: "relative", width: "100%", top: "0", height: "6%", overflow: "hidden", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            { batchPosition <= 0 ? <div style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%"}}/> :
                <button onClick={() => prevPage()} style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%", height: "100%", color: "lightgreen", fontWeight: "bolder", cursor: "pointer"}}>zurück</button>
            }
            <h1 style={{height: "min-content", maxWidth: (100-NAVIGATION_BUTTON_RELATIVE_WIDTH*2) + "%"}}>{batch.question.instruction}</h1>
            { batch.samples[batchPosition+2].score === undefined ? <div style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%"}}/> :
                <button onClick={() => nextPage()} style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%", height: "100%", color: "lightgreen", fontWeight: "bolder", cursor: "pointer"}}>weiter</button>
            }
        </div>
        {/*<ProgressBar style={{height: "1.5%"}} current={page.number} end={8 * (1+wordIds.length)}/>*/}
        <div style={{height: "92.5%", width: "100%", display:"flex", justifyItems: "center", alignItems: "center"}}>{getCurrentPage()}</div>
    </div>
}

export default Main;