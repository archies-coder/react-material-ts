import React, { FunctionComponent, useEffect } from 'react';
import {Box, createStyles, Grid, Paper, Theme} from "@material-ui/core";
import SearchInput from "../../components/SearchInput";
import TableWrapper from "../../components/TableWrapper";
import {makeStyles} from "@material-ui/core/styles";
import SelectInput from "../../components/SelectInput";
import { CustomMenuItem } from 'components/CustomMenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { fetchSites } from './siteSlice';

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

const data = {
    name: 'Pesh Infotech Ph1',
    address: '984 Sporer Highway',
    checkPoints: 'Gate 1',
}

//const columns = ['Site name', 'Address', 'CheckPoints']
const columns = [

    {
        id: "sitename",
        label: 'Site name'
    },
    {
        id: "address",
        label: 'Address'
    },
    {
        id: "checkinpoint",
        label: 'Check In ports'
    }]

const selectInputMenu = [{
    title: 'Add'
}, {
    title: 'Delete'
}, {
    title: 'Disable'
}]

const SitesView: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const {
        sites,
        pageCount,
        pageLinks,
        isLoading: isLoadingVisitor,
        error
    } = useSelector((state: RootState) => state.sites)

    const TableConfig = {
        columns: columns,
        data: sites,
        pagination:true,
        pageChange:(page:number,count:number)=>{
            dispatch(fetchSites(page,count))
        },
        totalCount:pageCount,
        menuOptions: [{
            item: (id: any) => <CustomMenuItem to='/' onClick={() => console.log('check out ' + id)}>
                Check Out
            </CustomMenuItem>
        }]
    }

    useEffect(() => {
        dispatch(fetchSites(0,10))
    }, [dispatch])

    return (
      <Grid item xs style={{height: "100%", marginTop: '22px'}}>
          <Paper className={classes.paper}>
              <Box display="flex" justifyContent="space-between" style={{ paddingTop: '38px', paddingBottom: '26px' }}>
                  <SearchInput placeholder="Search Employees by name, email or mobile" width={354} style={{paddingLeft: '30px'}} />
                    <SelectInput value="Action" menuOptions={selectInputMenu} style={{width: '122px'}} />
              </Box>

              <TableWrapper config={TableConfig} style={{width: '870px', paddingLeft: '60px'}} />
          </Paper>
      </Grid>
  );
};

export default SitesView;
