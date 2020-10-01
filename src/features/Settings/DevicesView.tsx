import React, { FunctionComponent, useEffect } from 'react';
import { Box, createStyles, Grid, Paper, Theme } from "@material-ui/core";
import SearchInput from "../../components/SearchInput";
import TableWrapper from "../../components/TableWrapper";
import { makeStyles } from "@material-ui/core/styles";
import SelectInput from "../../components/SelectInput";
import CustomButton from "../../components/Button";
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'react-redux';
import { fetchDevices } from 'features/Settings/deviceSlice'
import { CustomMenuItem } from 'components/CustomMenuItem';
import { Link } from "react-router-dom";
interface OwnProps {
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6',
            borderRadius: theme.shape.borderRadius - 5,
            marginRight: 30,
            '& .MuiBox-root-21 .MuiButton-text': {
                marginTop: '16px',
            },
            '& .WithStyles(ForwardRef(Button))-root-35': {
                padding: '12px 40px !important'
            }
        },
        tableContainer: {
            paddingRight: 100
        },
    })
)

const data = {
    name: 'Ipad Mini 78457',
    app: 'VMS 1.0',
    ios: '9.3.5',
    checkInPorts: 'Gate 1',
}

//const columns = ['Device name', 'App Version', 'Ios Version', 'Check In Ports']
const columns = [

    {
        id: "devicename",
        label: 'Device name'
    },
    {
        id: "appversion",
        label: 'App Version'
    },
    {
        id: "iosversion",
        label: 'Ios Version'
    },
    {
        id: "checkinpoint",
        label: 'Check In Ports'
    },
    {
        id: "pincode",
        label: 'Pin Code'
    }]
const DevicesView: FunctionComponent<Props> = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const {
        devices,
        currentPageDevices,
        pageCount,
        pageLinks,
        isLoading: isLoadingDevice,
        error,
        devicesById
    } = useSelector((state: RootState) => state.devices)

    useEffect(() => {
        dispatch(fetchDevices())

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
        isLoading: isLoadingDevice,
        data: devices,
        pagination:true,
        pageChange:(page:number,count:number)=>{
            dispatch(fetchDevices(page,count))
        },
        totalCount:pageCount,
        menuOptions: [{
            key: 'udid',
            item: (id: any) => <CustomMenuItem to={'/devices/device/' + id} onClick={() => console.log(id)} >
                View Details
            </CustomMenuItem>
        }]
    }

    return (
        <Grid item xs style={{ height: "100%" }}>
            <Paper className={classes.paper}>
                <Box display="flex" justifyContent="space-between" style={{ paddingTop: '37.5px', paddingBottom: '24px' }}>
                    <SearchInput style={{ marginLeft: '28.5px', height: '39px' }} placeholder="Search Devices" width={400} />
                    <Box display="flex">
                        {/* <SelectInput style={{ marginRight: '26px', width: '122px', height: '39px' }} value = {""} defaultValue="All Sites" menuOptions={[]} /> */}
                        {/* <SelectInput style={{ marginRight: '26px', width: '122px', height: '39px' }} value = {""} defaultValue="All Status" menuOptions={[]} /> */}
                        <CustomMenuItem to='/devices/device'>
                            <CustomButton style={{ marginRight: '63px', width: '116px', fontSize: '12px', height: '39px', padding: 0, marginTop: '2px' }}>
                                Add Device
                    </CustomButton>
                        </CustomMenuItem>
                    </Box>
                </Box>
                <Box className={classes.tableContainer}>
                    <TableWrapper style={{marginLeft: '65px', width: '839px'}} config={TableConfig} />
                </Box>
            </Paper>
        </Grid>
    );
};

export default DevicesView;
