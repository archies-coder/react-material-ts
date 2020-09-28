import React, { FunctionComponent } from 'react';
import {Box, createStyles, fade, InputBase, InputBaseProps, Paper, Theme} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles} from "@material-ui/core/styles";

interface OwnProps extends React.HTMLAttributes<any> {
    placeholder: string;
    width?: number;
    height?: number
}

type Props = OwnProps & InputBaseProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inputContainer: {
            // padding: '33px',
            // marginRight: 20,
            // width: '225px',
            // height: '40px'
            '& .MuiInputBase-input::placeholder': {
                opacity: 1,
                color: theme.palette.text.primary,
            }
        },
        search: {
            position: 'relative',
            width: (props: Props) => props.width ? props.width : '225px',
            height: (props: Props) => props.height ? props.height : '40px',
            // height: '40px',
            borderRadius: theme.shape.borderRadius - 5,
            backgroundColor: theme.palette.common.white,

            '&:hover': {
                backgroundColor: theme.palette.common.white,
            },

        },
        searchIcon: {
            padding: theme.spacing(0, 1),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: theme.palette.text.primary,
            width: '100%'
        },
        inputInput: {
            // padding: theme.spacing(2, 2, 2, 2),
            // vertical padding + font size from searchIcon
            // width: 'inherit',
            fontSize: '11.25px',
            marginTop: '7px',
            color: theme.palette.text.primary,
            zIndex: 1000,
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            // transition: theme.transitions.create('width'),
            height: '100%',

        },
    })
)

const SearchInput: FunctionComponent<Props> = (props) => {
    const classes = useStyles(props)

    return (
      <Box {...props}>
          <div className={classes.inputContainer}>
              <div className={classes.search}>
                  <div className={classes.searchIcon}>
                      <SearchIcon/>
                  </div>
                  <InputBase
                  value={props.value}
                  onChange={props.onChange}
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
