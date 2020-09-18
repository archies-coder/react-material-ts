import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, createStyles, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { ArrowBackIos, CameraAlt } from "@material-ui/icons";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import CustomButton from "../../components/Button";
import { BrowserRouterProps, Redirect, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { apis, VisitorInfo } from "../../api/Apis";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme: Theme) => createStyles({
    paper: {
        backgroundColor: '#E7ECF6',
        borderRadius: theme.shape.borderRadius - 5,
        marginRight: 30,
        height: '100vh',
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

const selectInputMenu = [{
    title: 'Check Out'
}, {
    title: 'Alert'
}, {
    title: 'Delete'
}]

interface OwnProps extends RouteComponentProps<any> {
}

type Props = OwnProps;

const InviteForm: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const defaultInputState = {
        id: Number,
        time: new Date().toLocaleString(),
        name: '',
        mobileNo: Number,
        personToMeet: '',
        purpose: '',
        email: '',
    }

    const [inputState, setInputState] = useState<any>({
        //id: Number,
        time: new Date().toJSON(),
        name: '',
        mobileNo: '',
        personToMeet: '',
        purpose: '',
        email: '',
    })

    const handleChange = (e: any) => setInputState({
        ...inputState,
        [e.target.name]: e.target.value
    })
    const handleDateChange = (date: Date | null) =>  setInputState({
        ...inputState,
        'time': date
    })
    const handleSubmit = async (e: any) => {
        const {
            name,
            mobileNo,
            personToMeet,
            purpose,
            email,
            time } = inputState

        const response = await apis.post('/product/reception/user/invite', JSON.stringify({
            "name": name,
            "mobile": mobileNo,
            "email": email,
            "tomeet": personToMeet,
            "purpose": purpose,
            "scheduletime": time.toLocaleString()
        }), {
            headers: {
                "Content-Type": "application/json",
                // "Content-Length": 2617
            },
        })
        if (response) setInputState(defaultInputState)
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
        <Grid item style={{ height: '100%' }}>
            <Paper className={classes.paper}>
                <form>
                    <div className={classes.header}>
                        <ArrowBackIos className={classes.arrowBack} onClick={() => props.history.push('/')} />
                        <span> Invitee's Details</span>
                    </div>
                    <Box display="flex" justifyContent="flex-end">
                        <Box className={classes.button}>
                            <CustomButton onClick={handleSubmit}>Save</CustomButton>
                        </Box>
                    </Box>
                    <Grid className={classes.inputGrid} container>
                        <Grid item xs={6}>
                            <div>
                                {/* <TextInput label="Schedule Time"
                                   type="datetime-local"
                                    name="time"
                                    value={inputState.time}
                                    defaultValue={inputState.time}
                                    onChange={handleChange} /> */}
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                    <KeyboardDateTimePicker
                                        disableToolbar
                                        label="Schedule Time"
                                        //variant="inline"
                                        inputVariant="outlined"
                                        //format="MMM dd, yyyy "
                                        margin="normal"
                                        id="date-picker-inline"
                                        autoOk
                                        value={inputState.time}
                                        onChange={handleDateChange}

                                    // KeyboardButtonProps={{
                                    //     'aria-label': 'change date',
                                    //     edge: 'start'
                                    // }}
                                    />

                                </MuiPickersUtilsProvider>
                                <TextInput label="Visitor Name"
                                    name="name"
                                    onChange={handleChange}
                                    value={inputState.name} />
                                <TextInput label="Mobile Number"
                                    name="mobileNo"
                                    onChange={handleChange}
                                    value={inputState.mobileNo} />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput
                                label="Email"
                                onChange={handleChange}
                                name="email"
                                value={inputState.email} />
                            <TextInput
                                label="Person To Meet"
                                onChange={handleChange}
                                name="personToMeet"
                                value={inputState.personToMeet} />
                            <TextInput
                                label="Purpose to visit"
                                name="purpose"
                                onChange={handleChange}
                                value={inputState.purpose} />
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

export default InviteForm;
