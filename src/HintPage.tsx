import React from "react";
import Feature from "./Feature";

const HintPage: React.FC<{feature: Feature, onStart: () => void}> = ({feature, onStart}) => {
    function getFeaturePage(feat: Feature = feature) {
        switch (feat) {
            case Feature.CLOSED_FORMS:
                return <HelpPageClosedForms/>
            case Feature.BASELINE:
                return <HelpPageBaseline/>
            case Feature.GENERAL_READABILITY:
                return <HelpPageGeneralReadability/>
            case Feature.SPACING:
                return <HelpPageSpacing/>
            case Feature.NO_CORRECTIONS:
                return <HelpPageNoCorrections/>
            case Feature.ROUNDNESS:
                return <HelpPageRoundness/>
            case Feature.HEIGHT:
                return <HelpPageHeigth/>
            case Feature.INCLINATION:
                return <HelpPageInclination/>
        }
    }

    let featurePage = getFeaturePage()
    return <div style={{width: "100%", display: "flex", alignItems: "center", flexDirection: "column"}}>
        {featurePage}
        <button onClick={() => onStart()} style={{padding: "10px 30px", margin:"20px", width: "fit-content"}}>Start</button>
    </div>
}

export default HintPage

const HelpPageBaseline: React.FC = () => {
    return <div>
        Bitte bewerte bei den nun folgenden Wörtern, wie gut sich beim jeweiligen Wort daran gehalten wurde, eine einheitliche Grundlinie einzuhalten.
    </div>
}

const HelpPageClosedForms: React.FC = () => {
    return <div>
        Bitte bewerte nun beim jeweiligen Wort, wie gut Buchstaben die geschlossen sein sollten geschlossen wurden.
    </div>
}
const HelpPageGeneralReadability: React.FC = () => {
    return <div>
        Bitte bewerte nun die generelle Lesbarkeit des Wortes.
    </div>
}
const HelpPageSpacing: React.FC = () => {
    return <div>
        Bitte bewerte nun die Gleichmässigkeit der Abstände zwischen den Buchstaben .
    </div>
}
const HelpPageNoCorrections: React.FC = () => {
    return <div>
        Bitte bewerte nun ob beim jeweiligen Wort störende Korrekturen vorgenommen wurden.
    </div>
}
const HelpPageRoundness: React.FC = () => {
    return <div>
        Bitte bewerte nun ob die Buchstaben die rund sein sollten, auch rund sind.
    </div>
}
const HelpPageHeigth: React.FC = () => {
    return <div>
        Bitte bewerte nun wie gut beim jeweiligen Wort höhere / tiefere Buchstaben gleich weit von der Grundhöhe abweichen.
    </div>
}
const HelpPageInclination: React.FC = () => {
    return <div>
        Bitte bewerte nun wie gut sich beim jeweiligen Wort daran gehalten wurde eine gleich bleibende Neigung einzuhalten.
    </div>
}