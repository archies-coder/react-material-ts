import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import { Backdrop, Box, CircularProgress, createMuiTheme, createStyles, Grid, Paper, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Switch, Route } from 'react-router-dom'
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
import { RootState } from './rootReducer'
import { useSelector } from 'react-redux'
import DeviceForm from "../features/Settings/DeviceForm";
import SignIn from 'features/auth/SignIn'
import SignUp from 'features/auth/SignUp'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: 0,
            // backgroundColor: theme.palette.primary.main,
            height: 'inherit',
            overflow: 'hidden'
        },
        backdrop: {
            zIndex: 10000,
            color: theme.palette.primary.main,
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
            // height: '100vh',
        }
    }),
);

export default function App() {
    const classes = useStyles();

    const [isLoggedIn, setIsLoggedIn] = useState(true)

    const { mask } = useSelector((state: RootState) => state.backdrop)

    const Routes = <Box>
        <Backdrop className={classes.backdrop} open={mask}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <Container maxWidth={"xl"} className={classes.root}>
            <Grid container spacing={3} className={classes.fullHeightContainer}>
                <Grid item md={2}>
                    <Box className={classes.paper}>
                        <CustomDrawer />
                    </Box>
                </Grid>
                <Grid item md={10}>
                    <NavGridContainer>
                        <Switch>
                            <Route exact path="/" component={HomeView} />
                            <Route exact path="/invites" component={InviteView} />
                            <Route exact path="/visitor" component={VisitorDetailsView} />
                            <Route path="/visitor/:visitorId" component={VisitorDetailsView} />
                            <Route path="/employees" component={EmployeesView} />
                            <Route path="/sites" component={SitesView} />
                            <Route path="/checkinpoints" component={CheckInPointsView} />
                            <Route exact path="/devices" component={DevicesView} />
                            <Route path="/agreement" component={AgreementView} />
                            <Route path="/invites/visitor" component={InviteForm} />
                            <Route exact path="/devices/device" component={DeviceForm} />
                            <Route path="/devices/device/:deviceId" component={DeviceForm} />
                            <Route path="/user" component={UserManagementView} />
                        </Switch>
                    </NavGridContainer>
                </Grid>
            </Grid>
        </Container>
    </Box>

    const AuthRoutes = <Box>
        <Backdrop className={classes.backdrop} open={mask}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
        </Switch>
    </Box>

    // @ts-ignore
    return isLoggedIn ? Routes : AuthRoutes
}
