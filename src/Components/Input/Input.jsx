import "./Input.css";
export const Input = ({ type, name, placeholder, required, label }) => {
    return (
        <label className="input-base">
            {label}
            <input type={type} name={name} placeholder={placeholder} required={required} />
        </label>
    )
}