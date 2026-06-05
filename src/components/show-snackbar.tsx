import Snackbar from "@mui/material/Snackbar";

interface SnackbarProps{
    message: string,
    open: boolean,
    onClose: () => void,
}

export function ShowSnackbar({message, onClose, open}:SnackbarProps){

    
        return(
            <Snackbar
                anchorOrigin={{horizontal: 'center', vertical: 'top'}}
                open={open}
                autoHideDuration={6000}
                onClose={() => onClose()}
                message={message}
            />
        )
    }