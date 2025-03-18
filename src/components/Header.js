import { signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { addUser, removeuser } from '../utils/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from '../utils/constants'
import { toggleGptSearchView } from '../utils/gptSlice'
import { changeLanguage } from '../utils/configSlice'

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user)
  const showGptSearch = useSelector(store => store.gpt.showGptSearch)
  const dispatch = useDispatch();
  useEffect(() => {
    // we want this to happen only once, 
    // means If we attach this event listener once, it(firebase auth func) will detect auth changes
    // so whenever authentication changes, user sign in or sign out, we can dispatch actions here at single place
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName} = user
        dispatch(addUser({uid: uid, email: email, displayName: displayName}))
        navigate("/browse")
      } else {
        dispatch(removeuser())
        navigate("/")
      }
    })

    // unsubscribe when comp unmounts
    return () => unsubscribe()
  }, [])

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      navigate("/")
    })
  }

  const  handleGptSearchView = () => {
    dispatch(toggleGptSearchView());
  }

  const handleLangchange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44'
          src={LOGO}
          alt='logo'
      />
      <div className='flex align-middle p-2 '>
        { showGptSearch && 
          <select className='p-2 m-2 rounded-sm bg-gray-900 text-white' onChange={handleLangchange}>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>
        }
        <button
          className='py-2 px-4 mx-4 my-2 bg-red-600 rounded-lg text-white'
          onClick={handleGptSearchView}
        >
          {showGptSearch ? "Home Page" : "GPT Search"}  
        </button>
        <img className='w-7 h-7'
          src={USER_AVATAR}
          alt='user-icon'
        />
        {user && 
          <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
        }
      </div>

    </div>
  )
}

export default Header