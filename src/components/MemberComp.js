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
import {useEffect, useState} from "react";
import SubsDAL from "../adapters/SubsDAL";
import MoviesDAL from "../adapters/MoviesDAL";

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



export default function MemberComp(props) {

    const [dropDown, setDropDown] = useState([])
    const [subs, setSubs] = useState([])


    useEffect(async () => {

        const response = await MoviesDAL.getDropDown(props.member._id)
        const respSubs = await SubsDAL.getSubs(props.member._id)


        setDropDown(response.data)
        setSubs(respSubs.data)
    },[props.member._id])

    const handleChange = async (event) => {
        let obj = {
            memberId: props.member._id,
            movieId: event.target.value,
            date: new Date().toString()
        }
        await SubsDAL.addSubs(obj)
    };


    const classes = useStyles();
    return (
        <Card sx={{maxWidth: 100}}>
            <CardHeader
                avatar={
                    <Avatar aria-label="member"
                            style={{
                                backgroundColor: props.color
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
                                <InputLabel id="Movie">Movie</InputLabel>
                                <Select
                                    labelId="Movie"
                                    id="Movie"
                                    value={dropDown}
                                    onChange={handleChange}
                                    label="Movie"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        dropDown.map((movie, index) => {
                                            return(
                                                <MenuItem value={movie._id}>{movie.name}</MenuItem>
                                            )
                                        })
                                    }

                                </Select>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    { subs &&
                        subs.movies.map((s,i) => {
                            return <div key={i}>{s.movieId}</div>
                        })
                    }

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
