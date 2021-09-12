import 'date-fns';
import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from "@material-ui/icons/Edit";
import {FormControlLabel} from "@material-ui/core";
import {FormGroup, Switch} from "@blueprintjs/core";

export default function UserEdit(props) {

    const [open, setOpen] = useState(false);

    const [firstName, setFirstName] = useState(props.user.firstName)
    const [lastName, setLastName] = useState(props.user.lastName)
    const [email, setEmail] = useState(props.user.username)
    const [isAdmin, setIsAdmin] = useState(props.user.isAdmin)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = () => {
        const obj = {
            id: props.user._id,
            firstName,
            lastName,
            email,
            isAdmin
        }
        props.callBack(obj)
        setOpen(false);
    };

    const toggleChecked = () => {
        setIsAdmin((prev) => !prev);
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
                startIcon={<EditIcon/>}
            >
                Edit
            </Button>
            <Dialog open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}
                    maxWidth={'xs'}
            >
                <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
                <DialogContent
                    style={{height: '350px'}}>
                    <FormGroup>
                    <TextField
                        id="first-name"
                        label="First name"
                        variant="outlined"
                        defaultValue={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        fullWidth
                    />
                    <br/> <br/>
                    <TextField
                        id="last-name"
                        label="Last name"
                        variant="outlined"
                        defaultValue={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                    />
                    <br/> <br/>
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                        <br/> <br/>

                        <FormControlLabel
                            control={<Switch checked={isAdmin} onChange={toggleChecked} />}
                            label="Admin"
                        />
                    </FormGroup>

                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose} >
                        Cancel
                    </Button>

                    <Button color="secondary" onClick={handleEdit}>Edit</Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}
