import React from "react";

interface ButtonProps {
    label: string;
    onClick: () => void;
}

export const Button: React.FC<ButtonProps> =({label, onClick}) =>
    <input className="box-button" type="button" value={label} onClick={onClick} />
;
