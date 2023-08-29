import {Link, useNavigate} from "react-router-dom";
import useStore from "h/useStore";
import userApi from 'a/user'
import {Loader} from './Loader'

export const Nav = () => {
    const {user, loading, setUser, setLoading, setError} = useStore(({
        user, loading, setUser, setLoading, setError
    }) => ({ user, loading, setUser, setLoading, setError }))

    const navigate = useNavigate()

    const logout = () => {
        setLoading(true)
        userApi
            .logout()
            .then((user) => {
                setUser(user)
                navigate('/')
            })
            .catch(setError)
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to='/' className='nav_button'>Home</Link>
                </li>
                {user && (<li>
                    <Link to='/blog' className='nav_button'>Blog</Link>
                </li>)}
                <li>
                    <Link to='/about' className='nav_button'>About</Link>
                </li>
                {!user ? (
                    <>
                        <li>
                            <Link to='/register' className='nav_button'>Register</Link>
                        </li>
                        <li>
                            <Link to='/login' className='nav_button'>Login</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <button onClick={logout} className='logout'>Logout</button>
                        </li>
                        <li>
                            <Link to='/profile'>
                                {!user.avatar_url ? (
                                    <p className='nav_button'>{user.user_name}</p>
                                ) : (
                                    <img
                                        src={user.avatar_url}
                                        alt={user.username}
                                        className='avatar'
                                        title='Profile'
                                    />
                                )}
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}
