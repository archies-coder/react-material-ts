import { Box, createStyles, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { ArrowBackIos, CameraAlt } from "@material-ui/icons";
import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice';
import { setCurrentVisitor, defaultVisitor } from 'features/Home/visitorSlice';
import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from 'react-router-dom';
import { apis, serverUrl } from '../../api/Apis';
import { RootState } from "../../app/rootReducer";
import CustomButton from "../../components/Button";
import SelectInput from "../../components/SelectInput";
import TextInput from "../../components/TextInput";
import { config as VisitorFormConfig } from 'features/Settings/VisitorFormConfig';
import { fetchVisitorConfigs } from "features/Settings/visitorConfigSlice";
import img from 'assets/logo/logo.png'

const useStyles = makeStyles((theme: Theme) => createStyles({
    paper: {
        backgroundColor: '#E7ECF6',
        borderRadius: theme.shape.borderRadius - 5,
        marginRight: 20,
        height: '100%',
    },
    header: {
        fontSize: '20px',
        fontWeight: 'bold',
        padding: theme.spacing(2, 0, 0, 4),
        color: theme.palette.text.primary
    },
    headerSecondary: {
        fontSize: '18.75px',
        fontWeight: 'bold',
        padding: theme.spacing(0, 0, 2, 0),
        color: theme.palette.text.primary,
    },
    arrowBack: {
        height: '16px',
        // verticalAlign: 'bottom',
        cursor: 'pointer',
    },
    imageContainer: {
        padding: theme.spacing(3, 0, 0, 8),
    },
    imageUpload: {
        position: 'relative',
        backgroundColor: '#fff',
        height: 86,
        width: 86,
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
        marginTop: 117,
    },
    button: {
        // marginRight: 20
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
}]


interface OwnProps extends RouteComponentProps<any> {
}

type Props = OwnProps;

const VisitorDetailsView: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const dispatch = useDispatch()
    const {
        visitorConfigsById,
        isLoading,
        error: configError
    } = useSelector((state: RootState) => state.visitorConfig)
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

    //const [inputState, setInputState] = useState(defaultInputState)
    const handleChange = (e: any) => {
        dispatch(setCurrentVisitor({
            ...currentVisitor,
            [e.target.name]: e.target.value
        }));

    }

    const {
        visitors,
        visitorsById,
        currentVisitor,
        isLoading: isLoadingVisitor,
        error
    } = useSelector((state: RootState) => state.visitors)
    //const inputState = currentVisitor
    const {
        mask
    } = useSelector((state: RootState) => state.backdrop)

    const {
        answer1,
        answer3,
        answer4,
        answer5,
        belongings,
        checkin_id,
        city,
        company,
        country,
        email,
        gender,
        idCardImagePath,
        idtype,
        intime,
        mobile,
        name,
        ndastatus,
        noofvisitor,
        organisation,
        outime,
        policycheckstatus,
        profilePicPath,
        purpose,
        signaturePath,
        site,
        tomeet,
        usertype,
        answer2,
        vehicleno
    } = currentVisitor
    const id = props.match.params.visitorId
    useEffect(() => {
        // debugger
        id != -1 && dispatch(setCurrentVisitor(visitorsById[id] || defaultVisitor));
    }, [id])

    const handleSubmit = async (e: any) => {
        dispatch(getBackdropStart())
        let bodyFormData = new FormData();
        bodyFormData.append('profilepic', 'arjun_pass.jpg')
        bodyFormData.append('idcard', 'arjun_pass.jpg')
        bodyFormData.append('signature', 'arjun_pass.jpg')
        bodyFormData.append('name', name)
        bodyFormData.append('mobile', mobile)
        bodyFormData.append('tomeet', tomeet)
        bodyFormData.append('email', email)
        bodyFormData.append('purpose', purpose)
        bodyFormData.append('gender', gender)
        bodyFormData.append('visitorcount', noofvisitor)
        bodyFormData.append('company', company)
        bodyFormData.append('country', country)
        bodyFormData.append('organisation', organisation)
        bodyFormData.append('site', site)
        bodyFormData.append('vehicleno', vehicleno)
        bodyFormData.append('belongings', belongings)
        bodyFormData.append('idtype', idtype)
        bodyFormData.append('city', city)
        bodyFormData.append('answer1', answer1)
        bodyFormData.append('answer2', answer2)
        bodyFormData.append('answer3', answer3)
        bodyFormData.append('answer4', answer4)
        bodyFormData.append('answer5', answer5)
        bodyFormData.append('ndacheck', ndastatus)
        bodyFormData.append('policycheck', policycheckstatus)
        bodyFormData.append('usertype', usertype)
        await apis.post('/product/reception/user/checkin', bodyFormData, {
            headers: {
                "Accept": "*/*",
                "Cache-Control": "no-cache",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Content-Type": "multipart/form-data",
                "Content-Length": 2617
            },
        })
            .then(() => dispatch(getBackdropStop())).catch(() => dispatch(getBackdropStop()))
    }

    const visitorSectionFields = VisitorFormConfig.filter(i => i.section === "VI" && visitorConfigsById[i.id] && visitorConfigsById[i.id].value).map((o, i) => (
        <Grid item xs={6}
            // style={{ marginLeft: '52px' }}
            key={o.id}>
            {/* {(o.render && o.render(notificationById[i], handleChange, i + "-" + o.key)) || obj[o.key]} */}
            {/* <TextInput style={{ width: 446, marginLeft: '64px' }} label={o.name} name={o.id} onChange={handleChange}
                //@ts-ignore
                value={currentVisitor[o.id]} /> */}
            <TextInput style={i % 2 === 0 ? { width: 446, marginLeft: '64px' } : { width: 446, marginLeft: '28px' }} label={o.name} name={o.id} onChange={handleChange}
                //@ts-ignore
                value={currentVisitor[o.id]} />
        </Grid>
    ))
    const appointmentSectionFields = VisitorFormConfig.filter(i => i.section === "AR" && visitorConfigsById[i.id] && visitorConfigsById[i.id].value).map((o, i) => (
        <Grid item xs={6}
            // style={{ marginTop: '52px' }}
            key={o.id}>
            {/* {(o.render && o.render(notificationById[i], handleChange, i + "-" + o.key)) || obj[o.key]} */}
            <TextInput style={i % 2 === 0 ? { width: 446, marginLeft: '64px' } : { width: 446, marginLeft: '28px' }} label={o.name} name={o.id} onChange={handleChange}
                //@ts-ignore
                value={currentVisitor[o.id]} />
        </Grid>
    ))

    useEffect(() => {
        //dispatch(fetchVisitorConfigs())
    }, [dispatch])
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
                            <Box display="flex">
                                <Box p={1} flexGrow={1} className={classes.imageContainer}>
                                    <div className={classes.imageUpload}>
                                        {profilePicPath ?
                                            <img height={85} width={85} src={serverUrl + profilePicPath} />
                                         :
                                         <CameraAlt alignmentBaseline={"central"} color={"disabled"} fontSize={"large"} />}
                                    </div>
                                </Box>
                                <Box p={1} flexGrow={1} className={classes.imageContainer}>
                                    <div className={classes.imageUpload}>
                                        {idCardImagePath ?
                                            <img height={85} width={85} src={serverUrl + idCardImagePath} />
                                            :
                                            <CameraAlt alignmentBaseline={"central"} color={"disabled"} fontSize={"large"} />}
                                    </div>
                                </Box>
                                <Box p={1} flexGrow={1} className={classes.imageContainer}>
                                    <div className={classes.imageUpload}>
                                        {signaturePath || true ?
                                            <img height={85} width={85} src={serverUrl + signaturePath} />
                                            :
                                            <CameraAlt alignmentBaseline={"central"} color={"disabled"} fontSize={"large"} />}
                                    </div>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" justifyContent="flex-end" style={{ position: 'relative', top: '32px', right: '86px' }}>
                                <SelectInput value="Actions" width={147} style={{ height: '45px' }}
                                    menuOptions={selectInputMenu} />
                                <Box className={classes.button}>
                                    <CustomButton style={{ height: '38px', width: '168px', marginTop: '1px' }} onClick={handleSubmit}>Save</CustomButton>
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
                                        <TextInput label="Time In" name="intime" value={intime}
                                            onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextInput label="Time Out" type="text" name="outime"
                                            value={outime}
                                            onChange={handleChange} />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={6}></Grid>
                        {visitorSectionFields}
                        {/* <Grid item xs={6} className={classes.rightInputs}>
                            <TextInput label="Gender" name="gender" onChange={handleChange}
                                value={gender} />
                            <TextInput label="Email" name="email" onChange={handleChange}
                                value={email} />
                            <TextInput label="Purpose to visit" name="purpose" onChange={handleChange}
                                value={purpose} />
                            <TextInput label="Visitor's Company" name="company" onChange={handleChange}
                                value={company} />
                            <TextInput label="Country / Nationality" name="country" onChange={handleChange}
                                value={country} />
                        </Grid> */}
                    </Grid>
                    <Grid container style={{ width: '1020px' }}>
                        <Grid item xs={6}>
                            <div className={classes.appointment}>
                                <span className={classes.headerSecondary}>Appointments requests</span>
                                {/* <TextInput label="Person to Visit" name="tomeet" style={{ marginTop: '16px' }}
                                    onChange={handleChange}
                                    value={tomeet} />
                                <TextInput label="Site" name="site" onChange={handleChange}
                                    value={site} /> */}
                            </div>
                        </Grid>
                        {/* <Grid item xs={6} style={{ marginTop: '52px' }}>
                            <TextInput label="Host / Organization" name="organisation" onChange={handleChange}
                                value={organisation} />
                        </Grid> */}
                        <Grid item xs={6}></Grid>
                        {appointmentSectionFields}
                    </Grid>
                </form>

            </Paper>
        </Grid>
    );
};

export default VisitorDetailsView;
