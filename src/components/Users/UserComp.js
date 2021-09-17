import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from "@material-ui/core/styles";
import {CardActions, FormControlLabel} from "@material-ui/core";
import {useState} from "react";
import UserDelete from './User/UserDelete'
import UserEdit from './User/UserEdit'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
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

    const [firstName, setFirstName] = useState(props.user.firstName)
    const [lastName, setLastName] = useState(props.user.lastName)

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar
                        aria-label="user"
                        style={{
                            backgroundColor: props.user.color
                        }}
                    >
                        {getInitials(firstName + ' ' + lastName)}
                    </Avatar>
                }
                title={firstName + ' ' + lastName}
                subheader={props.user.username}
            />
            <CardContent>
                Role: {props.user.isAdmin ? 'Admin' : 'User'} <br/>
                Status: {props.user.activated ? 'Activated' : 'Dormant'}
                {/*View movies: {props.user.state.vm ? 'true' : 'false'}*/}
            </CardContent>
            <CardActions>
                <UserEdit
                    user={props.user}
                    callBack={(obj) => props.callBackEdit(obj)}
                />
                <UserDelete
                    user={props.user}
                    callBack={(id) => props.callBackDelete(id)}
                />
            </CardActions>

        </Card>
    );
}
