import React, {useEffect, useState} from 'react';
import MoviesDAL from "../adapters/MoviesDAL";
import Movies from "./Movies";


export default function MovieData() {

    const [movies, setMovies] = useState([])
    const [toggleRerender, setToggleRerender] = useState(false)


    useEffect(async () => {

        const response = await MoviesDAL.getAllMovies(1, 1, true)
        setMovies(response.data)
        setToggleRerender(!toggleRerender)
    }, [toggleRerender])


    return (
        <div>
            <Movies
                allMovies={movies}
                rerenderParentCallback={() => setToggleRerender(!toggleRerender)}
            />
        </div>
    )
}
