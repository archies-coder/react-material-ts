import React, {FunctionComponent, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    createStyles,
    fade,
    Grid,
    InputBase,
    InputLabel,
    Menu,
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
import {Link} from "react-router-dom";

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
            width: '300px',
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
            width: '200px',
            padding: '12px'
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

        },
    })
)

interface OwnProps {
}

type Props = OwnProps;

const HomeView: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const data = {
        name: 'Vijaya Tondon',
        mobileNo: 9754821630,
        personToMeet: 'Ramesh Chawla',
        purpose: 'Meeting',
        inTime: '11:30 am',
        outTime: '2:30 pm',
    }

    let tableRows: any = []

    for (let i = 0; i < 10; i++) {
        let copy: any = tableRows
        const newRow = <TableRow>
            <TableCell className={classes.cell}><Avatar>N</Avatar></TableCell>
            <TableCell className={classes.cell}>{data.name}</TableCell>
            <TableCell className={classes.cell}>{data.mobileNo}</TableCell>
            <TableCell className={classes.cell}>{data.personToMeet}</TableCell>
            <TableCell className={classes.cell}>{data.purpose}</TableCell>
            <TableCell className={classes.cell}>{data.inTime}</TableCell>
            <TableCell className={classes.cell}>{data.outTime}</TableCell>
            <TableCell className={classes.cell}>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <MoreHorizIcon/>
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Check Out</MenuItem>
                    <MenuItem onClick={handleClose}>Resend Code</MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link to={"/visitor/" + i}>
                            View Details
                        </Link>
                    </MenuItem>
                </Menu>
            </TableCell>
        </TableRow>

        tableRows = [newRow, ...copy]
    }


    return (
        <>
            <Grid item xs={12} style={{height: "250px", marginTop: 0,}}>
                <Paper className={classes.paper}>
                    <HomeDateDropdown/>
                    <HomeStats/>
                </Paper>
            </Grid>
            <Grid item xs style={{height: "100%", marginTop: '22px'}}>
                <Paper className={classes.paper}>
                    <Box display="flex" justifyContent="start">
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
                        </div>
                        <div className={classes.inputContainer}>
                            <div className={classes.select}>
                                <InputLabel id="demo-simple-select-label" style={{
                                    // padding: '0 10px',
                                    // height: '100%',
                                    position: 'absolute',
                                    top: '18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>In Office</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    disableUnderline
                                    className={classes.inputRoot}
                                    style={{
                                        borderBottom: 'none',
                                        // padding: '12px',
                                        width: '100%'
                                    }}
                                >
                                    <MenuItem>1</MenuItem>
                                </Select>
                            </div>
                        </div>
                        <div className={classes.inputContainer}>
                            <div className={classes.select}>
                                <InputLabel id="demo-simple-select-label" style={{
                                    // padding: '0 10px',
                                    // height: '100%',
                                    position: 'absolute',
                                    top: '18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>All Purpose</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    disableUnderline
                                    className={classes.inputRoot}
                                    style={{
                                        borderBottom: 'none',
                                        // padding: '12px',
                                        width: '100%'
                                    }}
                                >
                                    <MenuItem>1</MenuItem>
                                </Select>
                            </div>
                        </div>
                        <div className={classes.inputContainer}>
                            <div className={classes.select}>
                                <InputLabel id="demo-simple-select-label" style={{
                                    // padding: '0 10px',
                                    // height: '100%',
                                    position: 'absolute',
                                    top: '18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>All Sites</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    disableUnderline
                                    className={classes.inputRoot}
                                    style={{
                                        borderBottom: 'none',
                                        // padding: '12px',
                                        width: '100%'
                                    }}
                                >
                                    <MenuItem>1</MenuItem>
                                </Select>
                            </div>
                        </div>
                    </Box>
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
                                {tableRows}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </>
    );
};

export default HomeView;
