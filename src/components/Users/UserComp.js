import * as React from 'react';
import {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from "@material-ui/core/styles";
import SubsDAL from "../../adapters/SubsDAL";
import AddSub from './Member/AddSub'
import MemberList from './Member/MemberList'
import {CardActions, CircularProgress, IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MemberDelete from "./Member/MemberDelete";
import MemberEdit from "./Member/MemberEdit";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const getInitials = (nameString) => {
    const fullName = nameString.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
}

export default function UserComp(props) {
    const classes = useStyles();
    const [subs, setSubs] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(async () => {
        const respSubs = await SubsDAL.getSubs(props.member._id)
        setSubs(respSubs.data)
    }, [props.member._id])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSub = () => {
        setAnchorEl(null);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="member"
                            style={{
                                backgroundColor: props.member.color
                            }}>
                        {getInitials(props.member.name)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings" onClick={handleClick}>
                        <MoreVertIcon/>
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
                <AddSub id={props.member._id}/>
                <br/>
                {
                    subs.movies &&
                        subs.movies.map((movies, i) => {
                            return <MemberList key={i} movies={movies}/>
                        })
                }
            </CardContent>
            <CardActions>
                <MemberEdit
                    member={props.member}
                    callBack={(obj) => props.callBackEdit(obj)}
                />
                <MemberDelete
                    member={props.member}
                    callBack={(id) => props.callBackDelete(id)}
                />
            </CardActions>

        </Card>
    );
}
