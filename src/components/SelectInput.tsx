import React, { FunctionComponent } from 'react';
import { createStyles, fade, InputLabel, MenuItem, Select, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../theme";
import { RouteComponentProps } from "react-router-dom";
import { ExpandMore } from '@material-ui/icons';

interface IMenuOptions {
    title: string;
}

interface OwnProps extends React.HTMLAttributes<any> {
    value: string;
    padding?: number;
    menuOptions?: IMenuOptions[];
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => createStyles({
    inputContainer: {
        // padding: (props: Props) => props.padding ? props.padding : 15,
        marginRight: 20,
        '& .MuiButtonBase-root.MuiListItem-root.MuiMenuItem-root.Mui-selected.MuiMenuItem-gutters.MuiListItem-gutters.MuiListItem-button.Mui-selected': {
            backgroundColor: '#fff',
        },
        '& .MuiInputBase-root.MuiInput-root, & .MuiSelect-select.MuiSelect-select, & .MuiSelect-nativeInput': {
            height: 'inherit'
        },
        '& .MuiSelect-select.MuiSelect-select': {
            padding: 0,
            borderRadius: theme.shape.borderRadius - 5,
        },
        '& .MuiListItem-root.Mui-selected, & .MuiListItem-root.Mui-selected:hover': {
            backgroundColor: 'white !important',
            padding: 0
        },
        // '& .makeStyles-inputRoot-46': {
        //     backgroundColor: theme.palette.common.white,
        //     '&:hover': {
        //         backgroundColor: theme.palette.common.white,
        //     },
        // },
        '& .MuiSelect-root, & .MuiSelect-select, & .MuiSelect-selectMenu, & .MuiInputBase-input, & .MuiInput-input': {
            opacity: 1,
            color: theme.palette.text.primary,
        },
        '& .MuiFormLabel-root, & .MuiInputLabel-root, & .MuiInputLabel-animated': {
            fontSize: '11.25px',
            position: 'absolute',
            top: '15px',
            left: '15px',
            color: theme.palette.text.primary,
        }
    },
    select: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius - 5,
        backgroundColor: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.common.white,
        },
        width: '135px',
        height: '40px',
        // padding: '12px'
        '& .MuiSvgIcon-root': {
            position: 'absolute',
            top: '7px',
            right: '15px',
        }
    },
    inputRoot: {
        // color: '#000',

        // backgroundColor: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius - 5,
        // backgroundColor: theme.palette.common.white,
        // '&:hover': {
        //     backgroundColor: theme.palette.common.white,
        // },
    },
    menuItem: {
        backgroundColor: theme.palette.common.white,
        fontSize: '11.25px',
    },
    menuPapaer: {
        backgroundColor: theme.palette.common.white,
        fontSize: '11.25px',
        '& .MuiListItem-root.Mui-selected, & .MuiListItem-root.Mui-selected:hover': {
            backgroundColor: 'white !important',
            padding: theme.spacing(0.5, 1),
            fontSize: '11.25px',
        },
    },
    menuRoot: {
        // backgroundColor: theme.palette.common.white,
        fontSize: '11.25px',

    },
}))

const SelectInput: FunctionComponent<Props> = (props) => {
    const classes = useStyles(props)
    return (
        <div className={classes.inputContainer}>
            <div className={classes.select} {...props}>
                <InputLabel id="demo-simple-select-label" style={{
                    // padding: '0 10px',
                    // position: 'absolute',
                    // top: '18px',
                    // display: 'flex',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                }}>{props.value}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    IconComponent={ExpandMore}
                    disableUnderline
                    value=''
                    onChange={props.onChange}
                    className={classes.inputRoot}
                    style={{
                        borderBottom: 'none',
                        // padding: '12px',
                        width: '100%'
                    }}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right"
                        },
                        transformOrigin: {
                            vertical: "top",
                            horizontal: "right"
                        },
                        getContentAnchorEl: null,
                        PopoverClasses: {
                            paper: classes.menuPapaer,
                            root: classes.menuRoot
                        }
                    }}
                >
                    {
                        props.menuOptions ? [<MenuItem value="">
                        <em>{props.defaultValue}</em>
                      </MenuItem>,...props.menuOptions.map(item => <MenuItem className={classes.menuItem}
                            value={item.title}
                            key={item.title}
                        >{item.title}</MenuItem>)] : <MenuItem>1</MenuItem>
                    }
                </Select>
            </div>
        </div>
    );
};

export default SelectInput;
