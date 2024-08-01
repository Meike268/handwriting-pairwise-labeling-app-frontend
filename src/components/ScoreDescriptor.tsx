import React from "react";
import {Question} from "../entities/Batch";

const ScoreDescriptor: React.FC<{ score: number, question: Question }> = ({score, question}) => {
    let text
    switch (question.id) {
        case 1: switch (score) {
            case 0: text = "sehr leserlich"; break;
            case 1: text = "gut leserlich"; break;
            case 2: text = "leserlich"; break;
            case 3: text = "schwer leserlich"; break;
            case 4: text = "sehr schwer leserlich"; break;
            default: text = "Not a score";
        } break;
        case 2: switch (score) {
            case 0: text = "einheitliche Neigung (<X°)"; break;
            case 1: text = "leicht variierende Neigung (<X°)"; break;
            case 2: text = "variierende Neigung (<X°)"; break;
            case 3: text = "stark variierende Neigung (<X°)"; break;
            case 4: text = "sehr stark variierende Neigung (<X°)"; break;
            default: text = "Not a score";
        } break;
        case 3: switch (score) {
            case 0: text = "sehr leicht unterscheidbar"; break;
            case 1: text = "leicht unterscheidbar"; break;
            case 2: text = "eher unterscheidbar"; break;
            case 3: text = "schwer unterscheidbar"; break;
            case 4: text = "sehr schwer unterscheidbar"; break;
            default: text = "Not a score";
        } break;
        case 4: switch (score) {
            case 0: text = "sehr leicht unterscheidbar"; break;
            case 1: text = "leicht unterscheidbar"; break;
            case 2: text = "eher unterscheidbar"; break;
            case 3: text = "schwer unterscheidbar"; break;
            case 4: text = "sehr schwer unterscheidbar"; break;
            default: text = "Not a score";
        } break;
        case 5: switch (score) {
            case 0: text = "sehr leicht unterscheidbar"; break;
            case 1: text = "leicht unterscheidbar"; break;
            case 2: text = "eher unterscheidbar"; break;
            case 3: text = "schwer unterscheidbar"; break;
            case 4: text = "sehr schwer unterscheidbar"; break;
            default: text = "Not a score";
        } break;
    }
    return <div>{text}</div>
}

export default ScoreDescriptor