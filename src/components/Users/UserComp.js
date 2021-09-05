import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from "@material-ui/core/styles";
import {CardActions} from "@material-ui/core";

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

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="user"
                            style={{
                                backgroundColor: props.user.color
                            }}>
                        {getInitials(props.user.name)}
                    </Avatar>
                }
                title={props.user.name}
                subheader={props.user.email}
            />
            <CardContent>
                some content
            </CardContent>
            <CardActions>
                some actions
                {/*<userEdit*/}
                {/*    user={props.user}*/}
                {/*    callBack={(obj) => props.callBackEdit(obj)}*/}
                {/*/>*/}
                {/*<userDelete*/}
                {/*    user={props.user}*/}
                {/*    callBack={(id) => props.callBackDelete(id)}*/}
                {/*/>*/}
            </CardActions>

        </Card>
    );
}
