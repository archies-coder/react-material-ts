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
        id: "checkinpoints",
        label: 'Check In Ports'
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
    let tableRows: any = []

    for (let i = 0; i < 10; i++) {
        let copy: any = tableRows
        tableRows = [data, ...copy]
    }

    const TableConfig = {
        columns: columns,
        data: devices,
        menuOptions: [{
            item: (id: any) => <CustomMenuItem to={'/devices/device/' + id} onClick={() => console.log(id)} >
                View Details
            </CustomMenuItem>
        }]
    }

    return (
        <Grid item xs style={{ height: "calc(100vh - 100px)" }}>
            <Paper className={classes.paper}>
                <Box display="flex" justifyContent="space-between">
                    <SearchInput placeholder="Search Devices" width={400} />
                    <SelectInput style={{ marginRight: '-80px' }} value="All Sites" />
                    <SelectInput style={{ marginLeft: '40' }} value="All Status" />
                    <CustomButton style={{ padding: '10px 40px', marginRight: '20px', marginTop: '20px' }}>
                        <CustomMenuItem style={{ color: 'white' }} to='/devices/device'>Add Device</CustomMenuItem>
                    </CustomButton>
                </Box>
                <Box className={classes.tableContainer}>
                    <TableWrapper config={TableConfig} />
                </Box>
            </Paper>
        </Grid>
    );
};

export default DevicesView;
