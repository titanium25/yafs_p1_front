import 'date-fns';
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

export default function MemberAdd(props) {

    const [open, setOpen] = useState(false);

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setCity('')
        setOpen(false);
    };

    const handleAdd = async () => {
        const obj = {
            name: firstName + ' ' + lastName,
            email,
            city
        }
        setFirstName('')
        setLastName('')
        setEmail('')
        setCity('')
        props.callBack(obj)
        setOpen(false);
    };


    return (
        <div>
            <Button
                color="primary"
                onClick={handleClickOpen}
                startIcon={<AddCircleOutlineIcon/>}
            >
                Add new member
            </Button>
            <Dialog open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}
                    maxWidth={'xs'}
            >
                <DialogTitle id="form-dialog-title">Add Member</DialogTitle>
                <DialogContent
                    style={{height: '350px'}}>

                    <TextField
                        id="first-name"
                        label="First name"
                        variant="outlined"
                        onChange={(e) => setFirstName(e.target.value)}
                        fullWidth
                    />
                    <br/> <br/>
                    <TextField
                        id="last-name"
                        label="Last name"
                        variant="outlined"
                        onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                    />
                    <br/> <br/>
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <br/> <br/>
                    <TextField
                        id="city"
                        label="City"
                        variant="outlined"
                        onChange={(e) => setCity(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                    <Button color="secondary" onClick={handleAdd}>Add</Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}
