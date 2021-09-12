import MoviesDAL from '../adapters/MoviesDAL';
import MovieComp from '../components/Movies/MovieComp'
import Pagination from '@material-ui/lab/Pagination';
import * as React from "react";
import {useCallback, useContext, useEffect, useState} from "react";
import {Grid, TextField} from "@material-ui/core";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MovieAdd from "../components/Movies/MovieAdd";
import {UserContext} from "../context/UserContext";
import Loader from "../components/Loader";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        "& > *": {
            marginTop: theme.spacing(2),
            justifyContent: "center",
            display: 'flex'
        }
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function Movies(props) {
    const classes = useStyles();
    const [movies, setMovies] = useState([])
    const [allMovies, setAllMovies] = useState([])
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(8);
    const [total, setTotal] = useState(0)
    const [search, setSearch] = useState('')
    const [alignment, setAlignment] = useState('center');
    const [toggleRerender, setToggleRerender] = useState(false)


    useEffect(async () => {

        // Get total number of movies from the server. Needed for pagination
        let responseTotal = await MoviesDAL.getTotal()
        setTotal(responseTotal.data)

        setAllMovies(props.allMovies)

        if (search) {
            setMovies(allMovies.filter(x => x.name.toLowerCase().includes(search)))
        } else {
            // Get chunk of movies from the server
            let response = await MoviesDAL.getAllMovies(page, size)
            setMovies(response.data)
        }
    }, [page, size, search, toggleRerender])

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleAdd = async (obj) => {
        await MoviesDAL.addMovie(obj)
        props.rerenderParentCallback()
        setToggleRerender(!toggleRerender)
        setAllMovies(props.allMovies)
    }

    const handleEdit = async (obj) => {
        await MoviesDAL.editMovie(obj._id, obj)
        props.rerenderParentCallback()
        setToggleRerender(!toggleRerender)
    }

    const handleDelete = async (id) => {
        await MoviesDAL.deleteMovie(id)
        props.rerenderParentCallback()
        setToggleRerender(!toggleRerender)
    }

    return (
        <div className={classes.root}>
            <Grid
                container
                align="center"
                justifyContent="center"
                spacing={3}
                alignItems="center"
                direction="row"
            >
                <Grid item xs={12}>
                    <Typography variant="h4">Movies</Typography>

                </Grid>

                <Grid item xs>
                    <TextField
                        id="Search"
                        label="Search"
                        variant="outlined"
                        type="Search"
                        onChange={e => setSearch(e.target.value.toLowerCase())}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Pagination
                        className={classes.root}
                        variant="outlined"
                        shape="rounded"
                        count={~~(total / size)}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs>

                    <Typography variant="caption">Movies per page:</Typography>
                    <br/>
                    <ToggleButtonGroup
                        value={alignment}
                        size={'small'}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                    >
                        <ToggleButton key={1} value="left" aria-label="left aligned"
                                      onClick={() => setSize(4)}>4</ToggleButton>
                        <ToggleButton key={2} value="center" aria-label="centered"
                                      onClick={() => setSize(8)}>8</ToggleButton>
                        <ToggleButton key={3} value="right" aria-label="right aligned"
                                      onClick={() => setSize(12)}>12</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>

            <Divider/>
            <MovieAdd callBack={(obj) => handleAdd(obj)}/>
            <Divider/>

            <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                {
                    movies.map((movie, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <MovieComp
                                    key={index}
                                    movie={movie}
                                    rerenderParentCallback={() => props.rerenderParentCallback()}
                                    callBackEdit={(obj) => handleEdit(obj)}
                                    callBackDelete={(id) => handleDelete(id)}

                                />
                            </Grid>)
                    })
                }
            </Grid>
        </div>
    );
}

export default Movies;
