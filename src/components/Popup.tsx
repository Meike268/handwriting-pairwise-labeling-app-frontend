import CloseIcon from '@mui/icons-material/Close';
import React from "react";
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

const Popup: React.FC<{
    onClose: () => void,
    closable?: boolean,
    title?: string,
    children: React.ReactNode
}> = ({onClose, closable=true, title, children}) => {
    return <Dialog onClose={onClose} maxWidth="md" open={true} PaperProps={{style: {backgroundColor: '#282c34', color: 'white'}}}>
        <DialogTitle>
            {title}
            {closable && <button
                onClick={onClose}
                style={{ position: "absolute", display: "flex", padding:"0", right: "3px", top: "3px"}}
            >
                <CloseIcon/>
            </button> }
        </DialogTitle>

        <DialogContent>
            {children}
        </DialogContent>
    </Dialog>
}

export default Popup;
