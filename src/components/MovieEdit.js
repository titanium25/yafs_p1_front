import 'date-fns';
import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MoviesDAL from "../adapters/MoviesDAL";
import EditIcon from "@material-ui/icons/Edit";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Rating} from "@material-ui/lab";
import Multiselect from 'multiselect-react-dropdown';
import axios from "axios";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

export default function MovieEdit(props) {

    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(-1);

    const [title, setTitle] = useState('')
    const [rating, setRating] = useState(-1)
    const [genres, setGenres] = useState([])
    const [date, setDate] = useState('')

    const [options, setOptions] = useState([])

    useEffect(async () => {
        const resp = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=c27dea4ca98bef510ddad73fc5c936c3')
        setOptions(resp.data.genres.map(v => ({name: v.name})))
    },[])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setTitle('')
        setRating(-1)
        setGenres([])
        setDate('')
        setOpen(false);
    };

    const handleEdit = async () => {
        const obj = {
            name: title === '' ? props.movie.name : title,
            rating: rating === -1 ? props.movie.rating / 2 : rating * 2,
            genres: genres.length === 0 ? props.movie.genres : genres.map(o => o.name),
            premiered: date === '' ? props.movie.premiered : date.toISOString().split("T")[0]
        }
        setTitle('')
        setRating(-1)
        setGenres([])
        setDate('')
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
                <DialogTitle id="form-dialog-title">Edit Movie</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            defaultValue={props.movie.name}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth/> <br/> <br/>
                        <Box component="fieldset"
                             mb={3}
                             borderColor="transparent">
                            <Typography component="legend">Rating {rating === -1 ? props.movie.rating / 2 : rating}</Typography>
                            <Rating
                                name="simple-controlled"
                                value={rating === -1 ? props.movie.rating / 2 : rating}
                                precision={0.5}
                                size="large"
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                            />
                            {props.movie.rating / 2 !== null && <Box ml={2}>{labels[hover !== -1 ? hover : props.movie.rating / 2]}</Box>}

                        </Box>

                        <Multiselect
                            options={options} // Options to display in the dropdown
                            selectedValues={props.movie.genres.map((v, i) => ({name: v, id: i}))} // Preselected value to persist in dropdown
                            selectionLimit={4} // limit the number of items that can be selected in a dropdown
                            onSelect={(selectedList) => setGenres(selectedList)} // Function will trigger on select event
                            onRemove={(selectedList) => setGenres(selectedList)} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                            placeholder="Select up to 4 genres"
                            emptyRecordMsg="No records found. Genre-API issue"
                            showArrow={true}
                            style={{
                                inputField: { // To change input field position or margin
                                    margin: '15px'
                                },
                            }}
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd-MM-yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Premiered date"
                            value={date === '' ? props.movie.premiered : date}
                            onChange={(date) => setDate(date)}

                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        </MuiPickersUtilsProvider>
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                    <Button color="secondary" onClick={handleEdit}>Confirm</Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}
