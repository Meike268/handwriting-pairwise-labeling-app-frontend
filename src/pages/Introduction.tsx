import React from "react";
import {useNavigate} from "react-router-dom";
import {APP_BATCH_LABELING_START} from "../constants/Urls";

const Introduction: React.FC = () => {
    const navigate = useNavigate();

    return <div>
        <div className={"basic-long-text-div"}>
            Hallo, danke fürs Mitmachen.<br/>
            Im folgenden wirst du immer erst eine Erklärungsseite sehen, bevor du auf den darauf folgenden Seiten selber
            Bewertungen abgibts.<br/>
            <br/>
            Die Erklärseite beschreibt auf welchen Gesichtspunkt von Handschrift du achten sollst.
            Danach bewertest du eine Reihe von Fotos von Handschrift in Bezug auf diesen Gesichtspunkt.<br/>
            <br/>
            Auf der Erklärseite zeigen wir dir auserdem bespielhafte Bewertungen solcher Fotos.
        </div>
        <button onClick={() => navigate(APP_BATCH_LABELING_START)}>weiter</button>
    </div>
}

export default Introduction