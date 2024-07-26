import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {UserContext} from "../authentication/AuthenticationProvider";
import {Me} from "../authentication/Login";
import {APP_BATCH_LABELING_PATH, APP_BATCH_LABELING_SAMPLE} from "../constants/Urls";
import {sleep} from "./helpers";
import {PreloadableImageSrc} from "../components/Image";

export type Question = {
    id: string
    instruction: string
    examples?: {
        positive: PreloadableImageSrc
        negative: PreloadableImageSrc
    }
}

export type Score = 0 | 1 | 2 | 3 | 4
export type Sample = {
    id: string
    image: PreloadableImageSrc
    score: Score | undefined
}
export type TaskBatch = {
    question: Question
    samples: Array<Sample>
}
async function preloadImages(batch: TaskBatch) {
    for (const sample of batch.samples) {
        await sample.image.load()
    }
}

export const BatchContext = createContext<[TaskBatch | undefined, Dispatch<SetStateAction<TaskBatch | undefined>>] | undefined>(undefined);

export const BatchProvider: React.FC<{ children?: ReactNode }> = ({children}) => {
    const user = useContext(UserContext)!;
    const location = useLocation()
    const navigate = useNavigate()
    const [batch, setBatch] = useState<TaskBatch | undefined>(undefined)

    if (location.pathname === APP_BATCH_LABELING_PATH + "/" && batch !== undefined) {
        setBatch(undefined)
    }

    if (batch === undefined) {
        fetchBatch(user).then(res => {
            setBatch(res)
            navigate(APP_BATCH_LABELING_SAMPLE(0))
        })
    }

    async function fetchBatch(user: Me) {  // TODO make this fetch from backend
        console.info(`Fetching batch for ${JSON.stringify(user)}`)
        const theBatch: TaskBatch = {
            question: {
                id: "question1",
                instruction: "do something",
                examples: {
                    positive: new PreloadableImageSrc("http://localhost:8080/files/images/samples/xai_sentences/1/7012_1.png", "positive_exmaple"),
                    negative: new PreloadableImageSrc("http://localhost:8080/files/images/samples/xai_sentences/1/7012_1.png", "negative_exmaple"),
                }
            },
            samples: [
                {id: "sample1", image: new PreloadableImageSrc("http://localhost:8080/files/images/samples/xai_sentences/1/7012_1.png", "sample"), score: undefined},
                {id: "sample2", image: new PreloadableImageSrc("http://localhost:8080/files/images/samples/xai_sentences/1/7012_1.png", "sample"), score: undefined},
                {id: "sample3", image: new PreloadableImageSrc("http://localhost:8080/files/images/samples/xai_sentences/1/7012_1.png", "sample"), score: undefined},
                {id: "sample4", image: new PreloadableImageSrc("http://localhost:8080/files/images/samples/xai_sentences/1/7012_1.png", "sample"), score: undefined},
                {id: "sample5", image: new PreloadableImageSrc("http://localhost:8080/files/images/samples/xai_sentences/1/7012_1.png", "sample"), score: undefined},
                {id: "sample6", image: new PreloadableImageSrc("http://localhost:8080/files/images/samples/xai_sentences/1/7012_1.png", "sample"), score: undefined},
                {id: "sample7", image: new PreloadableImageSrc("http://localhost:8080/files/images/samples/xai_sentences/1/7012_1.png", "sample"), score: undefined},
                {id: "sample8", image: new PreloadableImageSrc("http://localhost:8080/files/images/samples/xai_sentences/1/7012_1.png", "sample"), score: undefined},
                {id: "sample9", image: new PreloadableImageSrc("http://localhost:8080/files/images/samples/xai_sentences/1/7012_1.png", "sample"), score: undefined},
                {id: "sample10", image: new PreloadableImageSrc("http://localhost:8080/files/images/samples/xai_sentences/1/7012_1.png", "sample"), score: undefined},
            ]
        }
        await sleep(1000)  // Simulate response time
        preloadImages(theBatch)
        return theBatch
    }

    if (batch === undefined) {
        return <div>"Loading new tasks..."</div>
    } else {
        return <BatchContext.Provider value={[batch, setBatch]}>
            {children ? children : <Outlet />}
        </BatchContext.Provider>
    }
}