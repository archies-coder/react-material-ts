import DateFnsUtils from '@date-io/date-fns';
import { Box, createStyles, Grid, Paper } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { ArrowBackIos } from "@material-ui/icons";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from 'react-router-dom';
import { createInvite } from "api/Apis";
import CustomButton from "components/Button";
import TextInput from "components/TextInput";
import { saveDevice, setCurrentDevice } from './deviceSlice';
import { RootState } from 'app/rootReducer';

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

const DeviceForm: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const defaultInputState = {
        id: Number,
        name: '',
        iosVersion: Number,
        email: '',
        udid: '',
    }

    //const [inputState, setInputState] = useState<any>(defaultInputState)
    
    const {
        devices,
        currentDevice,
        devicesById,
        error
    } = useSelector((state: RootState) => state.devices)

    const {
        devicename,
        iosversion,
        udid,
        email
    } = currentDevice 
    const inputState = currentDevice;
    const setInputState=(device:any)=>{
        dispatch(setCurrentDevice(device));
    }

    const id = props.match.params.deviceId
    debugger;
    useEffect(() => {
        if (devicesById[id]) {
            const tempId = devicesById[id]
            //setInputState(tempId)
            dispatch(setCurrentDevice(tempId));
        }
    }, [id])
    
    const handleChange = (e: any) => setInputState({
        ...inputState,
        [e.target.name]: e.target.value
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        dispatch(saveDevice(JSON.stringify({
            "devicename": devicename,
            "iosversion": iosversion,
            "email": email,
            "udid": udid
        }), () => setInputState(defaultInputState)))
    }


    return (
        <Grid item style={{ height: '80%', width: '90%' }}>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <div className={classes.header}>
                        <ArrowBackIos className={classes.arrowBack} onClick={() => props.history.push('/devices')} />
                        <span> Device details</span>
                    </div>
                    <Box display="flex" justifyContent="flex-end">
                        <Box className={classes.button}>
                            <CustomButton type="submit">Save</CustomButton>
                        </Box>
                    </Box>
                    <Grid className={classes.inputGrid} container>
                        <Grid item xs={6}>
                            {/*<div>*/}
                            <TextInput label="Device Name"
                                required
                                name="devicename"
                                onChange={handleChange}
                                value={devicename} />
                            <TextInput label="Ios Version"
                                required
                                name="iosversion"
                                onChange={handleChange}
                                value={iosversion} />
                            {/*</div>*/}
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput
                                required
                                type="email"
                                label="Email"
                                onChange={handleChange}
                                name="email"
                                value={email} />
                            <TextInput
                                required
                                label="Udid"
                                onChange={handleChange}
                                name="udid"
                                value={udid} />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6} style={{ marginTop: '52px' }}>
                        </Grid>
                    </Grid>
                </form>

            </Paper>
        </Grid>
    );
};

export default DeviceForm;
