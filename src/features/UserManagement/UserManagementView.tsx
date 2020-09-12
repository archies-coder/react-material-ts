import React, {FunctionComponent} from 'react';
import TableWrapper from "../../components/TableWrapper";
import {createStyles, fade, Grid, Paper, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchInput from "../../components/SearchInput";
import {ArrowBackIos} from "@material-ui/icons";

interface OwnProps {
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6',
            height: '100%',
            borderRadius: theme.shape.borderRadius - 5,
            marginRight: 30,
            paddingRight: 100
        },
        header: {
            fontSize: '22px',
            fontWeight: 'bold',
            padding: theme.spacing(2, 0, 0, 4),
            color: theme.palette.text.primary
        },
        arrowBack: {
            height: '30px',
            verticalAlign: 'bottom',
            cursor: 'pointer',
        },
    })
)


const data = {
    name: 'Vijaya Tondon',
    mobileNo: 9754821630
}

const columns = ['Roles', 'Status']

const UserManagementView: FunctionComponent<Props> = (props) => {
    const classes = useStyles()


    let tableRows: any = []

    for (let i = 0; i < 10; i++) {
        let copy: any = tableRows

        tableRows = [data, ...copy]
    }


    const TableConfig = {
        columns: columns,
        data: [{
            role: 'Reception',
            status: 'Assigned'
        },{
            role: 'Admin',
            status: 'Not Assigned'
        },{
            role: 'Security',
            status: 'Assigned'
        },{
            role: 'HR',
            status: 'Assigned'
        }],
        menuOptions: [{
            title: 'View Details',
            path: "/visitor/" + 2
        }]
    }

    return (
        <Grid item xs style={{height: "100%", marginTop: '22px'}}>
            <Paper className={classes.paper}>
                <div className={classes.header}>
                    <ArrowBackIos className={classes.arrowBack}/>
                    <span> Roles </span>
                </div>
                <SearchInput placeholder="Search Roles"/>
                <TableWrapper config={TableConfig}/>
            </Paper>
        </Grid>
    );
};

export default UserManagementView;
