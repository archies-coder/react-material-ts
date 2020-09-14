import React, {ChangeEvent, FunctionComponent} from 'react';
import {createStyles, fade, TextField, TextFieldProps, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface OwnProps {
    value: string;
    id?: string;
    label: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
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
        borderRadius: theme.shape.borderRadius,

        '& .MuiInputBase-root,': {
            borderRadius: theme.shape.borderRadius,
            backgroundColor: 'inherit',
            margin: theme.spacing(0, 2, 1.5, 0),
        },

        '& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after': {
            borderBottom: 'none'
        },

        '& .MuiInputBase-input': {
            padding: theme.spacing(2, 0, 2, 1),
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.common.white,
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.75),
            },
        }
    },
    input: {
        // color: 'white'
    }
}))

const TextInput: FunctionComponent<Props | TextFieldProps> = (props) => {
    const classes = useStyles()
    return (
        <TextField
            id="email"
            variant="filled"
            label="Email"
            className={classes.textField}
            value={props.value}
            onChange={props.onChange}
            margin="normal"
            InputLabelProps={{variant: "outlined"}}
            InputProps={{
                className: classes.input,
            }}
            {...props}
        />
    );
};

export default TextInput;
