import React, {useContext} from "react";
import {
    APP_BATCH_LABELING_SAMPLE,
} from "../constants/Urls";
import { useNavigate } from "react-router-dom";
import {BatchContext, ThemeContext} from "../util/BatchProvider";
import {TaskBatch} from "../entities/Batch";
import BatchLabelingWrapper from "../components/BatchLabelingWrapper";
import QuestionDescription from "../components/QuestionDescription";
import {Image} from "../components/Image";
import BatchLabelingTaskLayout from "../components/BatchLabelingTaskLayout";


export function getHeader(questionId: number): string {
    switch (questionId) {
        case 1:
            return "Leserlichkeit";
        case 2:
            return "Neigung";
        case 3:
            return "Buchstabenform 'r', 'n' und 'h'";
        case 4:
            return "Buchstabenform 'a' und 'd'";
        case 5:
            return "Buchstabenform 'e' und 'l'";
        default:
            return "Schrift bewerten"
    }
}

const BatchLabelingIntro: React.FC = () => {
    const navigate = useNavigate()
    const [maybeBatch] = useContext(BatchContext)!
    const themeHighlight = useContext(ThemeContext)
    const batch: TaskBatch = maybeBatch!

    function navigateNext() {
        navigate(APP_BATCH_LABELING_SAMPLE(0))
    }

    return <BatchLabelingWrapper
        headline={getHeader(batch.question.id)}
        navigatePrevPage={null}
        navigateNextPage={() => navigateNext()}
        progress={{current: 0, end: batch.samples.length}}
    >
        { batch.userAnswerCounts.submittedAnswersCount > 0 && <div className={"basic-long-text-div"}>
                Toll! Du hast uns schon mit <b style={{color: themeHighlight.light}}>{batch.userAnswerCounts.submittedAnswersCount}</b> Bewertungen geholfen.<br/>
                Aktuell suchen wir noch <b style={{color: themeHighlight.light}}>{batch.userAnswerCounts.pendingAnswersCount}</b> weitere Bewertungen, zu denen du beitragen kannst.<br/>
                <br/>
            </div>
        }
        <BatchLabelingTaskLayout
            descriptionText={<QuestionDescription question={batch.question}/>}
            image={<Image src={batch.example.image} alt={"example"}/>}
            actions={<button style={{height: "100%", width: "100%", color: themeHighlight.light}} onClick={() => navigateNext()}>Start</button>}/>
    </BatchLabelingWrapper>
}

export default BatchLabelingIntro;