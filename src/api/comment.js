import supabase from "s";

/* Создание комментария */
const create = async (commentData) => {
    const user = supabase.auth.getUser().then((result) => result.data)

    if (!user) return

    try{
        const {data, error} = await supabase
            .from('comments')
            .insert([{content: commentData.content, post_id: commentData.post_id}])
            .single()

        if (error) throw error
        return data
    }catch (e){
        throw e
    }
}

/* Обновление комментария */
const update = async (commentData) => {
    const {user} = supabase.auth.getUser()
    if (!user) return

    try{
        const {data, error} = await supabase
            .from('comments')
            .update([{...commentData}])
            .match({id: commentData.id, user_id: user.id})

        if(error) throw error
        return data
    }catch(e){
        throw e
    }
}

/* Удаление комментария */
const remove = async (id) => {
    const user = supabase.auth.getUser().then((result) => result.data)
    if(!user) return

    try{
        const {error} = await supabase
            .from('comments')
            .delete()
            .match({id: id})

        if(error) throw error
    } catch(e) {
        throw e
    }
}

const commentApi = {create, update, remove}
export default commentApi