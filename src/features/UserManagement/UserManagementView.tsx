import React, {FunctionComponent} from 'react';
import TableWrapper from "../../components/TableWrapper";
import {createStyles, fade, Grid, Paper, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchInput from "../../components/SearchInput";
import {ArrowBackIos} from "@material-ui/icons";
import { CustomMenuItem } from 'components/CustomMenuItem';

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
            paddingRight: 200,

            '&  .MuiTableCell-root': {
                borderBottom: '1px solid #192949',
                padding: '20px auto'
            },

            '& .MuiTableRow-root:last-child': {
                '&  .MuiTableCell-root': {
                    borderBottom: 'none',
                    padding: '20px auto'
                }
            }
        },
        header: {
            fontSize: '22px',
            fontWeight: 'bold',
            padding: '31.5px 0 38px 31.5px',
            color: theme.palette.text.primary
        },
        footer: {
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
        footerText: {
            marginRight: 50
        }
    })
)


const data = {
    name: 'Vijaya Tondon',
    mobileNo: 9754821630
}

//const columns = ['Roles', 'Status', '']
const columns = [

    {
        id: "role",
        label: 'Roles'
    },
    {
        id: "status",
        label: 'Status'
    },]
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
        }, {
            role: 'Admin',
            status: 'Not Assigned'
        }, {
            role: 'Security',
            status: 'Assigned'
        }, {
            role: 'HR',
            status: 'Assigned'
        }],
        menuOptions: [{
            item: (id: any) => <CustomMenuItem to='/' onClick={() => console.log('check out ' + id)}>
                Check Out
            </CustomMenuItem>
        }]
    }

    return (
        <Grid item xs style={{height: "calc(100vh - 100px)"}}>
            <Paper className={classes.paper}>
                <div className={classes.header}>
                    <ArrowBackIos className={classes.arrowBack}/>
                    <span> Roles </span>
                </div>
                <SearchInput style={{paddingLeft: '31.5px', paddingBottom: '25px'}} placeholder="Search Roles"/>
                <TableWrapper style={{width: '877px', marginLeft: '53px'}} config={TableConfig}/>
                <div className={classes.footer}>
                    <span className={classes.footerText}>Gate 11</span>
                    <span className={classes.footerText}>33 Narscicco Station</span>
                    <span className={classes.footerText}>Ipad mini 45871</span>
                </div>
            </Paper>
        </Grid>
    );
};

export default UserManagementView;
