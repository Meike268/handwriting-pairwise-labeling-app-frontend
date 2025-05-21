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
export const NextBatchContext = createContext<TaskBatch | null | undefined>(undefined);
export const ThemeContext = createContext<HighlightColor>(getHighlightColorByQuestionId(1));

export const BatchProvider: React.FC<{ children?: ReactNode }> = ({children}) => {
    const user = useContext(UserContext)!;
    const location = useLocation()
    const navigate = useNavigate()
    const [batch, setBatch] = useState<TaskBatch | null | undefined>(undefined)
    const [nextBatch, setNextBatch] = useState<TaskBatch | null | undefined>(undefined)

    let loading = false

    useEffect(() => {
        if (!!batch && nextBatch === undefined)
            fetchRandomBatch(user, [{question: batch!.question, samplePairs: batch!.samples}]).then(res => setNextBatch(res))
    }, [batch, nextBatch, user]);

    function navigateNextAfterLoading(loading_result: TaskBatch | null) {
        if (loading_result === null)
            navigate(APP_FINISHED)
        else
            navigate(APP_BATCH_LABELING_INTRO)
    }

    if (location.pathname === APP_BATCH_LABELING_RESET) {
        if (batch === undefined) {
            fetchRandomBatch(user).then(res => {
                setBatch(res)
                navigateNextAfterLoading(res)
            })
            loading = true
        }
        else if (nextBatch !== undefined) {
            if (nextBatch !== null)
                nextBatch.userAnswerCounts = {
                    submittedAnswersCount: nextBatch.userAnswerCounts.submittedAnswersCount + (batch?.samples.length ?? 0),
                    pendingAnswersCount: nextBatch.userAnswerCounts.pendingAnswersCount
                }
            setBatch(nextBatch);
            setNextBatch(undefined)
            navigateNextAfterLoading(nextBatch)
        }
    }

    if (loading)
        return <div>"Loading new tasks..."</div>
    else if (batch === undefined)
        return <Navigate to={APP_BATCH_LABELING_RESET}/>
    else if (batch === null)
        return <Navigate to={APP_FINISHED}/>
    else {
        return <BatchContext.Provider value={[batch, setBatch]}>
            <NextBatchContext.Provider value={nextBatch}>
                <ThemeContext.Provider value={getHighlightColorByQuestionId(batch.question.id)}>
                    {children ? children : <Outlet/>}
                </ThemeContext.Provider>
            </NextBatchContext.Provider>
        </BatchContext.Provider>
    }
}