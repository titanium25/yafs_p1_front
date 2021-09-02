import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from "@material-ui/icons/Delete";

export default function MemberDelete(props) {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        props.callBack(props.member._id)
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleClickOpen}
                startIcon={<DeleteIcon/>}
            >
                Delete
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Are you absolutely sure?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action cannot be undone. This will permanently delete the <b>{props.member.name}</b> from
                        the database. <br/>
                        Please type <b>delete {props.member.name}</b> to confirm.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="movie"
                        label="Type in confirmation"
                        type="text"
                        onChange={e => setText(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {
                        text === 'delete ' + props.member.name ?
                            <Button color="secondary" onClick={handleDelete}>Understood</Button>
                            :
                            <Button color="secondary" disabled>Understood</Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}
