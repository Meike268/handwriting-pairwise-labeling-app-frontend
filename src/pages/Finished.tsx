import React from "react";
import {useNavigate} from "react-router-dom";
import {APP_LOGOUT} from "../constants/Urls";


export const Finished: React.FC = () => {
    const navigate = useNavigate();

    return <div>
        <div className={"basic-long-text-div"}>
            Du hast alle Bilder bewertet für die wir im Moment Labels sammeln.
            Aktuell werden keine weitern Bewertungen erhoben.
            <br/>
            <br/>
            Vielen Dank fürs Mitmachen!!!</div>
        <button onClick={() => navigate(APP_LOGOUT)}>logout</button>
    </div>
}
