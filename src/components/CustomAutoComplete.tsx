import classes from '*.module.css';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { RootState } from 'app/rootReducer';
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TextInput from './TextInput';

interface Props {

}

const useStyles = makeStyles((theme: Theme) => createStyles({
    inputRoot: {
        paddingTop: '0px !important',
        paddingBottom: '0px !important',
        paddingLeft: '0px !important',
        // flexWrap: 'wrap-reverse'
    },
    labelRoot: {
        color: theme.palette.text.primary,
        fontSize: '12px'
    }
}))

export const CustomAutoComplete: React.FC<any> = (props) => {

    const classes = useStyles()

    const { value, onChange, options, label, name } = props

    const [ value1, setValue1] = React.useState(options[0]);

        return (
            <Autocomplete
                {...props}
                name={name}
                value={value1}
                onChange={(event, newValue) => {
                    setValue1(newValue);
                }}
                inputValue={value}
                onInputChange={(event, newInputValue) => {
                    onChange(newInputValue);
                }}
                options={options}
                id="custom-input-demo"
                forcePopupIcon={false}
                fullWidth={true}
                disableClearable={true}
                classes={{
                    inputRoot: classes.inputRoot
                }}

                renderInput={(params) => (
                        <TextInput
                        {...params}
                        label={label}
                        // style={{ marginTop: '33px', marginLeft: '27px' }}
                        InputLabelProps={{
                            variant: "outlined", color: 'primary', classes: {
                                // shrink: true
                                root: classes.labelRoot
                            }
                        }}
                        />

                )}
            />
        );
}