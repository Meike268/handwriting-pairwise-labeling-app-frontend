import React from "react";
import Feature from "./Feature";

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
        <h3>Bitte bewerte bei den nun folgenden Wörtern, wie gut beim jeweiligen Wort eine einheitliche Grundlinie eingehalten wurde.</h3>
        <div>Ein Beispiel für eine schlechte Einhaltung der Grundlinie:</div>
        <img src={"/hint_examples/baseline_negative.png"} alt={"Example for bad baseline"} style={{width: "50%", marginTop: "7px"}}/>
    </div>
}

const HintPageHeigth: React.FC = () => {
    return <div>
        <h3>Bitte bewerte nun wie gut beim jeweiligen Wort höhere / tiefere Buchstaben gleich weit von der Grundhöhe abweichen.</h3>
        <div>Zwei Beispiele für eine schlechte Umsetzung einer einheitlichen Höhe:</div>
        <img src={"/hint_examples/height_negative.png"} alt={"Example for bad height"} style={{width: "50%", margin: "7px"}}/>
        <img src={"/hint_examples/height_negative2.jpg"} alt={"Example for bad height"} style={{width: "50%", margin: "7px"}}/>
    </div>
}

const HintPageInclination: React.FC = () => {
    return <div>
        <h3>Bitte bewerte nun wie gut sich beim jeweiligen Wort daran gehalten wurde eine gleich bleibende Neigung
            einzuhalten.</h3>
        <div>Ein Beispiel für eine schlechte Einhaltung der Neigung:</div>
        <img src={"/hint_examples/inclination_negative.png"} alt={"Example for bad inclination"}
             style={{width: "50%", marginTop: "7px"}}/>
    </div>
}

const HintPageNoCorrections: React.FC = () => {
    return <div>
        <h3>Bitte bewerte nun ob beim jeweiligen Wort störende Korrekturen vorgenommen wurden.</h3>
        <div>Ein Beispiel für <em><b>leichte</b></em> Korrekturen:</div>
        <img src={"/hint_examples/corrections_negative1.jpg"} alt={"Example for light corrections"}
             style={{width: "50%", margin: "7px"}}/>
        <div>Ein Beispiel für <em><b>störende</b></em> Korrekturen:</div>
        <img src={"/hint_examples/corrections_negative2.png"} alt={"Example for light corrections"}
             style={{width: "50%", margin: "7px"}}/>
    </div>
}

const HintPageSpacing: React.FC = () => {
    return <div>
        <h3>Bitte bewerte nun die Gleichmässigkeit der Abstände zwischen den Buchstaben.</h3>
        <div>Ein Beispiel für ungleichmässige Abstände:</div>
        <img src={"/hint_examples/spacing_negative.png"} alt={"Example for bad spacing"} style={{width: "50%", marginTop: "7px"}}/>
    </div>
}

const HintPageRoundness: React.FC = () => {
    return <div>
        <h3>Bitte bewerte nun ob die Buchstaben die rund sein sollten, auch rund sind.</h3>
        <div>Ein Beispiel für eine schlechte Einhaltung von Rundungen:</div>
        <img src={"/hint_examples/roundness_negative.png"} alt={"Example for bad baseline"} style={{width: "50%", marginTop: "7px"}}/>
    </div>
}

const HintPageClosedForms: React.FC = () => {
    return <div>
        <h3>Bitte bewerte nun beim jeweiligen Wort, wie gut Buchstaben die geschlossen sein sollten geschlossen wurden.</h3>
        <div>Ein Beispiel für eine <em><b>leichte</b></em> Abweichung einer geschlossenen Form:</div>
        <img src={"/hint_examples/closed_negative2.png"} alt={"Example for light unclosed form"} style={{width: "50%", margin: "7px"}}/>
        <div>Ein Beispiel für eine <em><b>schwere</b></em> Abweichung einer geschlossenen Form:</div>
        <img src={"/hint_examples/closed_negative.png"} alt={"Example for bad unclosed form"} style={{width: "50%", margin: "7px"}}/>
    </div>
}

const HintPageGeneralReadability: React.FC = () => {
    return <div>
        <h3>Bitte bewerte nun die generelle Lesbarkeit des jeweiligen Wortes.</h3>
    </div>
}