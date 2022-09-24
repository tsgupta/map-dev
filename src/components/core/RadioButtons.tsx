import React, { useCallback } from "react";

interface RadioButtonsProps {
    selectedValue: string;
    values: string[];
    onChange: (selval: string) => void;
    label: string;
    name: string;
}

export const RadioButtons: React.FC<RadioButtonsProps> = (props) => {
    const { selectedValue, values, onChange, label, name } = props;
    const onRadioChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value), [onChange]);
    return <div>
        <span className="form-label">{label}</span>
        <div>
            {values.map((v, i) => <React.Fragment key={v}>
                <input
                    name={name}
                    onChange={onRadioChange}
                    checked={selectedValue === v}
                    type="radio"
                    value={v} />
                {v}
                {i < values.length - 1 && <span style={{ marginRight: 10 }} />}
            </React.Fragment>)}
        </div>
    </div>
};
