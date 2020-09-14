import React, { FunctionComponent } from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Grid, Theme} from "@material-ui/core";
import NavigationBar from "./NavigationBar";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fullHeightContainer: {
            height: '100vh',
            overflow: 'auto'
        },
        nav: {
            height: '80px',
            // backgroundColor: '#eee',
            marginBottom: 0
        }
    })
)
interface OwnProps {}

type Props = OwnProps;

const NavGridContainer: FunctionComponent<Props> = (props) => {
    const classes = useStyles()
    return (
        <Grid container justify="flex-start" className={classes.fullHeightContainer}>
            <Grid item xs={12} className={classes.nav}>
                <NavigationBar />
            </Grid>
            {props.children}
        </Grid>
    );
};

export default NavGridContainer;
