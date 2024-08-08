import React, {ReactNode, useContext} from "react";
import ProgressBar from "./ProgressBar";
import {DisplayContext} from "../util/DisplayContext";

const NAVIGATION_BUTTON_RELATIVE_WIDTH = 15

const BatchLabelingWrapper: React.FC<{children: ReactNode, headline: string, progress: {current: number, end: number}, navigatePrevPage: (() => void) | null, navigateNextPage: (() => void) | null}> = ({children, headline, progress, navigatePrevPage, navigateNextPage}) => {
    const display = useContext(DisplayContext)!

    return <div style={{width: display.width, height: display.height, maxWidth: "1024px"}}>
        <div style={{position: "relative", width: "100%", top: "0", height: "6%", overflow: "hidden", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            { navigatePrevPage === null ? <div style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%"}}/> :
                <button onClick={() => navigatePrevPage()} style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%", height: "100%", color: "lightgreen", fontWeight: "bolder", cursor: "pointer"}}>
                    zurück
                </button>
            }
            <h1 style={{maxWidth: (100-NAVIGATION_BUTTON_RELATIVE_WIDTH*2) + "%", whiteSpace: "nowrap"}}>
                {headline}
            </h1>
            { navigateNextPage === null ? <div style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%"}}/> :
                <button onClick={() => navigateNextPage()} style={{width: NAVIGATION_BUTTON_RELATIVE_WIDTH + "%", height: "100%", color: "lightgreen", fontWeight: "bolder", cursor: "pointer"}}>
                    weiter
                </button>
            }
        </div>
        <ProgressBar style={{height: "1.5%", marginBottom: "2%"}} current={progress.current} end={progress.end}/>
        <div style={{height: "90.5%", width: "100%"}}>
            <div style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
                {children}
            </div>
        </div>
    </div>
}

        export default BatchLabelingWrapper