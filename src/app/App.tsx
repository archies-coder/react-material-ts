import { Backdrop, Box, CircularProgress, createStyles, Grid, Theme } from "@material-ui/core"
import Container from '@material-ui/core/Container'
import { makeStyles } from "@material-ui/core/styles"
import { AuthRoute } from 'app/AuthRoute'
import NavGridContainer from "components/NavGridContainer"
import CustomDrawer from "CustomDrawer"
import SignIn from 'features/auth/SignIn'
import SignUp from 'features/auth/SignUp'
import EmployeesView from "features/Employees/EmployeesView"
import HomeView from "features/Home/HomeView"
import VisitorDetailsView from "features/Home/VisitorDetailsView"
import InviteForm from "features/Invites/InviteForm"
import InviteView from "features/Invites/InviteView"
import CheckInPointsView from "features/SalesAndOrganisation/CheckInPointsView"
import SitesView from "features/SalesAndOrganisation/SitesView"
import AgreementView from "features/Settings/AgreementView"
import DeviceForm from "features/Settings/DeviceForm"
import DevicesView from "features/Settings/DevicesView"
import UserManagementView from "features/UserManagement/UserManagementView"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { RootState } from './rootReducer'
import {outhUser,setAuthUser} from 'features/auth/AuthSlice'
import './styles.css'


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
            // height: '100%',
            // overflow: 'auto'
        },
        paper: {
            height: '100%',
            padding: theme.spacing(0),
            textAlign: 'center',
            backgroundColor: '#192949',
            overflowY: 'scroll'
        },
        fullHeight: {
            // height: '100vh',
        }
    }),
);

export default function App() {
    const classes = useStyles();

    const dispatch = useDispatch()

    const {isLoggedIn} = useSelector((state: RootState) => state.auth)
    const { mask } = useSelector((state: RootState) => state.backdrop)

    if (!isLoggedIn) {
        debugger
        //localStorage.loginRedirect = rest.location.pathname
        const user = sessionStorage.getItem('authUser');
        
        if(user){
            JSON.parse(user)
            //outhUser(JSON.parse(user));
            dispatch(setAuthUser(JSON.parse(user)))
        }else{
            //return <Redirect to="/signin" />
        }
    }

    const Routes = <Box>
        <Backdrop className={classes.backdrop} open={mask}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <Container maxWidth={"xl"} className={classes.root}>
            <Grid container spacing={3} className={classes.fullHeightContainer}>
                <Grid item md={2} >
                    <Box className={classes.paper}>
                        <CustomDrawer/>
                    </Box>
                </Grid>
                <Grid item md={10}>
                    <NavGridContainer>
                        <Switch>
                            <Redirect from='/signin' to='/'/>
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
            <AuthRoute exact path="/" component={HomeView} />
            <AuthRoute exact path="/invites" component={InviteView} />
            <AuthRoute exact path="/visitor" component={VisitorDetailsView} />
            <AuthRoute exact path="/visitor/:visitorId" component={VisitorDetailsView} />
            <AuthRoute exact path="/employees" component={EmployeesView} />
            <AuthRoute exact path="/sites" component={SitesView} />
            <AuthRoute exact path="/checkinpoints" component={CheckInPointsView} />
            <AuthRoute exact path="/devices" component={DevicesView} />
            <AuthRoute exact path="/agreement" component={AgreementView} />
            <AuthRoute exact path="/invites/visitor" component={InviteForm} />
            <AuthRoute exact path="/devices/device" component={DeviceForm} />
            <AuthRoute exact path="/devices/device/:deviceId" component={DeviceForm} />
            <AuthRoute exact path="/user" component={UserManagementView} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
        </Switch>
    </Box>

    return isLoggedIn ? Routes : AuthRoutes
}
