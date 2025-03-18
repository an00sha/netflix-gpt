import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResult } from '../utils/gptSlice'
const GptSearchBar = () => {
  const searchedText = useRef(null);
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);

  const searchMovie = async (movie) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+
      movie+
      '&include_adult=false&language=en-US&page=1', API_OPTIONS)
    const json = await data.json();
    return json.results;

  }
  const handleGPTSearchClick = async() => {
    console.log(searchedText.current.value)
    const gptQuery = "Act as a Movie Suggestion system and suggest some movies for the query : " + 
      searchedText.current.value + 
      ". Only give me names of five movies, comma separated like  the example result given ahead." +
      "Example Result: Gadar, Sholay, Pokiri, Pandem Kodi, padi padi leche manasu" 
    try {
      console.log("is this calling")
        const gptResults = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        store: true,
        messages: [
          {"role": "user", "content": gptQuery},
        ],
      })

      console.log(gptResults.choices);

      const gptMovies = gptResults.choices[0].message.content.split(',')
      // result would be array of 5 film names
      // [Gadar, Sholay, Pokiri, Pandem Kodi, padi padi leche manasu]
      // search for every movie in tmdb api
      const data = gptMovies.map(movie => searchMovie(movie))
    } catch(err) {
      console.log(err, "this is error");
      searchMovie("padi padi leche manasu")
      const movies = [ "Gadar", "kal ho naa ho", "Pokiri", "Pandem Kodi", "padi padi leche manasu"]
      const promiseArray = movies.map(movie => searchMovie(movie))
      const tmdbReuslts = await Promise.all(promiseArray)
      console.log(tmdbReuslts)
      dispatch(addGptMovieResult({movieNames: movies, movieResults: tmdbReuslts}));
    }
    
  }
  return (
    <div className='pt-[20%] flex justify-center'>
        <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
            <input
                ref={searchedText}
                type='text'
                className='p-4 m-4 col-span-9'
                placeholder={lang[langKey].gptSearchPlaceholder}
            />
            <button className='col-span-3 py-2 px-4 m-4 bg-red-700 text-white rounded-lg'
              onClick={handleGPTSearchClick}
            >
                {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar