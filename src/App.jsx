import './styles/app.scss'
import {Routes, Route} from 'react-router-dom'
import {Home, About, Register, Login, Profile, Blog, Post} from 'p'
import {Nav, Layout} from 'c'
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import useStore from 'h/useStore.js'
import userApi from 'a/user.js'
import supabase from "s";

function App(){
    const navigate = useNavigate()

    const {user, setUser, setLoading, setError, fetchAllData} = useStore(
        ({user, setUser, setError, setLoading, fetchAllData}) => ({
            user, setUser, setLoading, setError, fetchAllData
        })
    )

    useEffect(() => {
        if (!user) {
            setLoading(true)
            userApi
                .get()
                .then((result) => {
                    setUser(result)
                })
            fetchAllData()
        }
    }, [])

    return (
        <div className='app'>
                <header className='header'>
                    <div>
                        <p className='logo'>Logo</p>
                    </div>
                    <Nav/>
                </header>

                <main>
                    <Layout>
                        <Routes>
                            <Route path='/' element={<Home />}/>
                            <Route path='/blog' element={<Blog />}/>
                            <Route path='/blog/post/:id' element={<Post />}/>
                            <Route path='/about' element={<About />}/>
                            <Route path='/register' element={<Register />}/>
                            <Route path='/login' element={<Login />}/>
                            <Route path='/profile' element={<Profile />}/>
                        </Routes>
                    </Layout>
                </main>
                <footer>
                    <p>&copy; 2023. Not all rights reserved</p>
                </footer>
            </div>
    )
}

export default App