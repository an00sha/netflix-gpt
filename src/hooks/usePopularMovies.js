import { API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addPopularMovies } from '../utils/movieSlice'
import { useEffect } from 'react';

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector(store => store.movies.popularMovies);
    const getPopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1',
        API_OPTIONS);
        const json = await data.json();
        console.log("popular", json)
        dispatch(addPopularMovies(json.results))
    }

    useEffect(() => {
        // if data is already present in store, don't make unnecessary api calls
        // this is called as memoization, 
        //useMemo will cache the result of a calculation b/w re-renders
        !popularMovies && getPopularMovies();
    }, [])
}

export default usePopularMovies;