import React, { FunctionComponent, useEffect, useState } from 'react';
import TableWrapper from "../../components/TableWrapper";
import { Avatar, Box, createStyles, fade, Grid, Paper, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchInput from "../../components/SearchInput";
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees } from 'features/Employees/employeeSlice'
import { CustomMenuItem } from 'components/CustomMenuItem';
import { serverUrl } from 'api/Apis';
import CustomButton from 'components/Button';
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
        id: "profilepicpath",
        label: ''
    },
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
    }
]
const EmployeesView: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const [filter, setfilter] = useState("")
    const [rowPerPage, setRowPerPage] = useState(10);
    
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

    useEffect(() => {
        debugger
        dispatch(fetchEmployees(0, rowPerPage,filter))
    }, [filter])

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
            dispatch(fetchEmployees(page, count,filter))
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

                <Box display="flex" justifyContent="space-between" style={{ paddingTop: '37px', paddingLeft: '30px', paddingBottom: '25.5px'}} >
                <SearchInput onChange={(e: any) => { setfilter(e.target.value ) }} value={filter}/*style={{ margin: '0 23px 30px', paddingTop: '37px' }}*/ placeholder="Search Employees by name" width={500} />
                 {/* <SelectInput value="Action" /> */}
                    <CustomMenuItem to='/employee/add'>
                        <CustomButton style={{ width: '150px', fontSize: '12px', height: '39px', padding: 0 }}>
                            Add
                        </CustomButton>
                    </CustomMenuItem>
                </Box>
                <TableWrapper style={{ marginLeft: '54px' }} config={TableConfig} />
            </Paper>
        </Grid>
    );
};

export default EmployeesView;
