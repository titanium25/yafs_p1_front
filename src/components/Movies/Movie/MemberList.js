import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const getInitials = (nameString) => {
    const fullName = nameString.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
}));

export default function MemberList(props) {
    const classes = useStyles();

    return (
        <List component="nav" className={classes.root} aria-label="members">
            {
                props.list.map((member, i) => {
                    return (
                        <div key={i} >
                            <ListItem key={i} button>
                                <Avatar aria-label="member"
                                        style={{
                                            backgroundColor: member.color
                                        }}>
                                    {getInitials(member.name)}
                                </Avatar>
                                <ListItemText
                                    inset
                                    disableTypography
                                    primary={<Typography style={{fontSize: '12px'}}>{member.name}</Typography>}
                                />
                            </ListItem>
                            <Divider/>
                        </div>
                    )
                })
            }

        </List>
    );
}
