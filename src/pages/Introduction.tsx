import React from "react";
import {useNavigate} from "react-router-dom";
import {APP_BATCH_LABELING_START} from "../constants/Urls";

const Introduction: React.FC = () => {
    const navigate = useNavigate();

    return <div><div>"Hallo, danke fürs mitmachen"</div><button onClick={() => navigate(APP_BATCH_LABELING_START)}>weiter</button></div>
}

export default Introduction