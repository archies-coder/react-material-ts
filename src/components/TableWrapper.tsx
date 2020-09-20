import {
    Box,
    Button,
    createStyles, IconButton, Menu, MenuItem, MenuProps,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Theme, withStyles,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { KeyboardArrowRight, KeyboardArrowLeft, FirstPage as FirstPageIcon, LastPage as LastPageIcon} from "@material-ui/icons";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Skeleton } from '@material-ui/lab';
import React, { FunctionComponent, useEffect, useState } from 'react';

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
    isLoading?: Boolean;
    pagination?:Boolean;
}

interface OwnProps extends React.HTMLAttributes<any> {
    config: IConfigObject;
}

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
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
            // backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.primary.main,
            },
        },
    },
}))(MenuItem);

const StyledPaginationBox = withStyles((theme) => ({
    root: {
        '&': {
            // textAlign: '-moz-center',
            textAlign: '-webkit-center',
            padding: '20px auto',
            // fontSize: '16px'
        }
    }
}))(Box)

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
    pagination: {
        fontSize: '25px'
    }
}))

const TableWrapper: FunctionComponent<Props> = ({ config, ...props }) => {
    const classes = useStyles(config)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuId, setMenuId] = useState<null | any>(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows = [...config.data]
    const columns = [...config.columns]
    const menuOptions = [...config.menuOptions]

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, menuId: any) => {
        setAnchorEl(event.currentTarget);
        setMenuId(menuId);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setMenuId(null);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
      };

      const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };





    const TableHeader = <TableHead className={classes.header}>
        {
            columns.map(column => (
                <TableCell key={column.id}>{column.label}</TableCell>
            ))
        }
    </TableHead>

    const body = <TableBody>
        {
            (rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row: any, i: number) => (
                <TableRow key={i}>
                    {
                        columns.map((col: any, j: number) => <TableCell key={i + '' + j}>{row[col.id]}</TableCell>)
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
                            {menuOptions.map(({ item, key, callback }, i) => {

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
                        </StyledMenu>
                    </TableCell>
                </TableRow>
            ))
        }
    </TableBody>

    const skeletonBody = <TableBody>
        {
            Array(20).fill(0).map((row: any, i: number) => (
                <TableRow key={i}>
                    {
                        columns.map((col: any) => <TableCell key={row.id || i}><Skeleton /></TableCell>)
                    }
                    <TableCell className={classes.cell} align="center">
                        <Button aria-controls="simple-menu" aria-haspopup="true">
                            <MoreHorizIcon />
                        </Button>
                    </TableCell>
                </TableRow>
            ))
        }
    </TableBody>

    const tableHeader = <TableHead>
        <TableRow>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={columns.length}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                align="right"
                page={page}
                SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                }}
                classes={{
                    root: classes.pagination
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </TableRow>
    </TableHead>

    const tableFooter = <TableFooter>
        <TableRow>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={columns.length}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </TableRow>
    </TableFooter>
    return (
        <TableContainer classes={{
            root: classes.root
        }}>
                <StyledPaginationBox justifyContent="end">{config.pagination && tableHeader}</StyledPaginationBox>
            <Table>
                {TableHeader}
                {config.isLoading && skeletonBody}
                {!config.isLoading && body}

            </Table>
            <StyledPaginationBox justifyContent="end">{config.pagination && tableFooter}</StyledPaginationBox>
        </TableContainer>
    );
};

export default TableWrapper;