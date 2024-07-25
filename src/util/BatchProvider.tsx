import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {Outlet} from 'react-router-dom';
import {UserContext} from "../authentication/AuthenticationProvider";
import {Me} from "../authentication/Login";

export type Question = {
    id: string
    instruction: string
    examples?: {
        positive: "positive"
        negative: "negative"
    }
}

export type Score = 0 | 1 | 2 | 3 | 4
export type Sample = {
    id: string
    image: "sample"
    score: Score | undefined
}
export type TaskBatch = {
    question: Question
    samples: Array<Sample>
}

export const BatchContext = createContext<[TaskBatch | undefined, Dispatch<SetStateAction<TaskBatch | undefined>>] | undefined>(undefined);

export const BatchProvider: React.FC<{ children?: ReactNode }> = ({children}) => {
    const user = useContext(UserContext)!;
    const [batch, setBatch] = useState<TaskBatch | undefined>(undefined)

    useEffect(() => {
        fetchBatch(user).then(res => setBatch(res))
    }, []);

    const fetchBatch = async (user: Me) =>  {
        console.log(`Creatign batch for ${user}`)
        const theBatch: TaskBatch = {
            question: {
                id: "question1",
                instruction: "do something",
                examples: {
                    positive: "positive",
                    negative: "negative",
                }
            },
            samples: [
                {id: "sample1", image: "sample", score: undefined},
                {id: "sample2", image: "sample", score: undefined},
                {id: "sample3", image: "sample", score: undefined},
                {id: "sample4", image: "sample", score: undefined},
                {id: "sample5", image: "sample", score: undefined},
                {id: "sample6", image: "sample", score: undefined},
                {id: "sample7", image: "sample", score: undefined},
                {id: "sample8", image: "sample", score: undefined},
                {id: "sample9", image: "sample", score: undefined},
                {id: "sample10", image: "sample", score: undefined}
            ]
        }
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