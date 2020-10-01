import { Box, createStyles, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { ArrowBackIos } from "@material-ui/icons";
// import { saveCheckInPoint, setCurrentCheckInPoint } from './checkInPointSlice';
import { RootState } from 'app/rootReducer';
import CustomButton from "components/Button";
import TextInput from "components/TextInput";
import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from 'react-router-dom';
import { defaultInputState, saveCheckInPoint, setCurrentCheckInPoint } from './checkInPointSlice';

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

const CheckInPointForm: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const {
        checkInPoints,
        currentCheckInPoint,
        checkInPointsById,
        error
    } = useSelector((state: RootState) => state.checkinpoints)

    const {
        sitename,
        device,
        checkinpoint,
    } = currentCheckInPoint
    const inputState = currentCheckInPoint;

    const setInputState = (checkInPoint: any) => {
        dispatch(setCurrentCheckInPoint(checkInPoint));
    }

    // const id = props.match.params.checkInPointId
    // // debugger;
    // useEffect(() => {
    //     // if (checkInPointsById[id]) {
    //     //     const tempId = checkInPointsById[id]
    //     //     //setInputState(tempId)
    //     //     dispatch(setCurrentCheckInPoint(tempId));
    //     // }
    // }, [id])

    const handleChange = (e: any) => setInputState({
        ...inputState,
        [e.target.name]: e.target.value
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        dispatch(saveCheckInPoint(JSON.stringify({
            "sitename": sitename,
            "device": device,
            "checkinpoint": checkinpoint
        }), () => setInputState(defaultInputState)))
    }


    return (
        <Grid item style={{ height: '80%', width: '90%' }}>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <div className={classes.header}>
                        <ArrowBackIos className={classes.arrowBack} onClick={() => props.history.push('/checkInPoints')} />
                        <span> Add Check in point</span>
                    </div>
                    <Box display="flex" justifyContent="flex-end">
                        <Box className={classes.button}>
                            <CustomButton style={{ height: '45px', width: '168px', marginTop: '1px', padding: 0 }} type="submit">Save</CustomButton>
                        </Box>
                    </Box>
                    <Grid className={classes.inputGrid} container>
                        <Grid item xs={6}>
                            {/*<div>*/}
                            <TextInput label="CheckInPoint Name"
                                required
                                name="sitename"
                                onChange={handleChange}
                                value={sitename} />
                            <TextInput
                                required
                                label="Check in Point"
                                onChange={handleChange}
                                name="checkinpoint"
                                value={checkinpoint} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput
                                required
                                label="Device"
                                onChange={handleChange}
                                name="device"
                                value={device} />
                        </Grid>
                    </Grid>
                </form>

            </Paper>
        </Grid>
    );
};

export default CheckInPointForm;
