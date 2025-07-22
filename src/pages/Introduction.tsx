import React from "react";
import {useNavigate} from "react-router-dom";
import {APP_BATCH_LABELING_RESET} from "../constants/Urls";

const Introduction: React.FC = () => {
    const navigate = useNavigate();

    return <div>
        <div className={"basic-long-text-div"}>
            Hallo!<br/>
            Im Folgenden wirst du erst eine Erklärseite sehen, bevor du auf den darauf folgenden Seiten deine
            Bewertungen abgibst.<br/>
            <br/>
            Die Erklärseite beschreibt genau, auf was du während der Bewertung achten musst.
            Danach bewertest du eine Reihe von Schriftproben in Bezug auf ihre Leserlichkeit. Dir werden immer zwei
            Schriftproben nebeneinander angezeigt. Deine Aufgabe ist, die Probe auszuwählen, die deiner Meinung nach besser
            lesbar ist. <br/>
            <br/>
            Ein Durchlauf besteht immer aus 20 Bildpaaren. Anhand der Forschrittsanzeige
            oben kannst du sehen, wieviele Bewertungen noch in diesem Durchlauf fehlen.
            Bitte bewerte einen Durchgang komplett, ohne dich zwischenzeitlich auszuloggen oder die Seite zu schließen.
            Sobald du mit dem Durchlauf fertig bist kannst du die Seite schließen, die Seite über den
            logout Button unten rechts verlassen oder mit dem nächsten Durchlauf starten.<br/>
            <br/>
            Bitte beachte, dass du deine abgegebene Bewertung nicht nachträglich ändern kannst. Sobald du dich für eine
            Schriftprobe entscheidest, kommst du auf die nächste Seite und kannst
            nicht wieder zurückgehen. Sei dir also sicher, bevor du eine Schriftprobe auswählst.<br/>
            <br/>
            Nach ein paar Bewertungen, wirst du die Sätze schnell auswendig kennen. Versuche die Sätze trotzdem Wort für
            Wort zu lesen, so wie du sie beim ersten Mal durchlesen würdest.<br/>
            Es können Striche aus darüber und darunter liegenden Zeilen ins Bild reichen. Diese sollen die Bewertung nicht beeinflussen.
        </div>
        <button onClick={() => navigate(APP_BATCH_LABELING_RESET)}>weiter</button>
    </div>
}

export default Introduction