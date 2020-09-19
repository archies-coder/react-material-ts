import React, { FunctionComponent, useState, useEffect } from 'react';
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
    TableCell,
    TableRow,
    Theme
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HomeStats from "./HomeStats";
import HomeDateDropdown from "./HomeDateDropdown";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";
import TableWrapper from "../../components/TableWrapper";
import SearchInput from "../../components/SearchInput";
import SelectInput from "../../components/SelectInput";
import { useSelector, useDispatch } from 'react-redux';
import { fetchVisitors } from 'features/Home/visitorSlice'
import { fetchHomeStats } from 'features/Home/homeSlice'
import { RootState } from 'app/rootReducer'
import { MyChart2 } from 'components/Chart'
import { CustomMenuItem } from 'components/CustomMenuItem';
import Axios from 'axios';
import { apis, checkout } from 'api/Apis';
import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6',
            borderRadius: theme.shape.borderRadius - 5,
            marginRight: 30,
            height: '100%'
        },
        graph: {
            //backgroundColor: 'blue',
            height: '100%',
            padding: 20
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
        avatar: <Avatar src={"uploads/1600095048.825798_arjun_pass.JPG"} />,
        name: 'Vijaya Tondon',
        mobileNo: 9754821630,
        personToMeet: 'Ramesh Chawla',
        purpose: 'Meeting',
        inTime: '11:30 am',
        outTime: '2:30 pm',
    }

    const columns = [
        {
            id: "profilePicPath",
            label: '',
        },
        {
            id: "name",
            label: 'Visitor name'
        },
        {
            id: "mobile",
            label: 'Mobile No.'
        },
        {
            id: "tomeet",
            label: 'Person to meet'
        },
        {
            id: "purpose",
            label: 'Purpose'
        },
        {
            id: "intime",
            label: 'In Time'
        },
        {
            id: "outime",
            label: 'Out Time'
        }]

    let tableRows: any = []

    for (let i = 0; i < 10; i++) {
        let copy: any = tableRows

        tableRows = [data, ...copy]
    }

    const dispatch = useDispatch()

    const {
        visitors,
        currentPageVisitors,
        pageCount,
        pageLinks,
        isLoading: isLoadingVisitor,
        error
    } = useSelector((state: RootState) => state.visitors)

    const {
        checked_out,
        in_office,
        invite_sent,
        total_visitor,
        visitors: visitorStats,
        isLoading: isLoadingHomeStats,
        error: homeStatsError
    } = useSelector((state: RootState) => state.home)

    useEffect(() => {
        dispatch(fetchVisitors(0))
        dispatch(fetchHomeStats())
    }, [dispatch])

    const handleCheckOut = async (id: any) => {
        dispatch(getBackdropStart())
        await checkout(id)
            .then(() => {
                dispatch(fetchHomeStats())
                dispatch(getBackdropStop())
            })
            .catch(() => dispatch(getBackdropStop()))
    }


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
        isLoading: isLoadingHomeStats,
        data: visitors.map(el => ({
            ...el,
            profilePicPath: <Avatar src={el['profilePicPath']} />
        })),
        menuOptions: [{
            key: 'checkin_id',
            callback: handleCheckOut,
            item: (id: any) => {

                return (<CustomMenuItem to='/' onClick={() => {

                }
                }>
                    {'Check Out'}
                </CustomMenuItem>)
            }
        }, {
            key: 'id',
            item: (id: any) => <CustomMenuItem to={'/visitor/' + id}>
                View Details
            </CustomMenuItem>
        }]
    }
    const homeStatsConfig = {
        checked_out,
        in_office,
        invite_sent,
        total_visitor,
        visitorStats,
        isLoadingHomeStats,
    }
    return (
        <Grid item>
            <Grid container>
                <Grid item xs={12} style={{ height: "40%", marginTop: 0, }}>
                    <Paper className={classes.paper}>
                        <Grid container>
                            <Grid item md={7}>
                                <Box>
                                    <Box alignItems="flex-start">
                                        <HomeDateDropdown />
                                    </Box>
                                    <Box alignItems="flex-end">
                                        <HomeStats config={homeStatsConfig} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item md={5}>
                                <div className={classes.graph}>
                                    <MyChart2 visitorStats={[...visitorStats]}></MyChart2>
                                </div>
                            </Grid>
                        </Grid>

                    </Paper>
                </Grid>
                <Grid item xs style={{ height: "100%", marginTop: '22px' }}>
                    <Paper className={classes.paper}>
                        <Box display="flex" justifyContent="start">
                            <SearchInput placeholder="Search visitor" />
                            <SelectInput value="In Office" />
                            <SelectInput value="All Purpose" />
                            <SelectInput value="All Sites" />
                        </Box>
                        <TableWrapper config={TableConfig} />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default HomeView;
