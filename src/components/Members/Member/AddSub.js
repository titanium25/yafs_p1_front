import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SubsDAL from "../../../adapters/SubsDAL";
import MoviesDAL from "../../../adapters/MoviesDAL";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function AddSub(props) {
    const classes = useStyles();
    const [dropDown, setDropDown] = useState([])
    const [open, setOpen] = useState(false);
    const [movie, setMovie] = useState({})
    const [date, setDate] = useState(new Date())

    useEffect(async () => {
        const respList = await MoviesDAL.getDropDown(props.id)
        setDropDown(respList.data)
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        setOpen(false)
    };

    const handleAdd = async () => {
        let obj = {
            memberId: props.id,
            movieId: movie._id,
            name: movie.name,
            image: movie.image.medium,
            date: date.toISOString().split("T")[0]
        }
        if (movie && date) {
            await SubsDAL.addSubs(obj)
            setOpen(false)
        }
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>Subscribe to a new movie</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add subscription</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="movie">Movie</InputLabel>
                            <Select
                                labelId="movie"
                                value={movie}
                                onChange={(event) => setMovie(event.target.value)}
                            >
                                <option aria-label="None" value=""/>
                                {
                                    dropDown.map((movie, i) => {
                                        return <option value={movie} key={i}>{ movie.name }</option>
                                    })
                                }

                            </Select>

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date"
                                    format="dd/MM/yyyy"
                                    value={new Date()}
                                    onChange={(date) => setDate(date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'Set date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>

                        </FormControl>

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
