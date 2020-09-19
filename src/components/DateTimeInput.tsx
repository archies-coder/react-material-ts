import React, { ChangeEvent, FunctionComponent } from 'react';
import { createStyles, fade, TextField, TextFieldProps, Theme } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { DateTimePicker, DateTimePickerProps, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextInput from "components/TextInput";
interface OwnProps {
    value: string;
    id?: string;
    label: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,date: Date | null) => void;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => createStyles({

}))

const StyledDatePicker = withStyles({
    '& .MuiInput-underline:before': {
        borderBottom: 'none'
    }
})(DateTimePicker)

const DateTimeInput: FunctionComponent<any> = (props) => {
    const classes = useStyles()
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <StyledDatePicker
                //TextFieldComponent={TextInput}
                {...props}
            />

        </MuiPickersUtilsProvider>
    );
};

export default TextInput;
