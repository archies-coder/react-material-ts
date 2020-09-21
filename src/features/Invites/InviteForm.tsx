import DateFnsUtils from '@date-io/date-fns';
import { Box, createStyles, Grid, Paper } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { ArrowBackIos } from "@material-ui/icons";
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice';
import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from "react-redux";
import { RouteComponentProps } from 'react-router-dom';
import { createInvite } from "../../api/Apis";
import CustomButton from "../../components/Button";
import TextInput from "../../components/TextInput";
import DateTimeInput from 'components/DateTimeInput'
import { saveInvite } from 'features/Invites/inviteSlice'
const useStyles = makeStyles((theme: Theme) => createStyles({
    paper: {
        backgroundColor: '#E7ECF6',
        borderRadius: theme.shape.borderRadius - 5,
        marginRight: 30,
        height: '100%',
        // marginTop
    },
    datePicker: {
        '& .MuiInput-underline:before': {
            borderBottom: 'none'
        }
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

const StyledDatePicker = withStyles({
    '& .MuiInput-underline:before': {
        borderBottom: 'none'
    }
})(DateTimePicker)

interface OwnProps extends RouteComponentProps<any> {
}

type Props = OwnProps;

const InviteForm: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const defaultInputState = {
        id: Number,
        time: new Date(),
        name: '',
        mobileNo: Number,
        personToMeet: '',
        purpose: '',
        email: '',
    }

    const [inputState, setInputState] = useState<any>({
        //id: Number,
        time: new Date(),
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
    const handleDateChange = (date: Date | null) => setInputState({
        ...inputState,
        'time': date
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const {
            name,
            mobileNo,
            personToMeet,
            purpose,
            email,
            time } = inputState

        dispatch(saveInvite(JSON.stringify({
            "name": name,
            "mobile": mobileNo,
            "email": email,
            "tomeet": personToMeet,
            "purpose": purpose,
            "scheduletime": new Date(time).toLocaleString()
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
        <Grid item style={{ height: '100%' }}>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <div className={classes.header}>
                        <ArrowBackIos className={classes.arrowBack} onClick={() => props.history.push('/')} />
                        <span> Invitee's Details</span>
                    </div>
                    <Box display="flex" justifyContent="flex-end">
                        <Box className={classes.button}>
                            <CustomButton type="submit">Save</CustomButton>
                        </Box>
                    </Box>
                    <Grid className={classes.inputGrid} container>
                        <Grid item xs={6}>
                            <div>
                                <DateTimeInput
                                    disableToolbar
                                    label="Schedule Time"
                                    disablePast
                                    format="dd-MM-yyyy hh:mm a"
                                    mask="__-__-____ __:__ _"
                                    margin="normal"
                                    id="date-picker-inline"
                                    autoOk
                                    value={inputState.time}
                                    onError={console.log}
                                    onChange={(val) => { handleDateChange(val) }}
                                />


                                <TextInput label="Visitor Name"
                                    required
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
                                required
                                label="Email"
                                onChange={handleChange}
                                name="email"
                                value={inputState.email} />
                            <TextInput
                                required
                                label="Person To Meet"
                                onChange={handleChange}
                                name="personToMeet"
                                value={inputState.personToMeet} />
                            <TextInput
                                required
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
