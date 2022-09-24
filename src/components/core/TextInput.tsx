import React, { useCallback, useState } from "react";


type InputType = "text" | "number";
type ReturnType<T extends InputType> = T extends "text" ? string : number;

interface TextInputProps<Type extends InputType> {
    label: string;
    type: Type;
    value?: string;
    onChange: (rType: ReturnType<Type>) => void;
}


export const TextInput = <T extends InputType>(props: TextInputProps<T>) => {
    const { type, value, label, onChange } = props;
    const [val, setVal] = useState<string>(value ?? "");

    const onValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        if (type === "text") {
            onChange(newValue as ReturnType<T>);
            setVal(newValue);
        } else if (/^[+-]?\d+(\.\d*)?$/.test(newValue)) {   //test for floating numbers
            setVal(newValue);
            onChange(Number.parseFloat(newValue) as ReturnType<T>);
        }
        
    }, [onChange, type]);

    return <div className="form-input-container">
        <span className="form-label">{label}</span>
        <input
            className="form-input"
            onChange={onValueChange}
            value={val}
        />
    </div>;
};
