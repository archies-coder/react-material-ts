import React, { FunctionComponent } from 'react';
import {createStyles, fade, InputLabel, MenuItem, Select, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../theme";

interface OwnProps {
    value: string;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => createStyles({
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
    inputRoot: {
        color: '#000',
    }
}))

const SelectInput: FunctionComponent<Props> = (props) => {
  const classes = useStyles()
  return (
      <div className={classes.select} {...props}>
          <InputLabel id="demo-simple-select-label" style={{
              // padding: '0 10px',
              // height: '100%',
              position: 'absolute',
              top: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
          }}>{props.value}</InputLabel>
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
  );
};

export default SelectInput;
