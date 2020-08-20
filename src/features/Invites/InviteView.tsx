import React, { FunctionComponent } from 'react';
import {Grid} from "@material-ui/core";

interface OwnProps {}

type Props = OwnProps;

const InviteView: FunctionComponent<Props> = (props) => {

  return (
      <Grid item>
          Invites
      </Grid>
  );
};

export default InviteView;
