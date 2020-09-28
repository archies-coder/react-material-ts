import { FormControlLabel, Checkbox } from "@material-ui/core";
import React, { ChangeEvent, FunctionComponent } from "react";
import CustomCheckBox from 'components/CustomCheckBox'

type CheckBoxComponentProps = {
    isChecked: boolean,
    handleChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void,
    title: string
}

export const CheckBoxComponent: FunctionComponent<CheckBoxComponentProps> = ({isChecked, handleChange, title}) =>
<FormControlLabel
    // @ts-ignore
        control={<Checkbox checked={isChecked} onChange={handleChange} name={title}/>}
    label={title}
/>