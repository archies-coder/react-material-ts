import React from 'react'
import Container from '@material-ui/core/Container'
import {Box, createMuiTheme, createStyles, Grid, Paper, Theme} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {Switch, Route} from 'react-router-dom'
import './styles.css'
import CustomDrawer from "./CustomDrawer";
import HomeView from "./features/Home/HomeView";
import NavGridContainer from "./components/NavGridContainer";
import InviteView from "./features/Invites/InviteView";
import VisitorDetailsView from "./features/Home/VisitorDetailsView";

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
                <Grid container spacing={3}>
                    <Grid item md={2}>
                        <Box className={classes.paper}>
                            <CustomDrawer/>
                        </Box>
                    </Grid>
                    <Grid item md={10}>
                        <NavGridContainer>
                            <Switch>
                                <Route exact path="/" component={HomeView}/>
                                <Route path="/invites" component={InviteView}/>
                                <Route path="/visitor/:visitorId" component={VisitorDetailsView}/>
                            </Switch>
                        </NavGridContainer>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
