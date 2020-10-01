import { Box, createStyles, Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import { RootState } from 'app/rootReducer';
import CustomButton from 'components/Button';
import TextInput from 'components/TextInput';
import { setCurrentEmployee, saveEmployee, defaultInputState } from './employeeSlice';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

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

const EmployeeForm: React.FC<Props> = (props) => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const {
        currentEmployee
    } = useSelector((state: RootState) => state.employees)

    const {
        designation,
        email,
        empid,
        fname,
        lname,
        mname,
        mobile
    } = currentEmployee
    const inputState = currentEmployee;

    const setInputState = (employee: any) => {
        dispatch(setCurrentEmployee(employee));
    }

    const id = props.match.params.employeeId
    // debugger;
    // useEffect(() => {
        // if (employeesById[id]) {
        //     const tempId = employeesById[id]
        //     //setInputState(tempId)
        //     dispatch(setCurrentEmployee(tempId));
        // }
    // }, [id])

    const handleChange = (e: any) => setInputState({
        ...inputState,
        [e.target.name]: e.target.value
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        let bodyFormData = new FormData();
        bodyFormData.append('fname',fname)
        bodyFormData.append('mname',mname)
        bodyFormData.append('lname',lname)
        bodyFormData.append('mobile',mobile)
        bodyFormData.append('email',email)
        bodyFormData.append('empid',empid)
        bodyFormData.append('designation',designation)

        dispatch(saveEmployee(bodyFormData, () => setInputState(defaultInputState)))
    }
    return (
        <Grid item style={{ height: '80%', width: '90%' }}>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <div className={classes.header}>
                        <ArrowBackIos className={classes.arrowBack} onClick={() => props.history.push('/employees')} />
                        <span> Add Employee </span>
                    </div>
                    <Box display="flex" justifyContent="flex-end">
                        <Box className={classes.button}>
                            <CustomButton style={{ height: '38px', width: '168px', marginTop: '1px', padding: 0 }} type="submit">Save</CustomButton>
                        </Box>
                    </Box>
                    <Grid className={classes.inputGrid} container>
                        <Grid item xs={6}>
                            {/*<div>*/}
                            <TextInput label="First Name"
                                required
                                name="fname"
                                onChange={handleChange}
                                value={fname} />
                            <TextInput label="Middle Name"
                                required
                                name="mname"
                                onChange={handleChange}
                                value={mname} />
                            <TextInput label="Last Name"
                                required
                                name="lname"
                                onChange={handleChange}
                                value={lname} />
                            <TextInput
                                required
                                label="Mobile"
                                onChange={handleChange}
                                name="mobile"
                                value={mobile} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput
                                required
                                label="Email"
                                onChange={handleChange}
                                name="email"
                                value={email} />
                            <TextInput
                                required
                                label="Employee Id"
                                onChange={handleChange}
                                name="empid"
                                value={empid} />
                            <TextInput
                                required
                                label="Designation"
                                onChange={handleChange}
                                name="designation"
                                value={designation} />
                        </Grid>
                    </Grid>
                </form>

            </Paper>
        </Grid>
    );
}

export default EmployeeForm