import React, { FunctionComponent, useEffect } from 'react';
import TableWrapper from "../../components/TableWrapper";
import { Avatar, createStyles, fade, Grid, Paper, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchInput from "../../components/SearchInput";
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees } from 'features/Employees/employeeSlice'
import { CustomMenuItem } from 'components/CustomMenuItem';
import { serverUrl } from 'api/Apis';
interface OwnProps {
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6',
            borderRadius: theme.shape.borderRadius - 5,
            marginRight: 30,
            paddingRight: 100
        },
    })
)


const data = {
    name: 'Vijaya Tondon',
    mobileNo: 9754821630,
    email: 'Vijaytandon@gmail.com',
    organization: 'Company Name'
}

//const columns = ['Visitor name', 'Mobile No.', 'Email', 'Organization']
// designation: any,//developer,
//     email: any,//arjunp@gmail.com,
//     empid: any,//002,
//     fname: any,//arjun,
//     lname: any,//pan,
//     mname: any,//test,
//     mobile: any,//1any,//2345678,
//     profilepicpath:
const columns = [

    {
        id: "fname",
        label: 'First name'
    },
    {
        id: "mname",
        label: 'Middle name'
    },
    {
        id: "lname",
        label: 'Last name'
    },
    {
        id: "mobile",
        label: 'Mobile no.'
    },
    {
        id: "email",
        label: 'Email id'
    },
    {
        id: "designation",
        label: 'Designation'
    },
    {
        id: "empid",
        label: 'Employee id'
    },
    {
        id: "profilepicpath",
        label: ''
    },]
const EmployeesView: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const {
        employees,
        currentPageEmployees,
        pageCount,
        pageLinks,
        isLoading: isLoadingEmployee,
        error
    } = useSelector((state: RootState) => state.employees)

    useEffect(() => {
        dispatch(fetchEmployees())

    }, [dispatch])


    if (error) {
        return (
            <div>
                <h1>Something went wrong...</h1>
                <div>{error.toString()}</div>
            </div>
        )
    }




    const TableConfig = {
        columns: columns,
        data: employees.map(el => ({
            ...el,
            profilepicpath: <Avatar src={serverUrl + el['profilepicpath']} />
        })),
        isLoading: isLoadingEmployee,
        pagination: true,
        pageChange: (page: number, count: number) => {
            dispatch(fetchEmployees(page, count))
        },
        totalCount: pageCount,
        //@ts-ignore
        // menuOptions: [
        //     {
        //         item: (id: any) => <CustomMenuItem to='/' onClick={() => console.log('check out ' + id)}>
        //             Check Out
        //         </CustomMenuItem>
        //     }
        // ]
    }

    return (
        <Grid item xs style={{ height: "100%" }}>
            <Paper className={classes.paper}>
                <SearchInput style={{ margin: '0 23px 30px', paddingTop: '37px' }} placeholder="Search Employees by name, email or mobile" width={500} />
                <TableWrapper style={{ marginLeft: '54px' }} config={TableConfig} />
            </Paper>
        </Grid>
    );
};

export default EmployeesView;
