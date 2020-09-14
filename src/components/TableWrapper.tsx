import React, {FunctionComponent, useState} from 'react';
import {
    Button,
    createStyles, Menu, MenuItem, MenuProps,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme, withStyles
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {Link} from "react-router-dom";

interface IRowProps {
    [id: string]: any;
}

interface IMenuItemProps {
    path?: string;
    title: string;
}

interface ITableCellProps {
    padding?: number;
}

interface IColumnsConfig {
    id: any,
    label: any,
    sequence?:number,
    isSort?:boolean,
    isFilterable?:boolean
}
interface IConfigObject {
    columns: IColumnsConfig[];
    data:any;
    menuOptions: IMenuItemProps[];
    cellOptions?: ITableCellProps;
}

interface OwnProps extends React.HTMLAttributes<any> {
    config: IConfigObject;
}

type Props = OwnProps;

const StyledMenu = withStyles({
    paper: {
        // border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={1}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: 30
    },
    header: {
        '& > *': {
            fontWeight: 600
        }
    },
    cell: {
        borderBottom: 'none',
        padding: (config: IConfigObject) => config.cellOptions ? config.cellOptions.padding : 'auto'
    },
}))

const TableWrapper: FunctionComponent<Props> = ({config, ...props}) => {
    const classes = useStyles(config)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const TableHeader = <TableHead className={classes.header}>
        {
            config.columns.map(column => (
                <TableCell key={column.id}>{column.label}</TableCell>
            ))
        }

    </TableHead>

    const body = <TableBody>
        {
            config.data.map((row:any, i:number) => (
                <TableRow key={i}>
                    {
                        config.columns.map( (col:any) => <TableCell key={row.id || i}>{row[col.id]}</TableCell>) 
                    }
                    <TableCell className={classes.cell} align="center">
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            <MoreHorizIcon/>
                        </Button>
                        <StyledMenu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {config.menuOptions.map(({title, path}) => (
                                <StyledMenuItem key={title} onClick={handleClose}>
                                    <Link to={path} style={{textDecoration: "none", color: "#192949"}}>
                                        {title}
                                    </Link>
                                </StyledMenuItem>

                            ))}
                            {/*<StyledMenuItem onClick={handleClose}>Check Out</StyledMenuItem>*/}
                            {/*<StyledMenuItem onClick={handleClose}>Resend Code</StyledMenuItem>*/}
                            {/*<StyledMenuItem onClick={handleClose}>*/}
                            {/*    <Link to={"/visitor/" + i} style={{textDecoration: "none", color: "#192949"}}>*/}
                            {/*        View Details*/}
                            {/*    </Link>*/}
                            {/*</StyledMenuItem>*/}
                        </StyledMenu>
                    </TableCell>
                </TableRow>
            ))
        }
    </TableBody>

    return (
        <TableContainer classes={{
            root: classes.root
        }}>
            <Table>
                {TableHeader}
                {body}
            </Table>
        </TableContainer>
    );
};

export default TableWrapper;