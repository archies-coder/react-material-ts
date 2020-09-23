import React, {FunctionComponent, useState} from 'react';
import {Collapse, createStyles, Drawer, Paper, Theme, Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import {NavLink} from "react-router-dom";
import {ExpandLess, ExpandMore, HomeSharp, LibraryBooks} from '@material-ui/icons'
import BusinessIcon from '@material-ui/icons/Business';
import OrganizationIcon from "./assets/icons/OrganizationIcon";
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';

const drawerWidth = 295;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: 0,
            // backgroundColor: theme.palette.primary.main,
            // height: 'inherit',
            // overflow: 'hidden'
        },
        paper: {
            height: '100%',
            width: drawerWidth,
            flexShrink: 0,
            padding: theme.spacing(0),
            textAlign: 'center',
            color: '#A6ACB8',
            backgroundColor: theme.palette.text.primary,
            // width: '295px',

            '& .MuiSvgIcon-root': {
                color: '#158594'
            },

            '& .listItem': {
                backgroundColor: theme.palette.text.primary,
                color: '#A6ACB8',
                letterSpacing: '0.5px',
            },

            '& .active-navlink': {
                backgroundImage: 'linear-gradient(to right, #2C578A, #20849C)',
                color: theme.palette.common.white,

                '& .MuiSvgIcon-root': {
                    color: theme.palette.common.white,
                }
            },

            '& .active-navlink-menuItem': {
                color: theme.palette.common.white,

            }
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
        listItemText: {
            '& > *': {
                fontWeight: 600
            }
        },

        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
    }),
);

interface OwnProps extends React.AllHTMLAttributes<any> {
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
        children?: Child[],
        name?: string
    }
}

const mappableRoutes: MappableRoutesDictionary = {
    'Home': {
        path: '/',
        icon: <HomeSharp className="white-text"/>
    },
    'Invites': {
        path: '/invites',
        icon: <PersonIcon className="white-text"/>
    },
    'Employees': {
        path: '/employees',
        icon: <OrganizationIcon className="white-text"/>
    },
    'Sales & Organization': {
        path: '/sites',
        name: 'sales',
        icon: <BusinessIcon className="white-text"/>,
        children: [{
            title: 'Sites',
            path: '/sites'
        }, {
            title: 'Check in points',
            path: '/checkinpoints'
        }, {
            title: 'organisations'
        }]
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
        name: 'settings',
        icon: <SettingsIcon className="white-text"/>,
        children: [{
            title: 'Devices',
            path: '/devices'
        }, {
            title: 'Agreement',
            path: '/agreement'
        }, {
            title: 'Visitor\'s Form',
            path: '/visitorsform'
        }, {
            title: 'Notification'
        }]
    }
}


const CustomDrawer: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const dropDownState = {
        settings: false,
        sales: false
    }

    const [open, setOpen] = useState(dropDownState)


    const handleClick = (name: string) => {
        // @ts-ignore
        const old = open[name]
        setOpen({
            ...open,
            [name]: !old
        });
    };

    return <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.paper,
            }}
            anchor="left"
        >
            <Divider />
            <Typography variant="h5" className={classes.logo} noWrap>
                Company Logo
        </Typography>
            <Divider />
            <List>
                {Object.keys(mappableRoutes).map((key, index) => (
                    mappableRoutes[key].children ? (
                        <>
                            {
                                // @ts-ignore
                                open[mappableRoutes[key].name] ?
                                    <ListItem button onClick={() => handleClick(mappableRoutes[key].name)}
                                        className="listItem active-navlink">
                                        <ListItemIcon className="white-text">{mappableRoutes[key].icon}</ListItemIcon>
                                        <ListItemText className={classes.listItemText} primary={key} />
                                        {/*@ts-ignore*/}
                                        {open[mappableRoutes[key].name] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    :
                                    <ListItem button onClick={() => handleClick(mappableRoutes[key].name)}
                                        className="listItem">
                                        <ListItemIcon className="white-text">{mappableRoutes[key].icon}</ListItemIcon>
                                        <ListItemText className={classes.listItemText} primary={key} />
                                        {/*@ts-ignore*/}
                                        {open[mappableRoutes[key].name] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                            }
                            {/*@ts-ignore*/}
                                        <Collapse in={open[mappableRoutes[key].name]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {mappableRoutes[key].children.map(child => (
                                        <ListItem
                                            key={child.title}
                                            component={NavLink}
                                            exact
                                            activeClassName={"active-navlink-menuItem"}
                                            to={child.path ? child.path : ''}
                                            button className={classes.nested}>
                                            <ListItemText className={classes.listItemText} primary={child.title} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </>
                    ) : (
                            <ListItem button key={key} component={NavLink} exact className="listItem"
                                activeClassName={"active-navlink"} to={mappableRoutes[key].path}>
                                <ListItemIcon className="white-text">{mappableRoutes[key].icon}</ListItemIcon>
                                <ListItemText className={classes.listItemText} primary={key} />
                            </ListItem>
                        )
                ))}
            </List>
        </Drawer>

        {/* <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.logo} noWrap>
                Company Logo
        </Typography>
            <Divider />
            <List>
                {Object.keys(mappableRoutes).map((key, index) => (
                    mappableRoutes[key].children ? (
                        <>
                            {
                                // @ts-ignore
                                open[mappableRoutes[key].name] ?
                                    <ListItem button onClick={() => handleClick(mappableRoutes[key].name)}
                                        className="listItem active-navlink">
                                        <ListItemIcon className="white-text">{mappableRoutes[key].icon}</ListItemIcon>
                                        <ListItemText className={classes.listItemText} primary={key} />
                                        {/*@ts-ignore*/}
        {/*{open[mappableRoutes[key].name] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    :
                                    <ListItem button onClick={() => handleClick(mappableRoutes[key].name)}
                                        className="listItem">
                                        <ListItemIcon className="white-text">{mappableRoutes[key].icon}</ListItemIcon>
                                        <ListItemText className={classes.listItemText} primary={key} />
                                        {/*@ts-ignore*/}
        {/*{open[mappableRoutes[key].name] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                            }
                            {/*@ts-ignore*/}
        {/*<Collapse in={open[mappableRoutes[key].name]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {mappableRoutes[key].children.map(child => (
                                        <ListItem
                                            key={child.title}
                                            component={NavLink}
                                            exact
                                            activeClassName={"active-navlink-menuItem"}
                                            to={child.path ? child.path : ''}
                                            button className={classes.nested}>
                                            <ListItemText className={classes.listItemText} primary={child.title} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </>
                    ) : (
                            <ListItem button key={key} component={NavLink} exact className="listItem"
                                activeClassName={"active-navlink"} to={mappableRoutes[key].path}>
                                <ListItemIcon className="white-text">{mappableRoutes[key].icon}</ListItemIcon>
                                <ListItemText className={classes.listItemText} primary={key} />
                            </ListItem>
                        )
                ))}
            </List>
        </Paper> */}
}

export default CustomDrawer;


