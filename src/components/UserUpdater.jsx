import {Form} from 'c/Form'
import {AvatarUploader} from 'c/AvatarUploader'
import useStore from "h/useStore";
import userApi from 'a/user'

export const UserUpdater = () => {
    const {user, setUser, setLoading, setError, fetchAllData} = useStore(
        ({user, setUser, setLoading, setError, fetchAllData}) => ({
            user,
            setUser,
            setLoading,
            setError,
            fetchAllData
        })
    )

    const updateUser = async (data) => {
        setLoading(true)
        userApi
            .update(data)
            .then((result) => {
                setUser(result)
            })
            .catch(setError)

        fetchAllData()
    }

    const fields = [
        {
            id: 'first_name',
            label: 'First name',
            type: 'text',
            value: user.first_name
        },
        {
            id: 'last_name',
            label: 'Last name',
            type: 'text',
            value: user.last_name
        },
        {
            id: 'age',
            label: 'Age',
            type: 'text',
            value: user.age
        }
    ]

    return (
        <div className='user-updater'>
            <h2>Update User</h2>
            <AvatarUploader />
            <h3>User Bio</h3>
            <div className='updater_user_input'>
                <Form fields={fields} submit={updateUser} button='Update'/>
            </div>
        </div>
    )
}