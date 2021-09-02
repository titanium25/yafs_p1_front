import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Rating} from "@material-ui/lab";
import SubsDAL from "../../adapters/SubsDAL";
import MemberList from "./Movie/MemberList";
import MovieDelete from "./Movie/MovieDelete";
import MovieEdit from "./Movie/MovieEdit";

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

export default function MoviesComp(props) {
    const classes = useStyles();
    const [memberList, setMemberList] = useState([])

    useEffect(async () => {
        const memberList = await SubsDAL.getMemberList(props.movie._id)
        setMemberList(memberList.data)
    }, [props.movie._id])

    const handleEdit = async (obj) => {
        const object = {
            ...props.movie,
            name: obj.name,
            rating: obj.rating,
            genres: obj.genres,
            premiered: obj.premiered
        }
        props.callBackEdit(object)
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
                        <Typography component="legend">Rating {props.movie.rating}</Typography>
                        <Rating name="rating" value={props.movie.rating} precision={0.5} readOnly/>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Genres: {props.movie.genres.toString().replaceAll(",", ", ")} <br/>
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
                        callBack={(id) => props.callBackDelete(id)}
                    />
                </CardActions>
            </Card>
            <br/>
        </div>
    );
}