import {UserUpdater} from 'c/UserUpdater'
import {Protected} from 'c/Protected'
import userApi from 'a/user'
import useStore from "h/useStore";
import {useEffect} from 'react'

export const Profile = () => {

    const {user, setUser} = useStore(({user, setUser}) => ({user, setUser}))

    useEffect(() => {
        userApi.get().then((r)=> {
            setUser(r)
        })
    }, [])


    return(
        <Protected className='page profile'>
            <h1>Profile</h1>
            <div className='user-data'>
                <p>Username: {user.user_name}</p>
                <p>Email: {user.email}</p>

                {user.first_name === null ? (
                    <p>First Name: not indicated</p>
                ) : (
                    <p>First Name: {user.first_name}</p>
                )}

                {user.last_name === null ? (
                    <p>Last Name: not indicated</p>
                ) : (
                    <p>Last Name: {user.last_name}</p>
                )}

                {user.age === null ? (
                    <p>Age: not indicated</p>
                ) : (
                    <p>Age: {user.age}</p>
                )}

            </div>
            <UserUpdater />
        </Protected>
    )
}