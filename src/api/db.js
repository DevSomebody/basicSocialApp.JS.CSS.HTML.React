import supabase from 's'

async function fetchAllData(){
    try{
        /* Пользователи */
        const {data: users} = await supabase
            .from('users')
            .select('id, email, user_name')
        /* Посты */
        const {data: posts} = await supabase
            .from('posts')
            .select('id, title, content, user_id, created_at')
        /* Комменты */
        const {data: comments } = await supabase
            .from('comments')
            .select('id, content, user_id, post_id, created_at')
        return {users, posts, comments}
    } catch (e) {
        console.error(e)
    }
}

async function fetchAllPosts(){
    try{
        const {data: posts} = await supabase
            .from('posts')
            .select('id, title, content, user_id, created_at')
    }catch(e){
        console.log(e)
    }
}

const dbApi = {fetchAllData, fetchAllPosts}
export default dbApi