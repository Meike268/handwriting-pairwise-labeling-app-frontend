import React, {ReactElement} from "react";

const BatchLabelingTaskLayout: React.FC<{
    descriptionText: ReactElement,
    image: ReactElement,
    actions: ReactElement
}> = ({descriptionText, image, actions}) => {
    return <>
        <div style={{height: "30%"}}>{descriptionText}</div>
        <div style={{height: "30%", width: "100%", display: "flex", justifyContent: "space-around"}}>{image}</div>
        <div className={"ActionWrapper"} style={{height: "30%", width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            {actions}
        </div>
    </>
}

export default BatchLabelingTaskLayout;