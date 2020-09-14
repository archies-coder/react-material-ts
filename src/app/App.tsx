import React from 'react'
import Container from '@material-ui/core/Container'
import {Box, createMuiTheme, createStyles, Grid, Paper, Theme} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {Switch, Route} from 'react-router-dom'
import './styles.css'
import HomeView from "../features/Home/HomeView";
import InviteView from "../features/Invites/InviteView";
import VisitorDetailsView from "../features/Home/VisitorDetailsView";
import EmployeesView from "../features/Employees/EmployeesView";
import SitesView from "../features/SalesAndOrganisation/SitesView";
import CheckInPointsView from "../features/SalesAndOrganisation/CheckInPointsView";
import DevicesView from "../features/Settings/DevicesView";
import AgreementView from "../features/Settings/AgreementView";
import NavGridContainer from "../components/NavGridContainer";
import CustomDrawer from "../CustomDrawer";
import InviteForm from "../features/Invites/InviteForm";
import UserManagementView from "../features/UserManagement/UserManagementView";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: 0,
            // backgroundColor: theme.palette.primary.main,
            height: 'inherit',
            overflow: 'hidden'
        },
        fullHeightContainer: {
            height: '100%',
            // overflow: 'auto'
        },
        paper: {
            height: '100%',
            padding: theme.spacing(0),
            textAlign: 'center',
            backgroundColor: '#192949',
        },
        fullHeight: {
            height: '100vh',
        }
    }),
);

export default function App() {
    const classes = useStyles();

    // @ts-ignore
    return (
        <Box height="100vh">
            <Container maxWidth={"xl"} className={classes.root}>
                <Grid container spacing={3} className={classes.fullHeightContainer}>
                    <Grid item md={2}>
                        <Box className={classes.paper}>
                            <CustomDrawer/>
                        </Box>
                    </Grid>
                    <Grid item md={10}>
                        <NavGridContainer>
                            <Switch>
                                <Route exact path="/" component={HomeView}/>
                                <Route exact path="/invites" component={InviteView}/>
                                <Route exact path="/visitor" component={VisitorDetailsView}/>
                                <Route path="/visitor/:visitorId" component={VisitorDetailsView}/>
                                <Route path="/employees" component={EmployeesView}/>
                                <Route path="/sites" component={SitesView}/>
                                <Route path="/checkinpoints" component={CheckInPointsView}/>
                                <Route path="/devices" component={DevicesView}/>
                                <Route path="/agreement" component={AgreementView}/>
                                <Route path="/invites/visitor" component={InviteForm}/>
                                <Route path="/user" component={UserManagementView}/>
                            </Switch>
                        </NavGridContainer>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
