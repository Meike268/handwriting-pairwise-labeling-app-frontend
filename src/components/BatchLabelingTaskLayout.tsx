import React, {ReactElement, useContext} from "react";
import {DisplayContext} from "../util/DisplayContext";

const BatchLabelingTaskLayout: React.FC<{
    descriptionText: ReactElement,
    image: ReactElement,
    actions: ReactElement
}> = ({descriptionText, image, actions}) => {
    const display = useContext(DisplayContext)!
    return <>
        <div style={{height: "30%"}}>{descriptionText}</div>
        <div style={{height: "30%", width: "100%", display: "flex", justifyContent: "space-around"}}>{image}</div>
        <div className={"ActionWrapper"} style={ display.height > 600 ?
            {height: "30%", width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", justifyContent: "space-between"}
            :
            {height: "30%", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}
        >
            {actions}
        </div>
    </>
}

export default BatchLabelingTaskLayout;