import React, {useContext} from "react";
import db from "./db";
import {UserContext} from "./AuthenticationProvider";

const EndPage: React.FC = () => {
    const user = useContext(UserContext)

    async function downloadData() {
        const json = JSON.stringify(await db.getExport())
        const url = window.URL.createObjectURL(
            new Blob([json]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
            'download',
            `ergebnisse_${user?.name}.json`,
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode!.removeChild(link);
    }

    return <div style={{width: "100%"}}>
        <button onClick={() => downloadData()} style={{padding: "10px 30px"}}>Ergebnisse herunterladen</button>
    </div>
}

export default EndPage