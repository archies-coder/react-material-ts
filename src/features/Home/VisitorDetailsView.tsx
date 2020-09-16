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
import { VisitorInfo } from "../../api/Apis";
import { apis } from '../../api/Apis'
import Axios from 'axios';

const useStyles = makeStyles((theme: Theme) => createStyles({
    paper: {
        backgroundColor: '#E7ECF6',
        borderRadius: theme.shape.borderRadius - 5,
        marginRight: 30,
        height: '100%',
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
        padding: theme.spacing(0, 0, 2, 0),
        color: theme.palette.text.primary,
    },
    arrowBack: {
        height: '30px',
        verticalAlign: 'bottom',
        cursor: 'pointer',
    },
    imageContainer: {
        padding: theme.spacing(3, 0, 0, 8),
    },
    imageUpload: {
        position: 'relative',
        backgroundColor: '#fff',
        height: '100px',
        width: '100px',
        textAlign: 'center',
        borderRadius: theme.shape.borderRadius,
        '& > svg': {
            height: '100%',
            opacity: 0.7,
            fontSize: '44px'
        }
    },
    visitorInfo: {
        padding: theme.spacing(2, 0, 1, 8),

    },
    appointment: {
        padding: theme.spacing(1, 0, 2, 8),
    },
    rightInputs: {
        marginTop: 134,
    },
    button: {
        marginRight: 20
    },
    selectInput: {
        '& > .makeStyles-inputContainer-32': {
            // padding: 0
        }
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

const VisitorDetailsView: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const defaultInputState = {
        id: 0,
        avatar: '',
        name: '',
        mobileNo: '',
        personToMeet: '',
        purpose: '',
        inTime: '',
        outTime: '',
        type: '',
        noOfVisitors: '',
        city: '',
        email: '',
        visitorCompany: '',
        country: '',
        site: '',
        host: '',
        gender: ''
    }

    const [inputState, setInputState] = useState(defaultInputState)

    const handleChange = (e: any) => setInputState({
        ...inputState,
        [e.target.name]: e.target.value
    })

    const {
        visitors,
        visitorsById,
        isLoading: isLoadingVisitor,
        error
    } = useSelector((state: RootState) => state.visitors)


    const id = props.match.params.visitorId
    useEffect(() => {
        if (visitorsById[id]) {
            const tempId = visitorsById[id]
            setInputState(tempId)
        }
    }, [id])

    const handleSubmit = async (e: any) => {
        const {
            name,
            mobileNo,
            personToMeet,
            purpose,
            gender,
            inTime,
            outTime,
            type,
            noOfVisitors,
            city,
            email,
            visitorCompany,
            country,
            site,
            host } = inputState

        let bodyFormData = new FormData();

        bodyFormData.append('profilepic', 'arjun_pass.jpg')
        bodyFormData.append('idcard', 'arjun_pass.jpg')
        bodyFormData.append('signature', 'arjun_pass.jpg')
        bodyFormData.append('name', name)
        bodyFormData.append('mobile', mobileNo)
        bodyFormData.append('tomeet', personToMeet)
        bodyFormData.append('email', email)
        bodyFormData.append('purpose', purpose)
        bodyFormData.append('gender', gender)
        bodyFormData.append('visitorcount', noOfVisitors)
        bodyFormData.append('company', visitorCompany)
        bodyFormData.append('country', country)
        bodyFormData.append('organisation', host)
        bodyFormData.append('site', site)
        bodyFormData.append('vehicleno', "test")
        bodyFormData.append('belongings', "test")
        bodyFormData.append('idtype', 'pancard')
        bodyFormData.append('city', city)
        bodyFormData.append('answer1', "yes")
        bodyFormData.append('answer2', "yes")
        bodyFormData.append('answer3', "yes")
        bodyFormData.append('answer4', "yes")
        bodyFormData.append('answer5', "yes")
        bodyFormData.append('ndacheck', "1")
        bodyFormData.append('policycheck', "1")
        bodyFormData.append('usertype', type)
        const response = await apis.post('/product/reception/user/checkin',bodyFormData, {
            headers: {
                "Accept": "*/*",
                "Cache-Control": "no-cache",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Content-Type": "multipart/form-data",
                "Content-Length": 2617
            },
        })
    }

    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <form>
                    <div className={classes.header}>
                        <ArrowBackIos className={classes.arrowBack} onClick={() => props.history.push('/')} />
                        <span> Visitor's Details</span>
                    </div>
                    <Grid container>
                        <Grid item xs={6}>
                            <div className={classes.imageContainer}>
                                <div className={classes.imageUpload}>
                                    <CameraAlt alignmentBaseline={"central"} color={"disabled"} fontSize={"large"} />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" justifyContent="flex-end">
                                <SelectInput value="Actions" style={{ marginTop: '-15px' }}
                                    menuOptions={selectInputMenu} />
                                <Box className={classes.button}>
                                    <CustomButton onClick={handleSubmit}>Save</CustomButton>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <div className={classes.visitorInfo}>
                                <span className={classes.headerSecondary}>Visitor's information</span>
                                <Grid container style={{ marginTop: '16px' }}>
                                    <Grid item xs={6}>
                                        <TextInput label="Time In" name="inTime" value={inputState.inTime}
                                            onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextInput label="Time Out" type="text" name="outTime"
                                            value={inputState.outTime}
                                            onChange={handleChange} />
                                    </Grid>
                                </Grid>
                                <TextInput label="Visitor Name" name="name" onChange={handleChange}
                                    value={inputState.name} />
                                <TextInput label="Mobile Number" name="mobileNo" onChange={handleChange}
                                    value={inputState.mobileNo} />
                                <TextInput label="Visitor type" name="type" onChange={handleChange}
                                    value={inputState.type} />
                                <TextInput label="No. of visitors" name="noOfVisitors" onChange={handleChange}
                                    value={inputState.noOfVisitors} />
                                <TextInput label="City" name="city" onChange={handleChange}
                                    value={inputState.city} />
                            </div>
                        </Grid>
                        <Grid item xs={6} className={classes.rightInputs}>
                            <TextInput label="Gender" name="gender" onChange={handleChange}
                                value={inputState.gender} />
                            <TextInput label="Email" name="email" onChange={handleChange}
                                value={inputState.email} />
                            <TextInput label="Purpose to visit" name="purpose" onChange={handleChange}
                                value={inputState.purpose} />
                            <TextInput label="Visitor's Company" name="visitorCompany" onChange={handleChange}
                                value={inputState.visitorCompany} />
                            <TextInput label="Country / Nationality" name="country" onChange={handleChange}
                                value={inputState.country} />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <div className={classes.appointment}>
                                <span className={classes.headerSecondary}>Appointments requests</span>
                                <TextInput label="Person to Visit" name="personToMeet" style={{ marginTop: '16px' }}
                                    onChange={handleChange}
                                    value={inputState.personToMeet} />
                                <TextInput label="Site" name="site" onChange={handleChange}
                                    value={inputState.site} />
                            </div>
                        </Grid>
                        <Grid item xs={6} style={{ marginTop: '52px' }}>
                            <TextInput label="Host / Organization" name="host" onChange={handleChange}
                                value={inputState.host} />
                        </Grid>
                    </Grid>
                </form>

            </Paper>
        </Grid>
    );
};

export default VisitorDetailsView;
