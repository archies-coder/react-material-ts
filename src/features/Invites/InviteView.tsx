import React, { FunctionComponent, useState, useEffect } from 'react';
import {
    Avatar,
    Box, Button,
    createStyles,
    fade,
    Grid,
    InputBase,
    InputLabel, Menu,
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
import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles } from "@material-ui/core/styles";
import TableWrapper from "../../components/TableWrapper";
import SearchInput from "../../components/SearchInput";
import SelectInput from "../../components/SelectInput";
import { useSelector, useDispatch } from 'react-redux';
import { fetchInvites } from 'features/Invites/inviteSlice'
import { RootState } from 'app/rootReducer'
import { CustomMenuItem } from 'components/CustomMenuItem';
import HomeDateDropdown from 'features/Home/HomeDateDropdown';
import { defaultVisitor, setCurrentVisitor, VisitorInfo } from 'features/Home/visitorSlice';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6',
            borderRadius: theme.shape.borderRadius - 5,
            marginRight: 30,
            // height: '100%'
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
            padding: 15,
            marginRight: 20,
        },
        search: {
            position: 'relative',
            width: '300px',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.5),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.75),
            },

        },
        select: {
            position: 'relative',
            width: '200px',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.5),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.75),
            },
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
            width: '100%'
        },
        inputInput: {
            padding: theme.spacing(2, 2, 2, 2),
            // vertical padding + font size from searchIcon
            // width: 'inherit',
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '100%',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    })
)




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
        id: "mobileno",
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
        id: "scheduletime",
        label: 'In Time'
    }]
interface OwnProps {
}

type Props = OwnProps;

const InviteView: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let tableRows: any = []

    

    const dispatch = useDispatch()

    const {
        invites,
        currentPageInvites,
        pageCount,
        pageLinks,
        invitesById,
        isLoading: isLoadingInvites,
        error
    } = useSelector((state: RootState) => state.invites)

    useEffect(() => {
        dispatch(fetchInvites())
    }, [dispatch])


    if (error) {
        return (
            <div>
                <h1>Something went wrong...</h1>
                <div>{error.toString()}</div>
            </div>
        )
    }

    const toVisitor = (id:any)=>{
        const visitor = {...mapVisitorFromInvite(id)}
        dispatch(setCurrentVisitor(visitor))
    }
    const mapVisitorFromInvite: (id:any)=>VisitorInfo = (id:any)=>{
        
        let visitor: VisitorInfo = {...defaultVisitor}
        const invite = invitesById[id]
        visitor.email = invite.email
        //visitor.intime = invite.intime
        visitor.mobile = invite.mobileno
        visitor.name = invite.name
        visitor.purpose = invite.purpose
        visitor.tomeet = invite.tomeet
        return {...visitor}
    }

    const TableConfig = {
        columns: columns,
        data: invites.map(el => ({
            ...el,
            profilePicPath: <Avatar>NA</Avatar>
        })),
        isLoading: isLoadingInvites,
        pagination: true,
        pageChange:(page:number,count:number)=>{
            dispatch(fetchInvites(page,count))
        },
        totalCount:pageCount,
        menuOptions: [{
            key: 'invite_id',
            callback: toVisitor,
            item: (id: any) => <CustomMenuItem to={"/visitor/-1"}>
                View Details
            </CustomMenuItem>
        }]
    }

    return (
        <Grid item xs={12} style={{ height: '100%' }}>
            <Paper className={classes.paper}>
                <Box style={{ paddingTop: '5px', paddingBottom: '5px'}}>
                    <HomeDateDropdown style={{ marginLeft: '37px', marginBottom: '10px'}} />
                </Box>
                <Box display="flex" justifyContent="start">
                    <SearchInput placeholder="Search visitor" style={{marginLeft: '32px'}} />
                    <SelectInput value="In Office" style={{marginLeft: '50px'}} />
                    <SelectInput value="All Purpose" style={{marginLeft: '50px'}} />
                    <SelectInput value="All Sites" style={{marginLeft: '50px'}} />
                </Box>
                <TableWrapper config={TableConfig} style={{ marginTop: '17px', marginLeft: '43px', marginRight: '300px' }} />
            </Paper>
        </Grid>
    );
};

export default InviteView;
