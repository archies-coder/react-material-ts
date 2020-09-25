import React, { ChangeEvent, FunctionComponent } from 'react';
import { createStyles, Theme } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { KeyboardDateTimePickerProps, MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextInput from "components/TextInput";
import { ExpandMore } from '@material-ui/icons';
interface OwnProps {
    value: string;
    id?: string;
    label: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, date: Date | null) => void;
}


const useStyles = makeStyles(() => createStyles({

}))

const StyledTextInput = withStyles({
    '& .MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd': {
        paddingTop: '8.5px',
        paddingBottom: '8.5px',
    }
})(TextInput)

const StyledDatePicker = withStyles({
    '& .MuiInput-underline:before': {
        borderBottom: 'none'
    },
    '& .MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd': {
        paddingTop: '8.5px',
        paddingBottom: '8.5px',
    }
})(KeyboardDateTimePicker)

const DateTimeInput: FunctionComponent<KeyboardDateTimePickerProps> = (props) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <StyledDatePicker
                TextFieldComponent={TextInput}
                {...props}
            />
            {/* <ExpandMore /> */}
        </MuiPickersUtilsProvider>
    );
};

export default DateTimeInput;
