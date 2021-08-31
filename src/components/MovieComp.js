import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Rating} from "@material-ui/lab";
import SubsDAL from "../adapters/SubsDAL";
import MemberList from "./MemberList";
import MovieDelete from "./MovieDelete";
import MovieEdit from "./MovieEdit";
import MoviesDAL from "../adapters/MoviesDAL";


const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 250,
    },
    media: {
        height: 350,
    },
    button: {
        margin: theme.spacing(1),
    },
}));


function MoviesComp(props) {

    const classes = useStyles();

    const [memberList, setMemberList] = useState([])

    useEffect(async () => {
        const memberList = await SubsDAL.getMemberList(props.movie._id)
        setMemberList(memberList.data)
    }, [props.movie._id])

    const handleEdit = async (obj) => {
        await MoviesDAL.editMovie(props.movie._id,
            {
                ...props.movie,
                name: obj.name,
                rating: obj.rating,
                genres: obj.genres,
                premiered: obj.premiered
            })
        props.rerenderParentCallback()
    }

    const handleDelete = async (id) => {
        await MoviesDAL.deleteMovie(props.movie._id)
        props.rerenderParentCallback()
    }

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
                        <Typography component="legend">Rating {props.movie.rating / 2}</Typography>
                        <Rating name="rating" value={props.movie.rating / 2} precision={0.5} readOnly/>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Genres: {props.movie.genres.toString()} <br/>
                            Premiered: {props.movie.premiered}
                        </Typography>

                        {
                            memberList &&
                            <MemberList list={memberList}/>
                        }

                    </CardContent>
                </CardActionArea>
                <CardActions>

                    <MovieEdit
                        movie={props.movie}
                        callBack={(obj) => handleEdit(obj)}
                    />

                    <MovieDelete
                        movie={props.movie}
                        callBack={(obj) => handleDelete(obj)}
                    />

                </CardActions>
            </Card>
            <br/>
        </div>
    );
}

export default MoviesComp;
