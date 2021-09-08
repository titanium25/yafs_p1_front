import * as React from "react";
import {useEffect, useState} from "react";
import MoviesDAL from "../adapters/MoviesDAL";
import {AppBar, Box, Card, Tab, Tabs} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {Rating} from "@material-ui/lab";
import Divider from "@material-ui/core/Divider";
import Review from '../components/Movie/Review'
import AddReview from "../components/Movie/AddReview";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    card: {
        maxWidth: '700px',
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

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Movie(props) {
    const classes = useStyles();
    const {match: {params}} = props;
    const {id} = params;

    const [movie, setMovie] = useState()
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(async () => {
        const respMovie = await MoviesDAL.getMovie(id)
        setMovie(respMovie.data)
    }, [])

    return (
        <div>
            {
                movie &&
                <Card className={classes.card}>

                    <CardContent className={classes.content}>
                        <AppBar position="static">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="tabs"
                            >
                                <Tab label="Summary" {...a11yProps(0)} />
                                <Tab label="Reviews" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>

                        <TabPanel value={value} index={0}>
                            <CardMedia
                                className={classes.media}
                                component="img"
                                image={movie.image.original}
                                alt="cover"
                            />
                            <br/>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="div"
                                className={"MuiTypography--heading"}
                            >
                                {movie.name}, {movie.premiered.substring(0, 4)}
                            </Typography>
                            <Divider className={classes.divider} light/>

                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend">Rating {movie.rating}</Typography>
                                <Rating name="read-only" value={movie.rating} readOnly/>

                            </Box>
                            Genres: {movie.genres.toString().replaceAll(",", "/ ")} <br/>
                            Premiered: {movie.premiered} <br/>
                            Language: {movie.language} <br/>
                            Official site: <a href={movie.officialSite} target="_blank">{movie.officialSite}</a>
                            <Divider className={classes.divider} light/>

                            <Typography variant="body2" color="text.secondary">
                                <div dangerouslySetInnerHTML={{__html: movie.summary}}/>
                            </Typography>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {
                                movie.comments.map((c, i) => {
                                    return <Review key={i} comments={c}/>

                                })
                            }
                            <AddReview/>

                        </TabPanel>

                    </CardContent>
                </Card>
            }

        </div>
    );
}

export default Movie;
