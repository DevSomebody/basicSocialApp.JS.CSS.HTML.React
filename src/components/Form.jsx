import useForm from 'h/useForm'
import {Field} from './Field'

export const Form = ({fields, submit, button}) => {

    const initialData = fields.reduce((o,f) => {
        o[f.id] = f.value || ''
        return o
    }, {})

    const {data, handleChange, disabled} = useForm(initialData)

    const onSubmit = (e) => {
        //if (disabled) return
        e.preventDefault()
        submit(data)
    }

    return (
        <form onSubmit={onSubmit}>
            {fields.map((f, i) => (
                <Field {...f} value={data[f.id]} change={handleChange} key={i}/>
            ))}
            <button className='success' type='submit'>
                {button}
            </button>
        </form>
    )
}