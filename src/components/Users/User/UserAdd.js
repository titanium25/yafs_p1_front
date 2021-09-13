import 'date-fns';
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {FormControlLabel, FormHelperText, FormLabel, Grid, Paper} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import {Checkbox, FormGroup} from "@blueprintjs/core";
import {makeStyles} from "@material-ui/core/styles";
import {Form} from "react-bootstrap";
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
    paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
},
}));
export default function UserAdd(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = React.useState({
        vm: false,
        cm: false,
        dm: false,
        um: false,
        vs: false,
        cs: false,
        ds: false,
        us: false
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


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

    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <FormControlLabel
                        control={<Checkbox checked={state.vm} onChange={handleChange} name="view movies" />}
                        label="view movies"
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel
                        control={<Checkbox checked={state.vs} onChange={handleChange} name="view members" />}
                        label="view members"
                    />
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <div>

        <Button
                color="primary"
                onClick={handleClickOpen}
                startIcon={<AddCircleOutlineIcon/>}
            >
                Add new user
            </Button>
            <Dialog open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}
                    maxWidth={'xs'}
            >
                <DialogTitle id="form-dialog-title">Add User</DialogTitle>
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
