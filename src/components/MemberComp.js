import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Accordion, AccordionDetails, AccordionSummary, InputLabel, MenuItem, Select} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));


const getInitials = (nameString) => {
    const fullName = nameString.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
}

function randomColor() {
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    let color = "#" + hex.toString(16);

    return color;
}

export default function MemberComp(props) {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };


    const classes = useStyles();
    return (
        <Card sx={{maxWidth: 100}}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe"
                            style={{
                                backgroundColor: randomColor()
                            }}>
                        {getInitials(props.member.name)}
                    </Avatar>
                }
                title={props.member.name}
                subheader={props.member.email}
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Subscribe to a new movie</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={age}
                                    onChange={handleChange}
                                    label="Age"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Typography>
                <br/>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    startIcon={<EditIcon/>}
                >
                    Edit
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon/>}
                >
                    Delete
                </Button>
            </CardContent>

        </Card>
    );
}
