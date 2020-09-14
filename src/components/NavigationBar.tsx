import React, {FunctionComponent} from 'react';
import {createStyles, Link, Theme, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import {Link as NavLink} from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'right',
            margin: '24px 20px 0 0',
            fontSize: '24px',
            fontWeight: 300,
            '& > *': {
                color: theme.palette.text.primary,
            },
            '& > * + *': {
                marginLeft: theme.spacing(8),
                color: theme.palette.text.primary,
            },
        },
        navLink: {
            color: theme.palette.text.primary,
            textDecoration: 'none'
        },
        navItem: {
            verticalAlign: 'text-bottom',
            color: theme.palette.text.primary,
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
            <Link variant="h6" color="textSecondary">
                <NavLink to="/visitor" className={classes.navLink}>
                    <ExitToAppIcon/> <span className={classes.navItem}>Check In</span>
                </NavLink>
            </Link>
            <Link variant="h6" color="textSecondary">
                <NavLink to="/invites/visitor" className={classes.navLink}>
                    <PersonIcon/> <span className={classes.navItem}>Invite</span>
                </NavLink>
            </Link>
            <Link href="#" variant="h6" color="textSecondary">
                <NotificationsActiveIcon/> <span className={classes.navItem}>Notification</span>
            </Link>
            <Link href="#" variant="h5" color="textSecondary">
                <span className={classes.profileName}>John Doe</span>
            </Link>
        </Typography>
    );
};

export default NavigationBar;
