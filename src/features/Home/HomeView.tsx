import React, {FunctionComponent} from 'react';
import {Box, createStyles, Grid, Paper, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import NavGridContainer from "../../components/NavGridContainer";
import {sizing} from '@material-ui/system';
import HomeStats from "./HomeStats";
import HomeDateDropdown from "./HomeDateDropdown";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            height: '100%'
        }
    })
)

interface OwnProps {
}

type Props = OwnProps;

const HomeView: FunctionComponent<Props> = (props) => {
    const classes = useStyles()
    return (
        <>
            <Grid item xs={12} style={{height: "250px", marginTop: 0}}>
                <Paper className={classes.paper} style={{backgroundColor: "#e7ecf6"}}>
                    <HomeDateDropdown />
                    <HomeStats />
                </Paper>
            </Grid>
            <Grid item xs style={{height: "100vh", marginTop: '22px'}}>
                <Paper className={classes.paper} style={{backgroundColor: "#E7ECF6"}}>2</Paper>
            </Grid>
        </>
    );
};

export default HomeView;
