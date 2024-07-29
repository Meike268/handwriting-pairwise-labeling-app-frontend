import React, {ReactElement} from "react";
import {Question} from "../entities/Batch";

const QuestionDescription: React.FC<{question: Question}> = ({question}) => {
    const placeholder = <div>
        Diese Website ist Teil der Abschlussarbeiten von Lukas Pieger und Erik Schmidt.
        In Zusammenarbeit mit Stabilo und dem xAI Lehrstuhl wollen wir die Handschrift von Schülern
        automatisiert bezüglich ihrer Leserlichkeit Bewerten. Dazu haben wir von etwa 200 Schülern die selben 10
        Sätze aufgezeichnet. Zweck dieser Website ist es deine Einschätzung zur Leserlichkeit einzelner Sätze zu
        sammeln. Diese Bewertungen dienen später als Grundlage (Trainings-Besipiele) für KI-Modelle, die
        Handschrift möglichst so bewerten sollen, wie das Menschen tun.
        <br/>
        <br/>
        Bitte melde dich mit den Daten an, die wir dir geschickt haben. Danach geht es direkt los.
        Falls du keine Login-Daten hast und gerne helfen willst, melde dich
        bei hw-labeling-app@beispiel.de.
    </div>
    let text: ReactElement
    switch(question.id) {
        case 1: text = placeholder; break;
        case 2: text = placeholder; break;
        case 3: text = placeholder; break;
        case 4: text = placeholder; break;
        case 5: text = placeholder; break;
        default:
            text = <div>Unknown question: {JSON.stringify(question)}.</div>
    }
    return text
}

export default QuestionDescription