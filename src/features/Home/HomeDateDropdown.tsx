import React, { FunctionComponent } from 'react';
import EventIcon from '@material-ui/icons/Event';
import { Box, createStyles, Theme, Typography, FormControl, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface OwnProps {
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'inline-block',
      // marginTop: '15px',
      margin: '15px 0 0 15px'
    },
    icon: {
      '& > *': {
        fontSize: '45px',
        color: '#192949',
        paddingTop: '20px'
      },
    },
    date: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#192949',
      letterSpacing: '0.5px',
      marginTop: '-25px',
      verticalAlign: 'super'
    },
    expandIcon: {
        '& > *': {
            fontSize: '35px',
            marginTop: '10px',
            verticalAlign: 'bottom'
        }
    }
  })
)

const HomeDateDropdown: FunctionComponent<Props> = (props) => {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <span className={classes.icon}><EventIcon /></span>
      <span className={classes.date}>June 23, 2020</span>
      <span className={classes.expandIcon}><ExpandMoreIcon /></span>
    </Box>
  );
};

export default HomeDateDropdown;
