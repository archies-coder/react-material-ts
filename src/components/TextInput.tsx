import React, {ChangeEvent, FunctionComponent} from 'react';
import {createStyles, fade, TextField, TextFieldProps, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface OwnProps {
    value: string;
    id?: string;
    label: string;
    onChange: any;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => createStyles({
    textField: {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500,
        backgroundColor: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius -5,
        // marginBottom: '17px',

        '& .MuiInputBase-root.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-formControl.MuiInputBase-marginDense.MuiFilledInput-marginDense': {
            height: '36px',
            '& input': {
                padding: '10px',
                borderRadius: theme.shape.borderRadius - 5
            }
        },

        '& .MuiInputBase-root,': {
            borderRadius: theme.shape.borderRadius,
            backgroundColor: 'inherit',
            margin: theme.spacing(0, 2, 1.5, 0),
        },

        '& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after, & .MuiInput-underline:before, & .MuiInput-underline:after': {
            borderBottom: 'none !important'
        },

        '& .MuiInputBase-input': {
            padding: theme.spacing(2, 0, 2, 1),
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.common.white,
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.75),
            },
        },
        '& .MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-marginDense.MuiInputLabel-outlined': {
            color: theme.palette.text.primary,
            fontSize: '12px'
        }
    },
    input: {
        // color: 'white'
        // fontSize: '12px'
    }
}))

const TextInput: FunctionComponent<any> = (props) => {
    const classes = useStyles()
    return (
        <TextField
            // id="email"
            variant="filled"
            // label="Email"
            className={classes.textField}
            value={props.value}
            onChange={props.onChange}
            margin="dense"
            InputLabelProps={{variant: "outlined", color: 'primary', classes: {
                // shrink: true
            }}}
            InputProps={{
                className: classes.input,
                color: 'primary '
            }}
            {...props}
        />
    );
};

export default TextInput;
