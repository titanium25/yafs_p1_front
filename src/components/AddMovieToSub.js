import React, {useState} from 'react';
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
import SubsDAL from "../adapters/SubsDAL";

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

export default function AddMovieToSub(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [movie, setMovie] = useState({})
    const [date, setDate] = useState('')

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
            date: date
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
                <DialogTitle>Choose the movie name and date</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="movie">Movie</InputLabel>
                            <Select
                                labelId="movie"
                                value={movie}
                                onChange={(event) => setMovie(event.target.value)}
                                input={<Input id="movie"/>}
                            >
                                <option aria-label="None" value=""/>
                                {
                                    props.list.map((m, i) => {
                                        return <option value={m} key={i}>{m.name}</option>

                                    })
                                }

                            </Select>

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date"
                                    format="MM/dd/yyyy"
                                    value={new Date('2021-08-27T21:11:54')}
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
