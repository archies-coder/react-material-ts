import './CustomDrawer.scss'
import React, { FunctionComponent, useState } from 'react';
import { createStyles, Paper, Theme, Typography, Collapse } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { HomeOutlined, LibraryBooks, ExpandLess, ExpandMore, ChildCare } from '@material-ui/icons'
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
        },
        nested: {
            paddingLeft: theme.spacing(10),
        },
    }),
);

interface OwnProps {
}

type Props = OwnProps;

type Child = {
    title: string,
    path?: string,
    icon?: JSX.Element
}


type MappableRoutesDictionary = {
    [key: string]: {
        path: string,
        icon: JSX.Element,
        children?: Child[]
    }
}

const mappableRoutes: MappableRoutesDictionary = {
    'Home': {
        path: '/',
        icon: <HomeOutlined className="white-text" />
    },
    'Invites': {
        path: '/invites',
        icon: <PersonIcon className="white-text" />
    },
    'Employees': {
        path: '/employees',
        icon: <OrganizationIcon className="white-text" />
    },
    'Sales & Organization': {
        path: '/sales',
        icon: <BusinessIcon className="white-text" />,
        children: [{
            title: 'Sites'
        }, {
            title: 'Check in points'
        }, {
            title: 'organisations'
        }]
    },
    'Reports': {
        path: '/reports',
        icon: <LibraryBooks className="white-text" />
    },
    'User Management': {
        path: '/user',
        icon: <LibraryBooks className="white-text" />
    },
    'Settings': {
        path: '/settings',
        icon: <SettingsIcon className="white-text" />
    }
}


const CustomDrawer: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const [open, setOpen] = useState(false)


    const handleClick = () => {
        setOpen(!open);
    };

    return <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.logo} noWrap>
            Company Logo
        </Typography>
        <Divider />
        <List>
            {Object.keys(mappableRoutes).map((key, index) => (
                mappableRoutes[key].children ? (
                    <>
                        <ListItem button key={key} component={Link} to={mappableRoutes[key].path} onClick={handleClick}>
                            <ListItemIcon className="white-text">{mappableRoutes[key].icon}</ListItemIcon>
                            <ListItemText primary={key} />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {mappableRoutes[key].children.map(child => (
                                    <ListItem key={child.title} button className={classes.nested}>
                                        <ListItemText primary={child.title} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </>
                ) : (
                        <ListItem button key={key} component={Link} to={mappableRoutes[key].path}>
                            <ListItemIcon className="white-text">{mappableRoutes[key].icon}</ListItemIcon>
                            <ListItemText primary={key} />
                        </ListItem>
                    )
            ))}
        </List>
    </Paper>
}

export default CustomDrawer;
