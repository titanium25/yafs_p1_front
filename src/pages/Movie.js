import * as React from "react";
import {useEffect, useState} from "react";
import MoviesDAL from "../adapters/MoviesDAL";
import {Box, Card} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {Rating} from "@material-ui/lab";
import Divider from "@material-ui/core/Divider";
import Comments from '../components/Movies/Commnets'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '60%',
        margin: "20px auto 50px",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    media: {
        margin: "20px auto 0",
        width: "50%",
        height: "80%",
        borderRadius: "10px",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
        position: "relative",
        zIndex: 1000
    },
    content: {
        textAlign: "left",
        padding: theme.spacing.unit * 3
    },
    divider: {
        margin: `${theme.spacing.unit * 3}px 0`
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8,
        textAlign: ''
    }
}));

function Movie(props) {
    const classes = useStyles();
    const {match: {params}} = props;
    const {id} = params;

    const [movie, setMovie] = useState()

    useEffect(async () => {
        const respMovie = await MoviesDAL.getMovie(id)
        setMovie(respMovie.data)
    }, [])

    return (
        <div>
            {
                movie &&
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        component="img"
                        image={movie.image.original}
                        alt="cover"
                    />
                    <CardContent className={classes.content}>
                        <Typography
                            gutterBottom
                            variant="h3"
                            component="div"
                            className={"MuiTypography--heading"}
                        >
                            {movie.name}
                        </Typography>
                        <Divider className={classes.divider} light/>

                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">Rating {movie.rating}</Typography>
                            <Rating name="read-only" value={movie.rating} readOnly/>

                        </Box>
                        Genres: {movie.genres.toString().replaceAll(",", ", ")} <br/>
                        Premiered: {movie.premiered} <br/>
                        Language: {movie.language} <br/>
                        Official site: <a href={movie.officialSite} target="_blank">{movie.officialSite}</a>
                        <Divider className={classes.divider} light/>
                        <Typography variant="body2" color="text.secondary">
                            <div dangerouslySetInnerHTML={{__html: movie.summary}}/>
                        </Typography>
                        <Divider className={classes.divider} light/>

                        <Typography variant="h6" color="text.secondary">
                        Comments
                        </Typography>

                        {
                            movie.comments.map((c,i) => {
                                return <Comments key={i} comments={c}/>

                            })
                        }

                    </CardContent>
                </Card>
            }
        </div>
    );
}

export default Movie;
