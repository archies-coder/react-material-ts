import React, {FunctionComponent} from 'react';
import {Box, createStyles, Link, Theme, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { SpaRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'right',
            margin: '24px 20px 0 0',
            fontSize: '24px',
            fontWeight: 300,
            '& > *' : {
                color: '#192948',
            },
            '& > * + *': {
                marginLeft: theme.spacing(8),
                color: '#192948',
            },
        },
        navItem: {
            verticalAlign: 'text-bottom'
        },
        profileName: {
            verticalAlign: 'text-bottom',
            fontWeight: 600,
            marginRight: '40px'
        }
    }),
);

interface OwnProps {
}

type Props = OwnProps;

const NavigationBar: FunctionComponent<Props> = (props) => {
    const classes = useStyles()
    return (
            <Typography className={classes.root}>
                <Link href="#" variant="h6" color="textSecondary">
                    <ExitToAppIcon /> <span className={classes.navItem}>Check In</span>
                </Link>
                <Link href="#" variant="h6" color="textSecondary">
                    <PersonIcon /> <span className={classes.navItem}>Invite</span>
                </Link>
                <Link href="#" variant="h6" color="textSecondary">
                    <NotificationsActiveIcon /> <span className={classes.navItem}>Notification</span>
                </Link>
                <Link href="#" variant="h5" color="textSecondary">
                    <span className={classes.profileName}>John Doe</span>
                </Link>
            </Typography>
    );
};

export default NavigationBar;
