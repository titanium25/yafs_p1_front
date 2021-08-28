import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Rating} from "@material-ui/lab";
import SubsDAL from "../adapters/SubsDAL";
import MemberList from "./MemberList";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MovieDelete from "./MovieDelete";


const useStyles = makeStyles(theme =>({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 350,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

function MoviesComp(props) {

    const [memberList, setMemberList] = useState([])

    useEffect(async () => {
        const memberList = await SubsDAL.getMemberList(props.movie._id)
        setMemberList(memberList.data)
    },[props.movie._id])

    const classes = useStyles();

    return (
        <div>
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.movie.image.medium}
                    title={props.movie.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.movie.name}
                    </Typography>
                    <Typography component="legend">Rating {props.movie.rating/2}</Typography>
                    <Rating name="read-only" value={props.movie.rating/2} precision={0.5} readOnly />
                    <Typography variant="body2" color="textSecondary" component="p">
                        Genres: {props.movie.genres.toString()} <br/>
                        Premiered: {props.movie.premiered}
                    </Typography>

                    {
                        memberList &&
                        <MemberList list={memberList} />
                    }

                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    startIcon={<EditIcon/>}
                >
                    Edit
                </Button>

                <MovieDelete movie={props.movie} />
            </CardActions>
        </Card>
            <br/>
        </div>
    );
}

export default MoviesComp;
