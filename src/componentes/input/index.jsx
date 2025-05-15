export default function Input({id,name,texto,type,value, onBlur,required,onChange,onClick}){
    return(
        <div>
            <label className={name}>{texto}</label>
            <input 
            type={type}
            id={id}
            name={name}
            value={value} 
            onBlur={onBlur} 
            onChange={onChange}
            onClick={onClick}
            required={required}/>
         </div>
    )

}