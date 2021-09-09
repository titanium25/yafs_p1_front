import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Box, Paper, TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import {Rating} from "@material-ui/lab";
import Button from "@material-ui/core/Button";

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

const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(1),
                width: theme.spacing(80),
            },
        },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

export default function AddReview(props) {
    const classes = useStyles();
    const [value, setValue] = useState(2.5);
    const [hover, setHover] = useState(-1);
    const [author, setAuthor] = useState('');
    const [review, setReview] = useState('');

    return (
        <div>
            <Typography
                gutterBottom
                variant="h6"
                component="div"
            >
                Leave a Review
            </Typography>
            <div className={classes.root}>
                <div>
                    <Paper elevation={1} style={{padding: "20px 20px", backgroundColor: "#f3f3f3"}}>
                        <FormControl fullWidth variant="outlined" noValidate autoComplete="off">
                            <TextField
                                id="name"
                                label="Your Name"
                                variant="outlined"
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                            <br/>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend">Rating</Typography>
                                <Rating
                                    name="hover-feedback"
                                    value={value}
                                    precision={0.5}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
                                />
                                {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                            </Box>
                            <TextField
                                id="outlined-multiline-static"
                                label="Review"
                                multiline
                                rows={4}
                                variant="outlined"
                                onChange={(e) => setReview(e.target.value)}

                            />
                            <br/>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => props.callBackAddReview({
                                    author: author,
                                    body: review,
                                    score: value
                                })}
                            >
                                Send Message
                            </Button>
                        </FormControl>
                    </Paper>
                </div>
            </div>
        </div>

    )
}