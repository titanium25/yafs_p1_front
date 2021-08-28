import MoviesDAL from '../adapters/MoviesDAL';
import MovieComp from '../components/MovieComp'
import Pagination from '@material-ui/lab/Pagination';
import {useEffect, useState} from "react";
import {Grid, TextField} from "@material-ui/core";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";



function Movies() {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(8);
    const [total, setTotal] = useState(0)
    const [search, setSearch] = useState('')
    const [alignment, setAlignment] = useState('center');

    useEffect(async () => {

        // Get total number of movies from the server. Needed for pagination
        let responseTotal = await MoviesDAL.getTotal()
        setTotal(responseTotal.data)


        if (search) {
            let response = await MoviesDAL.getAllMovies(page, size, true)
            setMovies(response.data.filter(x => x.name.toLowerCase().includes(search)))
        } else {
            // Get chunk of movies from the server
            let response = await MoviesDAL.getAllMovies(page, size)
            setMovies(response.data)
        }
    }, [page, size, search])

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };


    return (
        <div
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh'
            }}>
            <h1>Movies</h1>
            <br/>
            <TextField
                id="Search"
                label="Search"
                variant="outlined"
                onChange={e => setSearch(e.target.value.toLowerCase())}
            />

            {
                search.length > 0 ||
                <div>

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
                    <br/> <br/>
                    <Pagination variant="outlined" shape="rounded" count={~~(total / size)} onChange={handleChange}/>

                </div>

            }
            <br/>
            <br/>
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
                                <MovieComp key={index} movie={movie}/>
                            </Grid>)
                    })
                }
            </Grid>

        </div>
    );
}

export default Movies;
