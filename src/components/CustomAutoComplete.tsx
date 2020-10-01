import classes from '*.module.css';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
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

const filter = createFilterOptions<any>();

export const CustomAutoComplete: React.FC<any> = (props) => {

    const classes = useStyles()

    const { value, onChange, options, label, name } = props

    const [ value1, setValue1] = React.useState(options.find((o:any)=>o===value));

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
                clearOnBlur
                selectOnFocus
                handleHomeEndKeys
                filterOptions={(options: any, params: any) => {
                    const filtered = filter(options, params);
                    // Suggest the creation of a new value
                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            title: `Add "${params.inputValue}"`,
                        });
                    }
                    return filtered;
                }}
                getOptionLabel={(option: any) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    // Regular option
                    return option.title;
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