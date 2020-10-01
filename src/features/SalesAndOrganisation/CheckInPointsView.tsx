import React, { FunctionComponent, useEffect } from 'react';
import {Box, createStyles, Grid, Paper, Theme} from "@material-ui/core";
import SearchInput from "../../components/SearchInput";
import TableWrapper from "../../components/TableWrapper";
import {makeStyles} from "@material-ui/core/styles";
import SelectInput from "../../components/SelectInput";
import { CustomMenuItem } from 'components/CustomMenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { fetchCheckInPoints } from './checkInPointSlice';
import CustomButton from 'components/Button';

interface OwnProps {}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6',
            borderRadius: theme.shape.borderRadius - 5,
            marginRight: 30,
            paddingRight: 150
        },
    })
)

//const columns = ['Check In ports', 'Site name', 'Device']
const columns = [

    {
        id: "checkinpoint",
        label: 'Check In Point'
    },
    {
        id: "sitename",
        label: 'Site name'
    },
    {
        id: "device",
        label: 'Device'
    }]

const CheckInPointsView: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const {
        checkInPoints,
        pageCount,
        pageLinks,
        isLoading,
        error
    } = useSelector((state: RootState) => state.checkinpoints)

    const TableConfig = {
        columns: columns,
        isLoading: isLoading,
        data: checkInPoints,
        pagination:true,
        pageChange:(page:number,count:number)=>{
            dispatch(fetchCheckInPoints(page,count))
        },
        totalCount:pageCount,
        // menuOptions: [{
        //     item: (id: any) => <CustomMenuItem to='/' onClick={() => console.log('check out ' + id)}>
        //         Delete
        //     </CustomMenuItem>
        // },
        // {
        //     item: (id: any) => <CustomMenuItem to='/' onClick={() => console.log('check out ' + id)}>
        //         Disable
        //     </CustomMenuItem>
        // },
        // {
        //     item: (id: any) => <CustomMenuItem to='/' onClick={() => console.log('check out ' + id)}>
        //         View Details
        //     </CustomMenuItem>
        // }]
    }

    useEffect(() => {
        dispatch(fetchCheckInPoints(0,10))
    }, [dispatch])

    return (
        <Grid item xs style={{height: "100%"}}>
            <Paper className={classes.paper}>
                <Box display="flex" justifyContent="space-between" style={{ paddingTop: '37px', paddingLeft: '30px', paddingBottom: '25.5px'}} >
                    <SearchInput hidden placeholder="Search Employees by name, email or mobile" width={353} />
                    <div style={{width:353}}/>
                    {/* <SelectInput value="Action" /> */}
                    <CustomMenuItem to='/checkinpoints/add'>
                        <CustomButton style={{ width: '150px', fontSize: '12px', height: '39px', padding: 0 }}>
                            Add Check in point
                        </CustomButton>
                    </CustomMenuItem>
                </Box>

                <TableWrapper style={{paddingLeft: '66px'}} config={TableConfig}/>
            </Paper>
        </Grid>
    );
};

export default CheckInPointsView;
