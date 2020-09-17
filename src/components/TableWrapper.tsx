import React, { FunctionComponent, useEffect, useState } from 'react';
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
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Link } from "react-router-dom";

interface IRowProps {
    [id: string]: any;
}

interface IMenuItemProps {
    path?: string | ((id: any) => any);
    title: string;
    onClick?: () => any;
    item: (id: any) => JSX.Element
}

interface ITableCellProps {
    padding?: number;
}

interface IColumnsConfig {
    id: any,
    label: any,
    sequence?: number,
    isSort?: boolean,
    isFilterable?: boolean
}
interface IConfigObject {
    columns: IColumnsConfig[];
    data: any;
    menuOptions?: any[];
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

const TableWrapper: FunctionComponent<Props> = ({ config, ...props }) => {
    const classes = useStyles(config)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuId, setMenuId] = useState<null | any>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, menuId: any) => {
        setAnchorEl(event.currentTarget);
        setMenuId(menuId);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setMenuId(null);
    };

    useEffect(() => console.log(config.data), [])

    const menuOptios = () => {

    }

    const TableHeader = <TableHead className={classes.header}>
        {
            config.columns.map(column => (
                <TableCell key={column.id}>{column.label}</TableCell>
            ))
        }
    </TableHead>
    const rows = [...config.data]
    const body = <TableBody>
        {
            rows.map((row: any, i: number) => (
                <TableRow key={i}>
                    {
                        config.columns.map((col: any, j: number) => <TableCell key={i + '' + j}>{row[col.id]}</TableCell>)
                    }
                    <TableCell key={i + "-c"} className={classes.cell} align="center">
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => { handleClick(e, i + "-c") }}>
                            <MoreHorizIcon />
                        </Button>
                        <StyledMenu
                            id={"simple-menu-" + i + row['id']}
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(menuId === (i + "-c"))}
                            onClose={handleClose}
                        >
                            {config.menuOptions.map(({ item, key, callback }, i) => {
                                
                                return (
                                    <StyledMenuItem key={i} id={row[key] || row.id} onClick={(e) => {
                                        handleClose()
                                        callback && callback(row[key] || row.id)
                                    }}>
                                        {
                                            item(row[key] || row.id)
                                        }
                                    </StyledMenuItem>
                                )
                            })}
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