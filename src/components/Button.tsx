import React, { FunctionComponent } from 'react';
import {Theme, withStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button'

interface OwnProps {}

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
    }
}))(Button)

const CustomButton: FunctionComponent<Props> = (props) => {

  return (
    <GradientButton {...props} />
  );
};

export default CustomButton;
