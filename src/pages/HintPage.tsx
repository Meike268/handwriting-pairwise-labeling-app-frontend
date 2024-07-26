import React, {useContext} from "react";
import Feature from "../util/Feature";
import {CheckRounded, CloseRounded} from "@mui/icons-material";
import {BatchContext} from "../util/BatchProvider";

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
    return <div style={{display: "flex", alignItems: "center", flexDirection: "column", padding: "6%", width: "100%", boxSizing: "border-box" }}>
        {featurePage}
        <button onClick={() => onStart()} style={{padding: "10px 30px", margin:"20px", width: "fit-content"}}>Start</button>
    </div>
}

export default HintPage

const GenericHintPage: React.FC<{headline: string, exampleNegativePath: string, examplePositivePath: string}> = ({headline}) => {
    const [batch, ] = useContext(BatchContext)!

    return <div style={{width: "100%", boxSizing: "border-box"}}>
        <h3>{headline}</h3>
        <div style={{margin: "8px"}}>Beispiele für eine gute/schlechte Umsetzung:</div>
        <div style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "5px auto",
            backgroundColor: "#1a1d22",
            padding: "5px"
        }}>
            <CheckRounded style={{
                fontSize: "8em",
                scale: ".92",
                color: "darkgreen",
                marginLeft: "-6px",
                flexShrink: "0",
                flexGrow: "0",
                flexBasis: "20%"
            }}/>
            <img src={batch!.question.examples?.positive.src} alt={"Positive example"}
                 style={{width: "81%"}}/>
        </div>
        <div style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "5px auto",
            backgroundColor: "#1a1d22",
            padding: "5px"
        }}>
            <CloseRounded style={{
                fontSize: "8em",
                color: "darkred",
                marginLeft: "-6px",
                flexShrink: "0",
                flexGrow: "0",
                flexBasis: "20%"
            }}/>
            <img src={batch!.question.examples?.negative.src} alt={"Negative example"}
                 style={{width: "81%"}}/>
        </div>
    </div>
}

const HintPageBaseline: React.FC = () => {
    return <GenericHintPage
        headline={"Bitte bewerte bei den nun folgenden Wörtern, wie gut beim jeweiligen Wort eine einheitliche Grundlinie eingehalten wurde."}
        exampleNegativePath={"/hint_examples/baseline_negative.png"}
        examplePositivePath={"/hint_examples/baseline_positive.png"}
    />
}

const HintPageHeigth: React.FC = () => {
    return <GenericHintPage
        headline={"Bitte bewerte nun wie gut beim jeweiligen Wort höhere / tiefere Buchstaben gleich weit von der Grundhöhe abweichen."}
        exampleNegativePath={"/hint_examples/height_negative.png"}
        examplePositivePath={"/hint_examples/height_positive.png"}
    />
}

const HintPageInclination: React.FC = () => {
    return <GenericHintPage
        headline={"Bitte bewerte nun wie gut sich beim jeweiligen Wort daran gehalten wurde eine gleich bleibende Neigung einzuhalten."}
        exampleNegativePath={"/hint_examples/inclination_negative.png"}
        examplePositivePath={"/hint_examples/inclination_positive.png"}
    />
}

const HintPageNoCorrections: React.FC = () => {
    return <GenericHintPage
        headline={"Bitte bewerte nun ob beim jeweiligen Wort störende Korrekturen vorgenommen wurden."}
        exampleNegativePath={"/hint_examples/corrections_negative.png"}
        examplePositivePath={"/hint_examples/corrections_positive.png"}
    />
}

const HintPageSpacing: React.FC = () => {
    return <GenericHintPage
        headline={"Bitte bewerte nun die Gleichmässigkeit der Abstände zwischen den Buchstaben."}
        exampleNegativePath={"/hint_examples/spacing_negative.png"}
        examplePositivePath={"/hint_examples/spacing_positive.png"}
    />
}

const HintPageRoundness: React.FC = () => {
    return <GenericHintPage
        headline={"Bitte bewerte nun ob die Buchstaben die rund sein sollten, auch rund sind."}
        exampleNegativePath={"/hint_examples/roundness_negative.png"}
        examplePositivePath={"/hint_examples/roundness_positive.png"}
    />
}

const HintPageClosedForms: React.FC = () => {
    return <GenericHintPage
        headline={"Bitte bewerte nun beim jeweiligen Wort, wie gut Buchstaben die geschlossen sein sollten geschlossen wurden."}
        exampleNegativePath={"/hint_examples/closed_negative.png"}
        examplePositivePath={"/hint_examples/closed_positive.png"}
    />
}

const HintPageGeneralReadability: React.FC = () => {
    return <div>
    <h3>Bitte bewerte nun die generelle Lesbarkeit des jeweiligen Wortes.</h3>
        <div><b>Achtung:</b> es geht hier <b><em>nicht</em></b> um "Schönschrift", sondern darum wie schnell und
            intuitiv das geschriebene Wort wahrgenommen werden kann.
        </div>
    </div>
}