import useStore from 'h/useStore'

const tabs = [
    {
        name: 'All'
    },
    {
        name: 'My',
        protected: true
    },
    {
        name: 'New',
        protected: true
    }
]

const reloadTab = () => {
    window.location.reload()
}

export const PostTabs = ({tab, setTab}) => {
    const user = useStore(({user}) => ({user}))

    return (
        <nav className='post-tabs'>
            {user ? (
                <ul>
                    <li>
                        <button onClick={reloadTab}>
                            Refresh
                        </button>
                    </li>
                    {tabs.map((t) => {
                        const tabId = t.name.toLowerCase()
                        if(t.protected) {
                            return user ? (
                                <li key={tabId}>
                                    <button
                                        className={tab === tabId ? 'active' : ''}
                                        onClick={() => setTab(tabId)}
                                    >
                                        {t.name}
                                    </button>
                                </li>
                            ) : null
                        }
                        return (
                            <li key={tabId}>
                                <button className={tab === tabId ? 'active' : ''}
                                        onClick={() => setTab(tabId)}
                                >
                                    {t.name}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            ): (
                <p></p>
            )}
        </nav>
    )
}