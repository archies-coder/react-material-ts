import React, {FunctionComponent, useEffect} from 'react';
import TableWrapper from "../../components/TableWrapper";
import {createStyles, fade, Grid, Paper, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchInput from "../../components/SearchInput";
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees } from 'features/Employees/employeeSlice'
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
const columns = [
    {
        id: "profilePicPath",
        label: '',
    },
    {
        id: "name",
        label: 'Visitor name'
    },
    {
        id: "mobile",
        label: 'Mobile No.'
    },
    {
        id: "tomeet",
        label: 'Email'
    },
    {
        id: "purpose",
        label: 'Organization'
    }]
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

    let tableRows: any = []

    for (let i = 0; i < 10; i++) {
        let copy: any = tableRows

        tableRows = [data, ...copy]
    }


    const TableConfig = {
        columns: columns,
        data: employees,
        menuOptions: [{
            title: 'View Details',
            path: "/visitor/" + 2
        }, {
            title: 'Delete'
        }]
    }

    return (
        <Grid item xs style={{height: "100%", marginTop: '22px'}}>
            <Paper className={classes.paper}>
            <SearchInput placeholder="Search Employees by name, email or mobile" width={500}/>
                <TableWrapper config={TableConfig}/>
            </Paper>
        </Grid>
    );
};

export default EmployeesView;
