import React, {FunctionComponent} from 'react';
import {Box, createStyles, Link, Theme, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'right',
            margin: '33px 60px 0 0',
            fontSize: '22px',
            fontWeight: 300,
            '& > *' : {
                color: '#192948',
            },
            '& > * + *': {
                marginLeft: theme.spacing(8),
                color: '#192948',
            },
        },
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
                    <ExitToAppIcon /> Check In
                </Link>
                <Link href="#" variant="h6" color="textSecondary">
                    <PersonIcon /> Invite
                </Link>
                <Link href="#" variant="h6" color="textSecondary">
                    <NotificationsActiveIcon /> Notification
                </Link>
                <Link href="#" variant="h5" color="textSecondary">
                    John Doe
                </Link>
            </Typography>
    );
};

export default NavigationBar;
