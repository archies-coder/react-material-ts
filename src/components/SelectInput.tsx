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
    root: {
        backgroundColor: '#fff',
        fontSize: '11.25px',
        position: 'absolute',
        //top: '15px',
        //left: '15px'
        height:25,
        color: theme.palette.text.primary,
    },
    inputContainer: {
        // padding: (props: Props) => props.padding ? props.padding : 15,
        marginRight: 20,
        // '& .MuiButtonBase-root.MuiListItem-root.MuiMenuItem-root.Mui-selected.MuiMenuItem-gutters.MuiListItem-gutters.MuiListItem-button.Mui-selected': {
        //     backgroundColor: '#fff',
        // },
        // '& .MuiInputBase-root.MuiInput-root, & .MuiSelect-select.MuiSelect-select, & .MuiSelect-nativeInput': {
        //     height: 'inherit'
        // },
        // '& .MuiSelect-select.MuiSelect-select': {
        //     padding: 0,
        //     borderRadius: theme.shape.borderRadius - 5,
        // },
        // '& .MuiListItem-root.Mui-selected, & .MuiListItem-root.Mui-selected:hover': {
        //     backgroundColor: 'white !important',
        //     padding: 0
        // },
        // '& .makeStyles-inputRoot-46': {
        //     backgroundColor: theme.palette.common.white,
        //     '&:hover': {
        //         backgroundColor: theme.palette.common.white,
        //     },
        // },
        // '& .MuiSelect-root, & .MuiSelect-select, & .MuiSelect-selectMenu, & .MuiInputBase-input, & .MuiInput-input': {
        //     opacity: 1,
        //     color: theme.palette.text.primary,
        // },
        // '& .MuiFormLabel-root, & .MuiInputLabel-root, & .MuiInputLabel-animated': {
        //     fontSize: '11.25px',
        //     position: 'absolute',
        //     top: '15px',
        //     left: '15px',
        //     color: theme.palette.text.primary,
        // }
    },
    nativeInput: {
        fontSize: '11.25px',
        position: 'absolute',
        top: '15px',
        left: '15px',
        alignItems: 'center',
        paddingTop: '25px!important',
        color: theme.palette.text.primary,
    },
    select: {
        //padding: 0,
        //borderRadius: theme.shape.borderRadius - 5,
        position: 'relative',
        borderRadius: theme.shape.borderRadius - 5,
        backgroundColor: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.common.white,
        },
        width: 135,
        //height: 40,
        //paddingTop: 12,
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

}))

const useMenuStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.common.white,
        padding: theme.spacing(0.5, 1),
        fontSize: '11.25px',
    },
    selected: {
        backgroundColor: theme.palette.common.white,
        padding: theme.spacing(0.5, 1),
        fontSize: '11.25px',
    },

}
))

const SelectInput: FunctionComponent<Props> = (props) => {
    const classes = useStyles(props)
    const menuClasses = useMenuStyles()
    return (
        <div className={classes.inputContainer}>
            <div {...props}>
                {/* <InputLabel id="demo-simple-select-label" style={{
                    // padding: '0 10px',
                    // position: 'absolute',
                    // top: '18px',
                    // display: 'flex',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                }}>{props.value}</InputLabel> */}
                <Select
                    classes={classes}
                    labelId="demo-simple-select-label"
                    IconComponent={ExpandMore}
                    disableUnderline
                    value={props.value}
                    onChange={props.onChange}
                    //className={classes.inputRoot}
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
                            //paper: menuClasses.menuPapaer,
                            //root: menuClasses.menuRoot
                        }
                    }}
                >
                    {
                        props.menuOptions ? [<MenuItem classes={menuClasses} key={0} value=" ">
                            <em>{props.defaultValue}</em>
                        </MenuItem>, ...props.menuOptions.map(item => <MenuItem classes={menuClasses}
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
