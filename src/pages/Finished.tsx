import React from "react";
import {useNavigate} from "react-router-dom";


export const Finished: React.FC = () => {
    const navigate = useNavigate();

    return <div>
        <div>Du hast alle Bilder bewertet. Aktuell werden keine weitern Bewertungen erhoben. Vielen Dank fürs Mitmachen!!!</div>
        <button onClick={() => navigate(APP_LOGOUT)}>logout</button>
    </div>
}
