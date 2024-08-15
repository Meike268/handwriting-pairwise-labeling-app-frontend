import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {UserContext} from "../authentication/AuthenticationProvider";
import {
    APP_BATCH_LABELING_INTRO,
    APP_BATCH_LABELING_RESET,
    APP_FINISHED
} from "../constants/Urls";
import {fetchRandomBatch, TaskBatch} from "../entities/Batch";
import {HighlightColor, getHighlightColorByQuestionId} from "./helpers";

export const BatchContext = createContext<[TaskBatch | undefined, Dispatch<SetStateAction<TaskBatch | null | undefined>>] | undefined>(undefined);
export const ThemeContext = createContext<HighlightColor>(getHighlightColorByQuestionId(1));

export const BatchProvider: React.FC<{ children?: ReactNode }> = ({children}) => {
    const user = useContext(UserContext)!;
    const location = useLocation()
    const navigate = useNavigate()
    const [batch, setBatch] = useState<TaskBatch | null | undefined>(undefined)
    const [nextBatch, setNextBatch] = useState<TaskBatch | null | undefined>(undefined)

    useEffect(() => {
        if (batch !== undefined && nextBatch === undefined)
            fetchRandomBatch(user, [{question: batch!.question, samples: batch!.samples}]).then(res => setNextBatch(res))
    }, [batch, nextBatch, user]);

    function navigateNextAfterLoading(loading_result: TaskBatch | null) {
        if (loading_result === null)
            navigate(APP_FINISHED)
        else
            navigate(APP_BATCH_LABELING_INTRO)
    }

    if (location.pathname === APP_BATCH_LABELING_RESET) {
        if (batch === undefined)
            fetchRandomBatch(user).then(res => {
                setBatch(res)
                navigateNextAfterLoading(res)
            })
        else if (nextBatch !== undefined) {
            setBatch(nextBatch);
            setNextBatch(undefined)
            navigateNextAfterLoading(nextBatch)
        }
    }

    if (batch === undefined)
        return <div>"Loading new tasks..."</div>
    else if (batch === null)
        return <Navigate to={APP_FINISHED}/>
    else {
        return <BatchContext.Provider value={[batch, setBatch]}>
            <ThemeContext.Provider value={getHighlightColorByQuestionId(batch.question.id)}>
                {children ? children : <Outlet/>}
            </ThemeContext.Provider>
        </BatchContext.Provider>
    }
}