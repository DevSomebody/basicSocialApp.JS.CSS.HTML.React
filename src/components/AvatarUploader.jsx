import {useState, useEffect} from "react";
import userApi from "a/user";
import useStore from "h/useStore";
import {Loader} from "c/Loader";
import {useNavigate} from "react-router-dom";

export const AvatarUploader = () => {
    const navigate = useNavigate()
    const {user, setUser, setLoader, setError, fetchAllData, avatarUrl, setAvatarUrl} = useStore(
        ({user, setUser, setLoader, setError, fetchAllData, avatarUrl, setAvatarUrl}) => ({
            user,
            setUser,
            setLoader,
            setError,
            fetchAllData,
            avatarUrl,
            setAvatarUrl
        })
    )

    const [file, setFile] = useState({})

    const upload = async () => {
        userApi
            .get()
            .then((result) => setUser(result))

        userApi
            .uploadAvatar(file, user)
            .then((result) => {
                setAvatarUrl(result)
            })
            .catch(setError)

        userApi
            .updateAvatarUrl(avatarUrl, user)
            .catch(setError)

        fetchAllData()
        navigate('/profile')
    }

    return (
        <div className='avatar-uploader'>
            <form className='avatar-uploader' onSubmit={upload}>
                {user.avatar_url ? (
                        <img
                            src={user.avatar_url}
                            alt={user.username}
                            className='avatar'
                            title='Avatar'
                        />
                ) : (
                    <p>Avatar not found</p>
                )}
                <div className='input-file'>
                    <input type='file' accept='image/*' id='input_avatar'
                           onChange={(e) => {
                               setFile(e.target.files[0])
                               let inp = document.getElementById('input_avatar_btn')
                               inp.textContent = 'Avatar is selected'
                           }}
                    />
                    <span className='inpit-file-btn' id='input_avatar_btn'>Select file</span>

                </div>
                <button type='submit'>Upload</button>
            </form>
        </div>
    )
}