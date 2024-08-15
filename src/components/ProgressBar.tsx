import React, {CSSProperties, useContext} from "react";
import {ThemeContext} from "../util/BatchProvider";

const ProgressBar: React.FC<{ current: number, end: number, style: CSSProperties }> = ({current, end, style}) => {
    const themeHighlight = useContext(ThemeContext)

    const progress = current / end

    return <div style={{width: "100%", height: "10px", ...style}}>
        <div style={{width: "100%", height: "40%", display: "flex"}}>
            <div style={{backgroundColor: themeHighlight.main, height: "100%", width: (progress * 100) + "%"}}/>
            <div style={{backgroundColor: "#888", width: ((1 - progress) * 100) + "%"}}/>
        </div>
        <div style={{width: "100%", height: "56%", display: "flex", justifyContent: "space-between"}}>

            <div style={{height: "100%", width: "1px"}}/>
            {[...Array(end-1)].map(() => <div style={{height: "100%", width: "1px", backgroundColor: "white"}}/>)}
            <div style={{height: "100%", width: "1px"}}/>
        </div>
    </div>
}

export default ProgressBar