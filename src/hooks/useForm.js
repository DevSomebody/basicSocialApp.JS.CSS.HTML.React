import {useState, useEffect} from 'react'

export default function useForm(initialData){
    const [data, setData] = useState(initialData)
    const [disabled, setDisabled] = useState(true)

    useEffect(()=>{
        setDisabled(!Object.values(data).every(Boolean))
    }, [data])

    const handleChange = (event) => {
        let name = event.target.id
        data[name] = event.target.value
    }

    return { data, handleChange, disabled }
}