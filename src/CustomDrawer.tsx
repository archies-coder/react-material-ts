import './CustomDrawer.scss'
import React, {FunctionComponent} from 'react';
import {createStyles, Paper, Theme, Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import { HomeOutlined, LibraryBooks } from '@material-ui/icons'
import BusinessIcon from '@material-ui/icons/Business';
import OrganizationIcon from "./assets/icons/OrganizationIcon";
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: 0,
            // backgroundColor: theme.palette.primary.main,
            height: 'inherit',
            overflow: 'hidden'
        },
        paper: {
            height: '100%',
            padding: theme.spacing(0),
            textAlign: 'center',
            color: '#A6ACB8',
            backgroundColor: '#192949',
        },
        fullHeight: {
            height: '100vh',
        },
        logo: {
            height: '100px',
            paddingTop: '30px',
            fontFamily: 'Poppins, sans-serif',
        }
    }),
);

interface OwnProps {
}

type Props = OwnProps;


type MappableRoutesDictionary = {
    [key: string]: {
        path: string,
        icon:  JSX.Element
    }
}

const mappableRoutes: MappableRoutesDictionary = {
    'Home': {
        path: '/',
        icon: <HomeOutlined className="white-text"/>
    },
    'Invites': {
        path: '/invites',
        icon: <PersonIcon className="white-text"/>
    },
    'Employees': {
        path: '/employees',
        icon: <OrganizationIcon className="white-text"/>
    },
    'Sales & Org': {
        path: '/sales',
        icon: <BusinessIcon className="white-text"/>
    },
    'Reports': {
        path: '/reports',
        icon: <LibraryBooks className="white-text"/>
    },
    'User Management': {
        path: '/user',
        icon: <LibraryBooks className="white-text"/>
    },
    'Settings': {
        path: '/settings',
        icon: <SettingsIcon className="white-text"/>
    }
}


const CustomDrawer: FunctionComponent<Props> = (props) => {
    const classes = useStyles()
    return <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.logo} noWrap>
            Company Logo
        </Typography>
        <Divider/>
        <List>
            {Object.keys(mappableRoutes).map((key, index) => (
                <ListItem button key={key} component={Link} to={mappableRoutes[key].path}>
                    <ListItemIcon className="white-text">{mappableRoutes[key].icon}</ListItemIcon>
                    <ListItemText primary={key}/>
                </ListItem>
            ))}
        </List>
    </Paper>
}

export default CustomDrawer;
