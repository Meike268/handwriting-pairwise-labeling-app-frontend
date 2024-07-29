import React from "react";
import {Question} from "../entities/Batch";

const ScoreDescriptor: React.FC<{ score: number, question: Question }> = ({score, question}) => {
    let text
    switch (question.id) {
        case 1: switch (score) {
            case 0: text = "shit"; break;
            case 1: text = "not shit"; break;
            case 2: text = "ok"; break;
            case 3: text = "ganz gut"; break;
            case 4: text = "wirklich mega krass gut"; break;
            default: text = "Not a score";
        } break;
        case 2: switch (score) {
            case 0: text = "shit"; break;
            case 1: text = "not shit"; break;
            case 2: text = "ok"; break;
            case 3: text = "ganz gut"; break;
            case 4: text = "wirklich mega krass gut"; break;
            default: text = "Not a score";
        } break;
        case 3: switch (score) {
            case 0: text = "shit"; break;
            case 1: text = "not shit"; break;
            case 2: text = "ok"; break;
            case 3: text = "ganz gut"; break;
            case 4: text = "wirklich mega krass gut"; break;
            default: text = "Not a score";
        } break;
        case 4: switch (score) {
            case 0: text = "shit"; break;
            case 1: text = "not shit"; break;
            case 2: text = "ok"; break;
            case 3: text = "ganz gut"; break;
            case 4: text = "wirklich mega krass gut"; break;
            default: text = "Not a score";
        } break;
        case 5: switch (score) {
            case 0: text = "shit"; break;
            case 1: text = "not shit"; break;
            case 2: text = "ok"; break;
            case 3: text = "ganz gut"; break;
            case 4: text = "wirklich mega krass gut"; break;
            default: text = "Not a score";
        } break;
    }
    return <div>{text}</div>
}

export default ScoreDescriptor