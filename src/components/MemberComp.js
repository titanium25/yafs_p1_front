import * as React from 'react';
import {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import SubsDAL from "../adapters/SubsDAL";
import MoviesDAL from "../adapters/MoviesDAL";
import AddMovieToSub from './AddMovieToSub'
import MovieSubsList from './MovieSubsList'
import {IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';

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

    const classes = useStyles();
    const [dropDown, setDropDown] = useState([])
    const [subs, setSubs] = useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(async () => {
        const respMovies = await MoviesDAL.getDropDown(props.member._id)
        const respSubs = await SubsDAL.getSubs(props.member._id)
        setDropDown(respMovies.data)
        setSubs(respSubs.data)
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSub = () => {
        setAnchorEl(null);
        // return <AddMovieToSub list={dropDown} id={props.member._id} />

    };

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
                action={
                    <IconButton aria-label="settings" onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.member.name}
                subheader={props.member.email}
            />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleSub}>Subscribe</MenuItem>
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
            <CardContent>
                <AddMovieToSub list={dropDown} id={props.member._id} />

                <Typography variant="body2" color="text.secondary">
                    {
                        subs.movies &&
                        subs.movies.map((m, i) => {
                            return <MovieSubsList key={i} movies={m} />
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
