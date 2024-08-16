import React from "react";
import {useNavigate} from "react-router-dom";
import {APP_BATCH_LABELING_RESET} from "../constants/Urls";

const Introduction: React.FC = () => {
    const navigate = useNavigate();

    return <div>
        <div className={"basic-long-text-div"}>
            Hallo, danke fürs Mitmachen.<br/>
            Im Folgenden wirst du immer erst eine Erklärungsseite sehen, bevor du auf den darauf folgenden Seiten selber
            Bewertungen abgibst.<br/>
            <br/>
            Die Erklärseite beschreibt auf welchen Gesichtspunkt von Handschrift du achten sollst.
            Danach bewertest du eine Reihe von Fotos von Handschrift in Bezug auf diesen Gesichtspunkt.<br/>
            <br/>
            Auf der Erklärseite zeigen wir dir außerdem bespielhafte Bewertungen solcher Fotos.<br/>
            <br/>
            Nach ein paar Bewertungen, wirst du die Sätze schnell auswendig kennen. Versuche die Sätze trotzdem Wort für
            Wort zu lesen, so wie du sie beim ersten Mal durchlesen würdest.<br/>
            Es können Striche aus darüber und darunter liegenden Zeilen ins Bild reichen. Diese sollen die Bewertung nicht beeinflussen.
        </div>
        <button onClick={() => navigate(APP_BATCH_LABELING_RESET)}>weiter</button>
    </div>
}

export default Introduction