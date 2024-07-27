import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {UserContext} from "../authentication/AuthenticationProvider";
import {APP_BATCH_LABELING_PATH, APP_BATCH_LABELING_SAMPLE} from "../constants/Urls";
import {fetchRandomBatch, TaskBatch} from "../entities/Batch";

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
        fetchRandomBatch(user).then(res => {
            setBatch(res)
            navigate(APP_BATCH_LABELING_SAMPLE(0))
        })
    }


    if (batch === undefined) {
        return <div>"Loading new tasks..."</div>
    } else {
        return <BatchContext.Provider value={[batch, setBatch]}>
            {children ? children : <Outlet />}
        </BatchContext.Provider>
    }
}