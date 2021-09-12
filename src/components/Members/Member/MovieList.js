import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
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

export default function MovieList(props) {
    const classes = useStyles();

    const handleDelete = () => {
        props.callBackDeleteMovie(props.movie.movieId)
        props.rerenderParentCallback()
    }

    return (
        <List className={classes.root} style={{backgroundColor: "#f3f3f3"}}>
            <ListItem alignItems="flex-start" button onClick={() => window.location.href='/movie/' + props.movie.movieId}>
                <ListItemAvatar>
                    <Avatar variant="square" className={classes.large} src={props.movie.image}/>
                </ListItemAvatar>
                <ListItemText
                    primary={props.movie.name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textSecondary"
                            >
                                Date: {props.movie.date.split('T')[0]}
                            </Typography>

                        </React.Fragment>
                    }
                />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={handleDelete}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li"/>

        </List>
    );
}
