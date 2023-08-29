import userApi from "a/user";
import {Form} from 'c/Form'
import useStore from "h/useStore";
import {useNavigate} from "react-router-dom";

const fields = [
    {
        id: 'user_name',
        label: 'Username',
        type: 'text'
    },
    {
        id: 'email',
        label: 'Email',
        type: 'email'
    },
    {
        id: 'password',
        label: 'Password',
        type: 'password'
    },
    {
        id: 'confirm_password',
        label: 'Confirm password',
        type: 'password'
    }
]

export const Register = () => {
    const {setUser, setLoading, setError} = useStore(
        ({setUser, setLoading, setError}) => ({setUser, setLoading, setError})
    )

    const navigate = useNavigate()

    const register = async (data) => {
        setLoading(true)
        userApi
            .register(data)
            .then((user) => {
                setUser(user)
            })
            .catch(setError)

        navigate('/')
    }

    return (
        <div className='page register login'>
            <h1>Register</h1>
            <Form fields={fields} submit={register} button='Register'/>
        </div>
    )
}