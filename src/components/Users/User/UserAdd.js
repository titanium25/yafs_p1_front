import 'date-fns';
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {Box, FormControlLabel} from "@material-ui/core";
import {Checkbox, FormGroup} from "@blueprintjs/core";
import {makeStyles} from "@material-ui/core/styles";
import * as PropTypes from "prop-types";

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

function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: 1,
                m: 0,
                width: 100,
                borderRadius: 1,
                textAlign: 'center',
                fontSize: 15,
                fontWeight: '400',
                ...sx,
            }}
            {...other}
        />
    );
}

Item.propTypes = {children: PropTypes.node};
export default function UserAdd(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState({
        vm: false,
        cm: false,
        dm: false,
        um: false,
        vs: false,
        cs: false,
        ds: false,
        us: false
    });

    const { vm, cm, dm, um, vs, cs, ds, us } = state;

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
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
            firstName,
            lastName,
            username: email,
            city,
            state
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
                    <br/><br/>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        width: '100%',
                        columnGap: 0,
                        rowGap: 0
                    }}>
                        <Item></Item>
                        <Item>Movies</Item>
                        <Item>Subscriptions</Item>
                        <Item>View</Item>
                        <Item>
                            <Checkbox checked={vm} onChange={handleChange} name="vm" />
                        </Item>
                        <Item>
                            <Checkbox checked={vs} onChange={handleChange} name="vs" />
                        </Item>
                        <Item>Create</Item>
                        <Item>
                            <Checkbox checked={cm} onChange={handleChange} name="cm" />
                        </Item>
                        <Item>
                            <Checkbox checked={cs} onChange={handleChange} name="cs" />
                        </Item>
                        <Item>Update</Item>
                        <Item>
                            <Checkbox checked={um} onChange={handleChange} name="um" />
                        </Item>
                        <Item>
                            <Checkbox checked={us} onChange={handleChange} name="us" />
                        </Item>
                        <Item>Delete</Item>
                        <Item>
                            <Checkbox checked={dm} onChange={handleChange} name="dm" />
                        </Item>
                        <Item>
                            <Checkbox checked={ds} onChange={handleChange} name="ds" />
                        </Item>
                    </Box>

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
