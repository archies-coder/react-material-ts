import { FormControlLabel, Checkbox } from "@material-ui/core";
import React, { FunctionComponent } from "react";

type CheckBoxComponentProps = {
    isChecked: boolean,
    handleChange: () => void,
    title: string
}

export const CheckBoxComponent: FunctionComponent<CheckBoxComponentProps> = ({isChecked, handleChange, title}) =>
<FormControlLabel
    // @ts-ignore
    control={<Checkbox checked={isChecked} onChange={handleChange} name={title}/>}
    label={title}
/>