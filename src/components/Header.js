import { signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { addUser, removeuser } from '../utils/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { LOGO, USER_AVATAR } from '../utils/constants'

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user)
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
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44'
          src={LOGO}
          alt='logo'
      />
      <div className='flex align-middle p-2 '>
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