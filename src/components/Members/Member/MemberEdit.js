import 'date-fns';
import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from "@material-ui/icons/Edit";

export default function MemberEdit(props) {

    const [open, setOpen] = useState(false);

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')

    useEffect(() => {
        setFirstName(props.member.name.split(" ")[0])
        setLastName(props.member.name.split(" ")[1])
        setEmail(props.member.email)
        setCity(props.member.city)
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = async () => {
        const obj = {
            id: props.member._id,
            name: firstName + ' ' + lastName,
            email,
            city
        }
        props.callBack(obj)
        setOpen(false);
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
                <DialogTitle id="form-dialog-title">Edit Member</DialogTitle>
                <DialogContent
                    style={{height: '350px'}}>

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
                    <TextField
                        id="city"
                        label="City"
                        variant="outlined"
                        defaultValue={city}
                        onChange={(e) => setCity(e.target.value)}
                        fullWidth
                    />
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
