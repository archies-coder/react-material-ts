import { Box, createStyles, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { ArrowBackIos } from "@material-ui/icons";
// import { saveSite, setCurrentSite } from './siteSlice';
import { RootState } from 'app/rootReducer';
import CustomButton from "components/Button";
import TextInput from "components/TextInput";
import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from 'react-router-dom';
import { defaultInputState, saveSite, setCurrentSite } from './siteSlice';

const useStyles = makeStyles((theme: Theme) => createStyles({
    paper: {
        backgroundColor: '#E7ECF6',
        borderRadius: theme.shape.borderRadius - 5,
        marginRight: 30,
        height: '100%',
        width: '100%'
        // marginTop
    },
    header: {
        fontSize: '22px',
        fontWeight: 'bold',
        padding: theme.spacing(2, 0, 0, 4),
        color: theme.palette.text.primary
    },
    headerSecondary: {
        fontSize: '20px',
        fontWeight: 'bold',
        padding: theme.spacing(0, 0, 4, 0),
        color: theme.palette.text.primary,
    },
    arrowBack: {
        height: '30px',
        verticalAlign: 'bottom',
        cursor: 'pointer',
    },
    rightInputs: {
        marginTop: 134,
    },
    button: {
        marginRight: 20
    },
    inputGrid: {
        marginTop: '30px',
        padding: theme.spacing(1, 0, 0, 2)
    }
}))

interface OwnProps extends RouteComponentProps<any> {
}

type Props = OwnProps;

const SiteForm: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const {
        sites,
        currentSite,
        sitesById,
        error
    } = useSelector((state: RootState) => state.sites)

    const {
        sitename,
        address,
        checkinpoint,
    } = currentSite
    const inputState = currentSite;

    const setInputState = (site: any) => {
        dispatch(setCurrentSite(site));
    }

    const id = props.match.params.siteId
    // debugger;
    useEffect(() => {
        // if (sitesById[id]) {
        //     const tempId = sitesById[id]
        //     //setInputState(tempId)
        //     dispatch(setCurrentSite(tempId));
        // }
    }, [id])

    const handleChange = (e: any) => setInputState({
        ...inputState,
        [e.target.name]: e.target.value
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        dispatch(saveSite(JSON.stringify({
            "sitename": sitename,
            "address": address,
            "checkinpoint": checkinpoint
        }), () => setInputState(defaultInputState)))
    }


    return (
        <Grid item xs={12} style={{ marginRight: 30 }}>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <div className={classes.header}>
                        <ArrowBackIos className={classes.arrowBack} onClick={() => props.history.push('/sites')} />
                        <span> Site details</span>
                    </div>
                    <Box display="flex" justifyContent="flex-end">
                        <Box className={classes.button}>
                            <CustomButton style={{ height: '45px', width: '168px', marginTop: '1px', padding: 0 }} type="submit">Save</CustomButton>
                        </Box>
                    </Box>
                    <Grid className={classes.inputGrid} container>
                        <Grid item xs={6}>
                            {/*<div>*/}
                            <TextInput label="Site Name"
                                required
                                name="sitename"
                                onChange={handleChange}
                                value={sitename} />
                            <TextInput
                                required
                                label="Checkin Point"
                                onChange={handleChange}
                                name="checkinpoint"
                                value={checkinpoint} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput
                                required
                                label="Address"
                                onChange={handleChange}
                                name="address"
                                value={address} />
                        </Grid>
                    </Grid>
                </form>

            </Paper>
        </Grid>
    );
};

export default SiteForm;
