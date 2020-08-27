import React, {FunctionComponent} from 'react';
import EventIcon from '@material-ui/icons/Event';
import {Box, Typography} from "@material-ui/core";

interface OwnProps {
}

type Props = OwnProps;

const HomeDateDropdown: FunctionComponent<Props> = (props) => {

    return (
        <Box>
            <Typography variant="h6">
                <span style={{top: '5px'}}><EventIcon/></span>
                <span style={{top: '-5px'}}>June 23, 2020</span>
            </Typography>
      </Box>
    );
};

export default HomeDateDropdown;
