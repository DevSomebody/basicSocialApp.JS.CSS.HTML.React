import supabase from "s";

/* Создание поста */
const create = async (postData) => {
    const {user} = await supabase.auth.getUser().then(result => result.data)

    if(!user) return

    try{
        const {data, error} = await supabase
            .from('posts')
            .insert([
                {title: postData.title, content: postData.content},
            ])
            .single()

        if(error) throw error
        return data
    } catch(e) {
        throw e
    }
}

/* Добавление поста */
const update = async (postData) => {
    const {user} = await supabase.auth.getUser().then(result => result.data)

    if(!user) return

    try{
        const {data: _data, error} = await supabase
            .from('posts')
            .update({title: postData.title, content: postData.content})
            .match({id: postData.id, user_id: user.id})

        if(error) throw error
        return _data
    } catch(e) {
        throw e
    }
}

/* Удаление поста */
const remove = async (id) => {
    const user = supabase.auth.getUser().then((result)=>result.data)

    if (!user) return

    try{
        const {error} = await supabase
            .from('posts')
            .delete()
            .eq('id', id)

        if(error) throw error

        const {error: _error} = await supabase
            .from('comments')
            .delete()
            .eq('post_id', id)

        if(_error) throw _error

        const {data: posts, error: __error} = await supabase
            .from('posts')
            .select('id, title, content, user_id, created_at')

        if(_error) throw __error
        return posts
    } catch(e) {
        throw e
    }
}

const postApi = {create, remove, update}
export default postApi