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
export const NextBatchContext = createContext<() => Promise<void>>(
  async () => {}
);
export const ThemeContext = createContext<HighlightColor>(getHighlightColorByQuestionId(1));

export const BatchProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
    const user = useContext(UserContext)!;
    const location = useLocation();
    const navigate = useNavigate();
    const [batch, setBatch] = useState<TaskBatch | null | undefined>(undefined);

    useEffect(() => {
        if (location.pathname === APP_BATCH_LABELING_RESET) {
            if (batch === undefined) {
                fetchRandomBatch(user).then(res => {
                    setBatch(res);  // Set batch after fetch is complete
                    navigateNextAfterLoading(res);
                });
            } else {
                setBatch(undefined);  // Clear batch
                navigate(APP_BATCH_LABELING_RESET);
            }
        }
    }, [location.pathname, batch, user, navigate]);

    const navigateNextAfterLoading = (loading_result: TaskBatch | null | undefined) => {
        if (!loading_result)
            navigate(APP_FINISHED);
        else
            navigate(APP_BATCH_LABELING_INTRO);
    };

    if (batch === undefined) {
        // Show loading state if the batch is undefined
        return <div>Loading new tasks...</div>;
    } else if (batch === null) {
        // Redirect if batch is null (finished)
        return <Navigate to={APP_FINISHED} />;
    } else {
        // Provide the batch context and render children or outlet
        return (
            <BatchContext.Provider value={[batch, setBatch]}>
                <ThemeContext.Provider value={getHighlightColorByQuestionId(batch.question.id)}>
                    {children ? children : <Outlet />}
                </ThemeContext.Provider>
            </BatchContext.Provider>
        );
    }
};
