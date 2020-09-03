import React, { FunctionComponent } from 'react';
import {Box, createStyles, Grid, Paper, Theme} from "@material-ui/core";
import SearchInput from "../../components/SearchInput";
import TableWrapper from "../../components/TableWrapper";
import {makeStyles} from "@material-ui/core/styles";
import SelectInput from "../../components/SelectInput";

interface OwnProps {}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6',
            borderRadius: theme.shape.borderRadius - 5,
            marginRight: 30
        },
    })
)

const data = {
    name: 'Pesh Infotech Ph1',
    address: '984 Sporer Highway',
    checkPoints: 'Gate 1',
}

const columns = ['Site name', 'Address', 'CheckPoints']

const SitesView: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    let tableRows: any = []

    for (let i = 0; i < 10; i++) {
        let copy: any = tableRows
        tableRows = [data, ...copy]
    }

  return (
      <Grid item xs style={{height: "100%", marginTop: '22px'}}>
          <Paper className={classes.paper}>
              <Box display="flex" justifyContent="space-between">
                  <SearchInput placeholder="Search Employees by name, email or mobile" width={500}/>
                  <SelectInput value="Action" />
              </Box>

              <TableWrapper columns={columns} data={tableRows}/>
          </Paper>
      </Grid>
  );
};

export default SitesView;
