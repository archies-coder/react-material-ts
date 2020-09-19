import DateFnsUtils from '@date-io/date-fns';
import { Box, createStyles, Grid, Paper } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { ArrowBackIos } from "@material-ui/icons";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice';
import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from "react-redux";
import { RouteComponentProps } from 'react-router-dom';
import { createInvite } from "api/Apis";
import CustomButton from "components/Button";
import TextInput from "components/TextInput";
import { saveDevice } from './deviceSlice';

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

    const [inputState, setInputState] = useState<any>(defaultInputState)

    const handleChange = (e: any) => setInputState({
        ...inputState,
        [e.target.name]: e.target.value
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const {
            name,
            iosVersion,
            udid,
            email,
            id
        } = inputState

        dispatch(saveDevice(JSON.stringify({
            "devicename": name,
            "iosversion": iosVersion,
            "email": email,
            "udid": udid
        }), () => setInputState(defaultInputState)))
    }

    // const {
    //     visitors,
    //     visitorsById,
    //     isLoading: isLoadingVisitor,
    //     error
    // } = useSelector((state: RootState) => state.visitors)
    //
    //
    // const id = props.match.params.visitorId
    // useEffect(() => {
    //     if (visitorsById[id]) {
    //         setInputState(visitorsById[id])
    //     }
    //     console.log(visitors, inputState)
    // }, [id])

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
                                name="name"
                                onChange={handleChange}
                                value={inputState.name} />
                            <TextInput label="Ios Version"
                                required
                                name="iosVersion"
                                onChange={handleChange}
                                value={inputState.iosVersion} />
                            {/*</div>*/}
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput
                                required
                                type="email"
                                label="Email"
                                onChange={handleChange}
                                name="email"
                                value={inputState.email} />
                            <TextInput
                                required
                                label="Udid"
                                onChange={handleChange}
                                name="udid"
                                value={inputState.udid} />
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
