import React, {ReactElement} from "react";
import {Question} from "../entities/Batch";

const QuestionDescription: React.FC<{question: Question}> = ({question}) => {

    const overallLegibilityDescription = <div>
        Bitte lese den unten angezeigten Satz.<br/>
        Bewerte anschließend wie leserlich du die Schrift findest.<br/>
        Achte darauf, ob du den Satz mehrfach lesen musst, oder ob du ihn in einem Schwung lesen kannst.<br/>
        Musst du den Satz oder einzelne Wörter mehrfach lesen, dann ist der Satz weniger leserlich.<br/>
        Vergleiche den Satz mit den angezeigten Beispielen um besser einschätzen zu können welche Bewertung zutreffend
        ist.<br/>
        <br/>
        1 - Die Bewertung 1 bedeutet, dass der Satz sehr leserlich ist. Du konntest ihn schnell und problemlos lesen. Du
        bist nicht in Stocken gekommen.<br/>
        <br/>
        5 - Die Bewertung 5 bedeutet, dass der Satz sehr schwer leserlich ist. Selbst nach mehrfachem lesen ist mindestens ein
        Wort nicht eindeutig zu entziffern.
    </div>

    const letterAlignmentDescription = <div>
        Bitte lese den unten angezeigten Satz.<br/>
        Achte dabei auf die Neigung der Buchstaben.<br/>
        Sind alle Buchstaben in die gleiche Richtung geneigt (nach links oder rechts)?<br/>
        Ist die Neigung bei allen Buchstaben gleich, ahenlich oder unterschiedlich?<br/>
        Vergleiche den Satz mit den angezeigten Beispielen um besser einschätzen zu können welche Bewertung zutreffend ist.<br/>
        <br/>
        1 - All Buchstaben haben nach Augenmaß die gleiche Neigung.<br/>
        <br/>
        5 - Verschiedene Buchstaben sind unterschiedlich ausgerichtet. Die Neigung variiert sichtlich von Buchstabe zu
        Buchstabe.
    </div>

    const letterSizeRNHDescription = <div>
        Bitte lese den unten angezeigten Satz.<br/>
        Achte dabei auf die Buchstaben 'r','n' und 'h'.<br/>
        Sind diese Buchstaben einzeln eindeutig zu erkennen?<br/>
        Oder sieht eines der 'n' eher aus wie ein 'r' oder wie ein 'h', bzw. anders herum.<br/>
        <br/>
        1 - Alle Vorkommen der Buchstaben 'r', 'n' und 'h' sind wohl geformt und eindeutig zu erkennen.
        Der vertikale Strich des ‘n’ ist deutlich kürzer als der des ‘h’, deshalb sind die beiden Buchstaben leicht zu
        unterscheiden.
        Der Strich des 'n' reicht weiter hinunter zur Grundlinie als der des 'r', deshalb sind die beiden Buchstaben leicht zu
        unterscheiden.
        Es bedarf nicht den Kontext im Wort um zu wissen, dass es sich um den jeweiligen Buchstaben handelt.


        5 - Es gibt mindestens ein 'n', das eher wie ein 'r' oder 'h' aussieht, bzw. anders herum.
        Ohne den Kontext im Wort, könnte man diesen Buchstaben auch für einen anderen halten.
    </div>

    const letterSizeADDescription = <div>
        Bitte lese den unten angezeigten Satz.<br/>
        Achte dabei auf die Buchstaben 'a' und 'd'.<br/>
        Sind diese Buchstaben einzeln eindeutig zu erkennen?<br/>
        Oder sieht eines der 'a' eher aus wie ein 'd', bzw. anders herum.<br/>
        <br/>
        1 - Alle Vorkommen der Buchstaben 'a' und 'd' sind wohl geformt und eindeutig zu erkennen.
        Der vertikale Strich des ‘a’ ist deutlich kürzer als der des ‘d’, deshalb sind die beiden Buchstaben leicht zu
        unterscheiden.
        Es bedarf nicht den Kontext im Wort um zu wissen, dass es sich um den jeweiligen Buchstaben handelt.


        5 - Es gibt mindestens ein 'a', das eher wie ein 'd', bzw. anders herum.
        Ohne den Kontext im Wort, könnte man diesen Buchstaben auch für einen anderen halten.
    </div>

    const letterSizeELDescription = <div>
        Bitte lese den unten angezeigten Satz.<br/>
        Achte dabei auf die Buchstaben 'e' und 'l'.<br/>
        Sind diese Buchstaben einzeln eindeutig zu erkennen?<br/>
        Oder sieht eines der 'e' eher aus wie ein 'l', bzw. anders herum.<br/>
        <br/>
        1 - Alle Vorkommen der Buchstaben 'e' und 'l' sind wohl geformt und eindeutig zu erkennen.
        Das ‘e’ ist deutlich kleiner als das ‘l’, deshalb sind die beiden Buchstaben leicht zu
        unterscheiden.
        Es bedarf nicht den Kontext im Wort um zu wissen, dass es sich um den jeweiligen Buchstaben handelt.


        5 - Es gibt mindestens ein 'e', das eher wie ein 'l', bzw. anders herum.
        Ohne den Kontext im Wort, könnte man diesen Buchstaben auch für einen anderen halten.
    </div>

    let text: ReactElement
    switch(question.id) {
        case 1: text = overallLegibilityDescription; break;
        case 2: text = letterAlignmentDescription; break;
        case 3: text = letterSizeRNHDescription; break;
        case 4: text = letterSizeADDescription; break;
        case 5: text = letterSizeELDescription; break;
        default:
            text = <div>Unknown question: {JSON.stringify(question)}.</div>
    }
    return text
}

export default QuestionDescription