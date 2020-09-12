import React, {FunctionComponent} from 'react';
import {Box, createStyles, Grid, Paper, Theme} from "@material-ui/core";
import SearchInput from "../../components/SearchInput";
import TableWrapper from "../../components/TableWrapper";
import {makeStyles} from "@material-ui/core/styles";
import SelectInput from "../../components/SelectInput";
import CustomButton from "../../components/Button";

interface OwnProps {
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6',
            borderRadius: theme.shape.borderRadius - 5,
            marginRight: 30
        },
        tableContainer: {
            paddingRight: 100
        }
    })
)

const data = {
    name: 'Ipad Mini 78457',
    app: 'VMS 1.0',
    ios: '9.3.5',
    checkInPorts: 'Gate 1',
}

const columns = ['Device name', 'App Version', 'Ios Version', 'Check In Ports']

const DevicesView: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    let tableRows: any = []

    for (let i = 0; i < 10; i++) {
        let copy: any = tableRows
        tableRows = [data, ...copy]
    }

    const TableConfig = {
        columns: columns,
        data: tableRows,
        menuOptions: [{
            title: 'View Details',
            path: "/visitor/" + 2
        }]
    }

    return (
        <Grid item xs style={{height: "100%", marginTop: '22px'}}>
            <Paper className={classes.paper}>
                <Box display="flex" justifyContent="space-between">
                    <SearchInput placeholder="Search Devices" width={500}/>
                    <SelectInput value="Action"/>
                    <SelectInput value="Action"/>
                    <CustomButton>Add Device</CustomButton>
                </Box>
                <Box className={classes.tableContainer}>
                    <TableWrapper config={TableConfig}/>
                </Box>
            </Paper>
        </Grid>
    );
};

export default DevicesView;
