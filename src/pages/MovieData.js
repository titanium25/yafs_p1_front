import {useEffect, useState} from "react";
import MoviesDAL from "../adapters/MoviesDAL";
import Movies from "./Movies";


export default function MovieData() {

    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(8);

    const [toggleRerender, setToggleRerender] = useState(false)


    useEffect(async () => {

        const response = await MoviesDAL.getAllMovies(page, size, true)
        setMovies(response.data)

    }, [])


    return (
        <div>
            <Movies
                allMovies={movies}
                rerenderParentCallback={() => setToggleRerender(!toggleRerender)}
            />
        </div>
    )
}
