export const Field = ({ label, value, change, id, type, ...rest}) => (

    <div className='input-box'>
        <input
            type={type}
            id={id}
            name={name}
            required
            defaultValue={value}
            onChange={change}
            {...rest}
        />
        <label htmlFor={id}>{label}</label>
    </div>
)