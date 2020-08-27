import React, {FunctionComponent} from 'react';
import {Box, createStyles, Grid, Paper, Theme, Table, TableContainer, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import NavGridContainer from "../../components/NavGridContainer";
import HomeStats from "./HomeStats";
import HomeDateDropdown from "./HomeDateDropdown";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6'
        },
        cell: {
            borderBottom: 'none'
        },
        header: {
            '& > *': {
                fontWeight: '600 !important'
            }
        }
    })
)

interface OwnProps {
}

type Props = OwnProps;

const HomeView: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const data = {
        name: 'Vijaya Tondon',
        mobileNo: 9754821630,
        personToMeet: 'Ramesh Chawla',
        purpose: 'Meeting',
        inTime: '11:30 am',
        outTime: '2:30 pm',
    }

    return (
        <>
            <Grid item xs={12} style={{height: "250px", marginTop: 0,}}>
                <Paper className={classes.paper}>
                    <HomeDateDropdown />
                    <HomeStats />
                </Paper>
            </Grid>
            <Grid item xs style={{height: "100%", marginTop: '22px'}}>
                <Paper className={classes.paper}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow className={classes.header}>
                                    <TableCell className={classes.cell}></TableCell>
                                    <TableCell className={classes.cell}>Visitor Name</TableCell>
                                    <TableCell className={classes.cell}>Mobile No.</TableCell>
                                    <TableCell className={classes.cell}>Person to meet</TableCell>
                                    <TableCell className={classes.cell}>Purpose</TableCell>
                                    <TableCell className={classes.cell}>In time</TableCell>
                                    <TableCell className={classes.cell}>Out time</TableCell>
                                    <TableCell className={classes.cell}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell className={classes.cell}></TableCell>
                                    <TableCell className={classes.cell}>{data.name}</TableCell>
                                    <TableCell className={classes.cell}>{data.mobileNo}</TableCell>
                                    <TableCell className={classes.cell}>{data.personToMeet}</TableCell>
                                    <TableCell className={classes.cell}>{data.purpose}</TableCell>
                                    <TableCell className={classes.cell}>{data.inTime}</TableCell>
                                    <TableCell className={classes.cell}>{data.outTime}</TableCell>
                                    <TableCell className={classes.cell}><MoreHorizIcon /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.cell}></TableCell>
                                    <TableCell className={classes.cell}>{data.name}</TableCell>
                                    <TableCell className={classes.cell}>{data.mobileNo}</TableCell>
                                    <TableCell className={classes.cell}>{data.personToMeet}</TableCell>
                                    <TableCell className={classes.cell}>{data.purpose}</TableCell>
                                    <TableCell className={classes.cell}>{data.inTime}</TableCell>
                                    <TableCell className={classes.cell}>{data.outTime}</TableCell>
                                    <TableCell className={classes.cell}><MoreHorizIcon /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.cell}></TableCell>
                                    <TableCell className={classes.cell}>{data.name}</TableCell>
                                    <TableCell className={classes.cell}>{data.mobileNo}</TableCell>
                                    <TableCell className={classes.cell}>{data.personToMeet}</TableCell>
                                    <TableCell className={classes.cell}>{data.purpose}</TableCell>
                                    <TableCell className={classes.cell}>{data.inTime}</TableCell>
                                    <TableCell className={classes.cell}>{data.outTime}</TableCell>
                                    <TableCell className={classes.cell}><MoreHorizIcon /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.cell}></TableCell>
                                    <TableCell className={classes.cell}>{data.name}</TableCell>
                                    <TableCell className={classes.cell}>{data.mobileNo}</TableCell>
                                    <TableCell className={classes.cell}>{data.personToMeet}</TableCell>
                                    <TableCell className={classes.cell}>{data.purpose}</TableCell>
                                    <TableCell className={classes.cell}>{data.inTime}</TableCell>
                                    <TableCell className={classes.cell}>{data.outTime}</TableCell>
                                    <TableCell className={classes.cell}><MoreHorizIcon /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.cell}></TableCell>
                                    <TableCell className={classes.cell}>{data.name}</TableCell>
                                    <TableCell className={classes.cell}>{data.mobileNo}</TableCell>
                                    <TableCell className={classes.cell}>{data.personToMeet}</TableCell>
                                    <TableCell className={classes.cell}>{data.purpose}</TableCell>
                                    <TableCell className={classes.cell}>{data.inTime}</TableCell>
                                    <TableCell className={classes.cell}>{data.outTime}</TableCell>
                                    <TableCell className={classes.cell}><MoreHorizIcon /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.cell}></TableCell>
                                    <TableCell className={classes.cell}>{data.name}</TableCell>
                                    <TableCell className={classes.cell}>{data.mobileNo}</TableCell>
                                    <TableCell className={classes.cell}>{data.personToMeet}</TableCell>
                                    <TableCell className={classes.cell}>{data.purpose}</TableCell>
                                    <TableCell className={classes.cell}>{data.inTime}</TableCell>
                                    <TableCell className={classes.cell}>{data.outTime}</TableCell>
                                    <TableCell className={classes.cell}><MoreHorizIcon /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.cell}></TableCell>
                                    <TableCell className={classes.cell}>{data.name}</TableCell>
                                    <TableCell className={classes.cell}>{data.mobileNo}</TableCell>
                                    <TableCell className={classes.cell}>{data.personToMeet}</TableCell>
                                    <TableCell className={classes.cell}>{data.purpose}</TableCell>
                                    <TableCell className={classes.cell}>{data.inTime}</TableCell>
                                    <TableCell className={classes.cell}>{data.outTime}</TableCell>
                                    <TableCell className={classes.cell}><MoreHorizIcon /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.cell}></TableCell>
                                    <TableCell className={classes.cell}>{data.name}</TableCell>
                                    <TableCell className={classes.cell}>{data.mobileNo}</TableCell>
                                    <TableCell className={classes.cell}>{data.personToMeet}</TableCell>
                                    <TableCell className={classes.cell}>{data.purpose}</TableCell>
                                    <TableCell className={classes.cell}>{data.inTime}</TableCell>
                                    <TableCell className={classes.cell}>{data.outTime}</TableCell>
                                    <TableCell className={classes.cell}><MoreHorizIcon /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.cell}></TableCell>
                                    <TableCell className={classes.cell}>{data.name}</TableCell>
                                    <TableCell className={classes.cell}>{data.mobileNo}</TableCell>
                                    <TableCell className={classes.cell}>{data.personToMeet}</TableCell>
                                    <TableCell className={classes.cell}>{data.purpose}</TableCell>
                                    <TableCell className={classes.cell}>{data.inTime}</TableCell>
                                    <TableCell className={classes.cell}>{data.outTime}</TableCell>
                                    <TableCell className={classes.cell}><MoreHorizIcon /></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </>
    );
};

export default HomeView;
