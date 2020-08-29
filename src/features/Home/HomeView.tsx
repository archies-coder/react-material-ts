import React, {FunctionComponent} from 'react';
import {
    Avatar,
    createStyles,
    fade,
    Grid,
    InputBase,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import HomeStats from "./HomeStats";
import HomeDateDropdown from "./HomeDateDropdown";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6',
            borderRadius: theme.shape.borderRadius - 10,
            marginRight: 30
        },
        cell: {
            borderBottom: 'none'
        },
        header: {
            '& > *': {
                fontWeight: '600 !important'
            }
        },
        inputContainer: {
            padding: 20,
        },
        search: {
            position: 'relative',
            display: 'inline-block',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.5),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.75),
            },
            width: '25%',
            // [theme.breakpoints.up('sm')]: {
            //     marginLeft: theme.spacing(1),
            //     width: 'auto',
            // },
        },
        select: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.5),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.75),
            },
            width: '20%',
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: '#000',
            // padding: 4
        },
        inputInput: {
            padding: theme.spacing(2, 2, 2, 2),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
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
                    <div className={classes.inputContainer}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search visitor"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{'aria-label': 'search'}}
                            />
                        </div>
                        <div className={classes.inputContainer}>
                            <div className={classes.select}>
                                <Select
                                    disableUnderline
                                    className={classes.inputRoot}
                                    style={{
                                        borderBottom: 'none',
                                        // padding: '12px',
                                        width: '100%'
                                    }}
                                    placeholder="In Office"
                                    value="In Office"
                                >
                                    <MenuItem>1</MenuItem>
                                </Select>
                            </div>
                        </div>
                    </div>
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
                                    <TableCell className={classes.cell}><Avatar>N</Avatar></TableCell>
                                    <TableCell className={classes.cell}>{data.name}</TableCell>
                                    <TableCell className={classes.cell}>{data.mobileNo}</TableCell>
                                    <TableCell className={classes.cell}>{data.personToMeet}</TableCell>
                                    <TableCell className={classes.cell}>{data.purpose}</TableCell>
                                    <TableCell className={classes.cell}>{data.inTime}</TableCell>
                                    <TableCell className={classes.cell}>{data.outTime}</TableCell>
                                    <TableCell className={classes.cell}><MoreHorizIcon /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.cell}><Avatar>N</Avatar></TableCell>
                                    <TableCell className={classes.cell}>{data.name}</TableCell>
                                    <TableCell className={classes.cell}>{data.mobileNo}</TableCell>
                                    <TableCell className={classes.cell}>{data.personToMeet}</TableCell>
                                    <TableCell className={classes.cell}>{data.purpose}</TableCell>
                                    <TableCell className={classes.cell}>{data.inTime}</TableCell>
                                    <TableCell className={classes.cell}>{data.outTime}</TableCell>
                                    <TableCell className={classes.cell}><MoreHorizIcon /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.cell}><Avatar>N</Avatar></TableCell>
                                    <TableCell className={classes.cell}>{data.name}</TableCell>
                                    <TableCell className={classes.cell}>{data.mobileNo}</TableCell>
                                    <TableCell className={classes.cell}>{data.personToMeet}</TableCell>
                                    <TableCell className={classes.cell}>{data.purpose}</TableCell>
                                    <TableCell className={classes.cell}>{data.inTime}</TableCell>
                                    <TableCell className={classes.cell}>{data.outTime}</TableCell>
                                    <TableCell className={classes.cell}><MoreHorizIcon /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.cell}><Avatar>N</Avatar></TableCell>
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
