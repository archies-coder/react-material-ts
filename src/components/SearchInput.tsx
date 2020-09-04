import React, { FunctionComponent } from 'react';
import {Box, createStyles, fade, InputBase, Paper, Theme} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles} from "@material-ui/core/styles";

interface OwnProps {
    placeholder: string;
    width?: number;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inputContainer: {
            padding: 15,
            marginRight: 20,
        },
        search: {
            position: 'relative',
            width: (props: Props) => props.width ? props.width : '300px',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.5),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.75),
            },

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
                    // width: '20ch',
                },
            },
        },
    })
)

const SearchInput: FunctionComponent<Props> = (props) => {
    const classes = useStyles(props)

    return (
      <Box>
          <div className={classes.inputContainer}>
              <div className={classes.search}>
                  <div className={classes.searchIcon}>
                      <SearchIcon/>
                  </div>
                  <InputBase
                      placeholder={props.placeholder}
                      classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                      }}
                      inputProps={{'aria-label': 'search'}}
                  />
              </div>
          </div>
      </Box>
  );
};

export default SearchInput;
