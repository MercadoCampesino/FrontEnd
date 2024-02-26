import "./Select.css";
export const Select = ({ label, name, options }) => {
    return (
        <label className="select-wrapper">
            {label}
            <select className="base-select" id={name} required>
                <option value="" disabled selected>{label.toLowerCase()}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
};