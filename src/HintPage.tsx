import React from "react";
import Feature from "./Feature";
import {CheckRounded, CloseRounded} from "@mui/icons-material";

const HintPage: React.FC<{feature: Feature, onStart: () => void}> = ({feature, onStart}) => {
    function getFeaturePage(feat: Feature = feature) {
        switch (feat) {
            case Feature.CLOSED_FORMS:
                return <HintPageClosedForms/>
            case Feature.BASELINE:
                return <HintPageBaseline/>
            case Feature.GENERAL_READABILITY:
                return <HintPageGeneralReadability/>
            case Feature.SPACING:
                return <HintPageSpacing/>
            case Feature.NO_CORRECTIONS:
                return <HintPageNoCorrections/>
            case Feature.ROUNDNESS:
                return <HintPageRoundness/>
            case Feature.HEIGHT:
                return <HintPageHeigth/>
            case Feature.INCLINATION:
                return <HintPageInclination/>
        }
    }

    let featurePage = getFeaturePage()
    return <div style={{width: "100%", display: "flex", alignItems: "center", flexDirection: "column", padding: "6%"}}>
        {featurePage}
        <button onClick={() => onStart()} style={{padding: "10px 30px", margin:"20px", width: "fit-content"}}>Start</button>
    </div>
}

export default HintPage

const HintPageBaseline: React.FC = () => {
    return <div>
        <h3>Bitte bewerte bei den nun folgenden Wörtern, wie gut beim jeweiligen Wort eine einheitliche Grundlinie
            eingehalten wurde.</h3>
        <div style={{margin: "8px"}}>Beispiele für eine gute/schlechte Umsetzung:</div>
        <div style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            margin: "5px auto",
            backgroundColor: "#1a1d22",
            padding: "5px"
        }}>
            <CloseRounded style={{fontSize: "100px", scale: "1", color: "darkred", margin: "0 -10px"}}/>
            <img src={"/hint_examples/baseline_negative.png"} alt={"Example for bad baseline"}
                 style={{width: "75%", alignSelf: "center"}}/>
        </div>
        <div style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            margin: "5px auto",
            backgroundColor: "#1a1d22",
            padding: "5px"
        }}>
            <CheckRounded style={{fontSize: "100px", scale: ".95", color: "darkgreen", margin: "0 -10px"}}/>
            <img src={"/hint_examples/baseline_positive.png"} alt={"Example for good baseline"}
                 style={{width: "75%", alignSelf: "center"}}/>
        </div>

    </div>
}

const HintPageHeigth: React.FC = () => {
    return <div>
        <h3>Bitte bewerte nun wie gut beim jeweiligen Wort höhere / tiefere Buchstaben gleich weit von der Grundhöhe
            abweichen.</h3>
        <div style={{margin: "8px"}}>Beispiele für eine gute/schlechte Umsetzung:</div>
        <div style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            margin: "5px auto",
            backgroundColor: "#1a1d22",
            padding: "5px"
        }}>
            <CloseRounded style={{fontSize: "100px", scale: "1", color: "darkred", margin: "0 -10px"}}/>
            <img src={"/hint_examples/height_negative.png"} alt={"Example for bad baseline"}
                 style={{width: "75%", alignSelf: "center"}}/>
        </div>
        <div style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            margin: "5px auto",
            backgroundColor: "#1a1d22",
            padding: "5px"
        }}>
            <CheckRounded style={{fontSize: "100px", scale: ".95", color: "darkgreen", margin: "0 -10px"}}/>
            <img src={"/hint_examples/height_positive.png"} alt={"Example for good baseline"}
                 style={{width: "75%", alignSelf: "center"}}/>
        </div>
    </div>
}

const HintPageInclination: React.FC = () => {
    return <div>
        <h3>Bitte bewerte nun wie gut sich beim jeweiligen Wort daran gehalten wurde eine gleich bleibende Neigung
            einzuhalten.</h3>
        <div style={{margin: "8px"}}>Beispiele für eine gute/schlechte Umsetzung:</div>
        <div style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            margin: "5px auto",
            backgroundColor: "#1a1d22",
            padding: "5px"
        }}>
            <CloseRounded style={{fontSize: "100px", scale: "1", color: "darkred", margin: "0 -10px"}}/>
            <img src={"/hint_examples/inclination_negative.png"} alt={"Example for bad baseline"}
                 style={{width: "75%", alignSelf: "center"}}/>
        </div>
        <div style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            margin: "5px auto",
            backgroundColor: "#1a1d22",
            padding: "5px"
        }}>
            <CheckRounded style={{fontSize: "100px", scale: ".95", color: "darkgreen", margin: "0 -10px"}}/>
            <img src={"/hint_examples/inclination_positive.png"} alt={"Example for good baseline"}
                 style={{width: "75%", alignSelf: "center"}}/>
        </div>
    </div>
}

const HintPageNoCorrections: React.FC = () => {
    return <div>
        <h3>Bitte bewerte nun ob beim jeweiligen Wort störende Korrekturen vorgenommen wurden.</h3>
        <div style={{margin: "8px"}}>Beispiele für eine gute/schlechte Umsetzung:</div>
        <div style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            margin: "5px auto",
            backgroundColor: "#1a1d22",
            padding: "5px"
        }}>
            <CloseRounded style={{fontSize: "100px", scale: "1", color: "darkred", margin: "0 -10px"}}/>
            <img src={"/hint_examples/corrections_negative.png"} alt={"Example for bad baseline"}
                 style={{width: "75%", alignSelf: "center"}}/>
        </div>
        <div style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            margin: "5px auto",
            backgroundColor: "#1a1d22",
            padding: "5px"
        }}>
            <CheckRounded style={{fontSize: "100px", scale: ".95", color: "darkgreen", margin: "0 -10px"}}/>
            <img src={"/hint_examples/corrections_positive.png"} alt={"Example for good baseline"}
                 style={{width: "75%", alignSelf: "center"}}/>
        </div>
    </div>
}

const HintPageSpacing: React.FC = () => {
    return <div>
        <h3>Bitte bewerte nun die Gleichmässigkeit der Abstände zwischen den Buchstaben.</h3>
        <div style={{margin: "8px"}}>Beispiele für eine gute/schlechte Umsetzung:</div>
        <div style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            margin: "5px auto",
            backgroundColor: "#1a1d22",
            padding: "5px"
        }}>
            <CloseRounded style={{fontSize: "100px", scale: "1", color: "darkred", margin: "0 -10px"}}/>
            <img src={"/hint_examples/spacing_negative.png"} alt={"Example for bad baseline"}
                 style={{width: "75%", alignSelf: "center"}}/>
        </div>
        <div style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            margin: "5px auto",
            backgroundColor: "#1a1d22",
            padding: "5px"
        }}>
            <CheckRounded style={{fontSize: "100px", scale: ".95", color: "darkgreen", margin: "0 -10px"}}/>
            <img src={"/hint_examples/spacing_positive.png"} alt={"Example for good baseline"}
                 style={{width: "75%", alignSelf: "center"}}/>
        </div>
    </div>
}

const HintPageRoundness: React.FC = () => {
    return <div>
        <h3>Bitte bewerte nun ob die Buchstaben die rund sein sollten, auch rund sind.</h3>
        <div style={{margin: "8px"}}>Beispiele für eine gute/schlechte Umsetzung:</div>
        <div style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            margin: "5px auto",
            backgroundColor: "#1a1d22",
            padding: "5px"
        }}>
            <CloseRounded style={{fontSize: "100px", scale: "1", color: "darkred", margin: "0 -10px"}}/>
            <img src={"/hint_examples/roundness_negative.png"} alt={"Example for bad baseline"}
                 style={{width: "75%", alignSelf: "center"}}/>
        </div>
        <div style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            margin: "5px auto",
            backgroundColor: "#1a1d22",
            padding: "5px"
        }}>
            <CheckRounded style={{fontSize: "100px", scale: ".95", color: "darkgreen", margin: "0 -10px"}}/>
            <img src={"/hint_examples/roundness_positive.png"} alt={"Example for good baseline"}
                 style={{width: "75%", alignSelf: "center"}}/>
        </div>
    </div>
}

const HintPageClosedForms: React.FC = () => {
    return <div>
        <h3>Bitte bewerte nun beim jeweiligen Wort, wie gut Buchstaben die geschlossen sein sollten geschlossen
            wurden.</h3>
        <div style={{margin: "8px"}}>Beispiele für eine gute/schlechte Umsetzung:</div>
        <div style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            margin: "5px auto",
            backgroundColor: "#1a1d22",
            padding: "5px"
        }}>
            <CloseRounded style={{fontSize: "100px", scale: "1", color: "darkred", margin: "0 -10px"}}/>
            <img src={"/hint_examples/closed_negative.png"} alt={"Example for bad baseline"}
                 style={{width: "75%", alignSelf: "center"}}/>
        </div>
        <div style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            margin: "5px auto",
            backgroundColor: "#1a1d22",
            padding: "5px"
        }}>
            <CheckRounded style={{fontSize: "100px", scale: ".95", color: "darkgreen", margin: "0 -10px"}}/>
            <img src={"/hint_examples/closed_positive.png"} alt={"Example for good baseline"}
                 style={{width: "75%", alignSelf: "center"}}/>
        </div>
    </div>
}

const HintPageGeneralReadability: React.FC = () => {
    return <div>
    <h3>Bitte bewerte nun die generelle Lesbarkeit des jeweiligen Wortes.</h3>
        <div><b>Achtung:</b> es geht hier <b><em>nicht</em></b> um "Schönschrift", sondern darum wie schnell und
            intuitiv das geschriebene Wort wahrgenommen werden kann.
        </div>
    </div>
}