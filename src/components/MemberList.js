import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from "@material-ui/core/Avatar";

const getInitials = (nameString) => {
    const fullName = nameString.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function MemberList(props) {
    const classes = useStyles();

    return (
        <List component="nav" className={classes.root} aria-label="members">
            {
                props.list.map((x, i) => {
                    return (
                        <ListItem key={i} button>
                            <Avatar aria-label="member"
                                    style={{
                                        backgroundColor:x.color
                                    }}>
                                {getInitials(x.name)}
                            </Avatar>
                            <ListItemText inset primary={x.name}/>
                        </ListItem>
                    )
                })
            }

        </List>
    );
}
