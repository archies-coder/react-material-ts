import { Theme, withStyles } from "@material-ui/core";
import Button, { ButtonTypeMap } from '@material-ui/core/Button';
import React, { FunctionComponent } from 'react';

interface OwnProps extends React.AllHTMLAttributes<ButtonTypeMap> {
}

type Props = OwnProps;

const GradientButton = withStyles((theme: Theme) => ({
    root: {
        backgroundImage: 'linear-gradient(to right, #2C578A, #20849C)',
        color: theme.palette.common.white,
        fontSize: 16,
        fontWeight: 'bold',
        padding: theme.spacing(1.5, 10),
        borderRadius: 50,
        height: '56px'
    },
    inputContainer: {
        padding: 15,
        marginRight: 20,
    },
}))(Button)

const CustomButton: FunctionComponent<Props> = (props) => {

    return (
    // @ts-ignore
            <GradientButton {...props} />
    );
};

export default CustomButton;
