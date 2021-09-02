import 'date-fns';
import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Rating} from "@material-ui/lab";
import Multiselect from 'multiselect-react-dropdown';
import axios from "axios";
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

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

export default function MovieAdd(props) {

    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(-1);

    const [title, setTitle] = useState('')
    const [rating, setRating] = useState(-1)
    const [genres, setGenres] = useState([])
    const [date, setDate] = useState(new Date())

    const [options, setOptions] = useState([])

    useEffect(async () => {
        const resp = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=c27dea4ca98bef510ddad73fc5c936c3')
        setOptions(resp.data.genres.map(v => ({name: v.name})))
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setTitle('')
        setRating(-1)
        setGenres([])
        setDate(new Date())
        setOpen(false);
    };

    const handleAdd = async () => {
        const obj = {
            name: title,
            rating,
            genres: genres.map(o => o.name),
            image: { medium: undefined, original: undefined },
            premiered: date.toISOString().split("T")[0]
        }
        setTitle('')
        setRating(-1)
        setGenres([])
        setDate(new Date())
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
                Add new movie
            </Button>
            <Dialog open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}
                    maxWidth={'xs'}
            >
                <DialogTitle id="form-dialog-title">Add Movie</DialogTitle>
                <DialogContent
                    style={{height: '390px'}}>

                    <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                    /> <br/> <br/>

                    <Multiselect
                        options={options} // Options to display in the dropdown
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
                    <Box
                        mb={3}
                        borderColor="transparent">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd-MM-yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Premiered date"
                                value={date}
                                onChange={(date) => setDate(date)}

                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Box>

                    <Box component="fieldset"
                         mb={3}
                         borderColor="transparent">
                        <Typography
                            component="legend">Rating {rating === -1 ? '' : rating}
                        </Typography>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            precision={0.5}
                            size="large"
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                        />
                        {<Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>}
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
