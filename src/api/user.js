import supabase from "s";

/* Получение данных пользователя */
const get = async () => {

    const {user} = await supabase.auth.getUser().then(result => result.data)

    if(user){
        try{
            const {data, error} = await supabase
                .from('users')
                .select()
                .match({id: user.id})
                .single()

            if(error) throw error
            return data
        } catch (e) {
            throw(e)
        }
    }
    return null
}

/* Регистрация пользователя */
const register = async (data) => {
    const {user_name, email, password} = data

    try{
        let { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) throw error

        const {data: _user, error: _error} = await supabase
            .from('users')
            .update([{
                user_name: user_name
            }])
            .eq('email',email)
            .select()

        if(_error) throw(_error)
        return _user
    } catch (e) {
        throw (e)
    }
}

/* Авторизация пользователя */
const login = async (data) => {
    try{

        const {user, error} = await supabase.auth.signInWithPassword(data);
        if(error) throw error
        return(user)
    } catch(e){
        throw(e)
    }
}

/* Выход из системы */
const logout = async () => {
    try{
        const {error} = await supabase.auth.signOut();

        if (error) throw error

        return null
    } catch(e) {
        throw(e)
    }
}

/* Обновление данных пользователя */
const update = async (data) => {

    const {user} = await supabase.auth.getUser().then(result => result.data)

    if(!user) return

    try{
        const {data: _user, error} = await supabase
            .from('users')
            .update(data)
            .eq("id", user.id)
            .select()

        if (error) throw error

        return _user
    } catch(e) {
        throw(e)
    }
}

/* Сохранение аватара пользователя */
// Адрес хранилища
const STORAGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/`
const uploadAvatar = async (file, user) => {
    try{

        if(!file){
            return new Error('You must select an image to upload')
        }

        const {data: userData, error} = await supabase
                    .from('users')
                    .select('*')
                    .match({id: user.id})

        if(error) throw error

        const username = userData[0].user_name

        const fileExt = file.name.split('.').at(-1) // извлекаем расширение
        const fileName = `${username}.${fileExt}`
        const filePath = `${fileName}`

        const {data, error: _error} = supabase
            .storage
            .from('avatars')
            .upload(filePath, file)

        if (_error) throw _error

        const imageUrl = STORAGE_URL + `avatars/${filePath}`
        return imageUrl
    }catch(e){
        throw e
    }
}

/* Передача URL адреса аватара пользователю */
const updateAvatarUrl = async (avatarUrl, user) => {
    try{
        const {data, error} = await supabase
            .from('users')
            .update({avatar_url: avatarUrl})
            .eq('id', user.id)
            .select()

        if(error) throw error
        return data
    }catch(e){
        throw e
    }
}


const userApi = {get, register, login, update, uploadAvatar, logout, updateAvatarUrl}
export default userApi