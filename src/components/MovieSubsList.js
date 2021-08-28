import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {IconButton, ListItemSecondaryAction} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '50ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    large: {
    width: theme.spacing(6),
    height: theme.spacing(8),
},
}));

export default function MovieSubsList(props) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            <ListItem alignItems="flex-start" button>
                <ListItemAvatar>
                    <Avatar variant="square" className={classes.large} src={props.movies.image} />
                </ListItemAvatar>
                <ListItemText
                    primary={props.movies.name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Date: {props.movies.date.split('T')[0]}
                            </Typography>

                        </React.Fragment>
                    }
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />

        </List>
    );
}
