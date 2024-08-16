import React, {ReactElement} from "react";
import {Question} from "../entities/Batch";

const QuestionDescription: React.FC<{question: Question}> = ({question}) => {

    const overallLegibilityDescription = <div className={"basic-long-text-div"}>
        Bitte lies den unten angezeigten Satz.<br/>
        Bewerte anschließend, wie leserlich du die Schrift findest.<br/>
        Achte darauf, ob du den Satz mehrfach lesen musst, oder ob du ihn in einem Schwung lesen kannst.<br/>
        Musst du den Satz oder einzelne Wörter mehrfach lesen, dann ist der Satz weniger leserlich.<br/>
        Vergleiche den Satz mit den angezeigten Beispielen, um besser einschätzen zu können, welche Bewertung zutreffend
        ist.<br/>
        <br/>
        1 - Die Bewertung 1 bedeutet, dass der Satz sehr leserlich ist. Du konntest ihn schnell und problemlos lesen. Du
        bist nicht in Stocken gekommen.<br/>
        <br/>
        5 - Die Bewertung 5 bedeutet, dass der Satz sehr schwer leserlich ist. Selbst nach mehrfachem lesen ist mindestens ein
        Wort nicht eindeutig zu entziffern.
    </div>

    const letterAlignmentDescription = <div className={"basic-long-text-div"}>
        Bitte lies den unten angezeigten Satz.<br/>
        Nachdem du den Satz einmal gelesen hast, schaue dir einen Buchstaben nach dem anderen an. Achte auf die Neigung der vertikalen Striche.<br/>
        Sind alle Buchstaben in die gleiche Richtung geneigt (nach links oder rechts)?<br/>
        Ist die Neigung bei allen Buchstaben gleich, ähnlich, oder unterschiedlich?<br/>
        Vergleiche den Satz mit den angezeigten Beispielen, um besser einschätzen zu können, welche Bewertung zutreffend ist.<br/>
        Die Bewertung richtet sich nach dem größten Neigungsunterschied zweier Buchstaben und nicht nach der durchschnittlichen Abweichung.<br/>
        <br/>
        1- Die vertikalen Striche aller Buchstaben sind einheitlich geneigt. Mit dem blossen Auge lässt sich keine Abweichung im Winkel erkennen.<br/>
        <br/>
        5- Verschiedene Buchstaben sind unterschiedlich ausgerichtet. Zwischen mindestens zwei Buchstaben mit vertikalem Strich ist eine starke Abweichung des Winkels zu erkennen.
    </div>

    const letterSizeRNHDescription = <div className={"basic-long-text-div"}>
        Bitte lies den unten angezeigten Satz.<br/>
        Achte dabei auf die Buchstaben 'r', 'n' und 'h'.<br/>
        Diese drei Buchstaben entstehen durch einen ähnlichen Schwung des Stiftes. Sie unterscheiden sich nur darin, wie
        weit oben der vertikale Strich beginnt und wie weit unten der Bogen endet.<br/>
        Sind diese Buchstaben einzeln eindeutig zu erkennen?<br/>
        Oder sieht eines der 'n' eher aus wie ein 'r' oder 'h' bzw. andersherum.<br/>
        <br/>
        1 - Alle Vorkommen der Buchstaben 'r', 'n' und 'h' sind wohlgeformt und eindeutig zu erkennen.
        Der vertikale Strich des ‘n’ ist deutlich kürzer als der eines ‘h’, deshalb sind die beiden Buchstaben leicht zu
        unterscheiden.
        Der Bogen des 'n' reicht weiter hinunter zur Grundlinie als der eines 'r', deshalb sind die beiden Buchstaben
        leicht zu unterscheiden.
        Es bedarf nicht den Kontext im Wort, um zu wissen, dass es sich um den jeweiligen Buchstaben handelt.<br/>
        <br/>
        5 - Es gibt mindestens ein 'n', das eher wie ein 'r' oder 'h' aussieht, bzw. andersherum.
        Ohne den Kontext im Wort könnte man diesen Buchstaben auch für einen anderen halten.
    </div>

    const letterSizeADDescription = <div className={"basic-long-text-div"}>
        Bitte lies den unten angezeigten Satz.<br/>
        Achte dabei auf die Buchstaben 'a' und 'd'.<br/>
        Diese zwei Buchstaben entstehen durch einen ähnlichen Schwung des Stiftes. Sie unterscheiden sich nur darin, wie
        weit nach oben der vertikale Strich gezogen wurde.<br/>
        Sind diese Buchstaben einzeln eindeutig zu erkennen?<br/>
        Oder sieht eines der 'a' eher aus wie ein 'd', bzw. andersherum.<br/>
        <br/>
        1 - Alle Vorkommen der Buchstaben 'a' und 'd' sind wohlgeformt und eindeutig zu erkennen.
        Der vertikale Strich des ‘a’ ist deutlich kürzer als der eines ‘d’, deshalb sind die beiden Buchstaben leicht zu
        unterscheiden.
        Es bedarf nicht den Kontext im Wort, um zu wissen, dass es sich um den jeweiligen Buchstaben handelt.<br/>
        <br/>
        5 - Es gibt mindestens ein 'a', das eher wie ein 'd' aussieht, bzw. andersherum.
        Ohne den Kontext im Wort könnte man diesen Buchstaben auch für einen anderen halten.
    </div>

    const letterSizeELDescription = <div className={"basic-long-text-div"}>
        Bitte lies den unten angezeigten Satz.<br/>
        Achte dabei auf die Buchstaben 'e' und 'l'.<br/>
        Sind diese Buchstaben einzeln eindeutig zu erkennen?<br/>
        Oder sieht eines der 'e' eher aus wie ein 'l', bzw. andersherum.<br/>
        <br/>
        1 - Alle Vorkommen der Buchstaben 'e' und 'l' sind wohlgeformt und eindeutig zu erkennen.
        Das ‘e’ ist deutlich kleiner als das ‘l’, deshalb sind die beiden Buchstaben leicht zu
        unterscheiden.
        Es bedarf nicht den Kontext im Wort, um zu wissen, dass es sich um den jeweiligen Buchstaben handelt.<br/>
        <br/>
        5 - Es gibt mindestens ein 'e', das eher aussieht wie ein 'l', bzw. andersherum.
        Ohne den Kontext im Wort könnte man diesen Buchstaben auch für einen anderen halten.
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