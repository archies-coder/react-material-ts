import React, { FunctionComponent } from 'react';
import { Checkbox, createStyles, FormControlLabel, FormGroup, Grid, Paper, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CheckBoxComponent } from 'components/CheckBoxComponent';
import { config } from './VisitorFormConfig';

interface OwnProps {
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: '#E7ECF6',
            borderRadius: theme.shape.borderRadius - 5,
            marginRight: 30,
            height: '100%',
            padding: theme.spacing(4, 6, 0, 6),
        },

    })
)


const VisitorsForm: FunctionComponent<Props> = (props) => {
    const classes = useStyles()


    return (
        <Grid item xs style={{ height: "100%" }}>
            <Paper className={classes.paper}>
                <FormGroup>
                    {config.map(obj =>
                        <CheckBoxComponent
                            key={obj.name}
                            title={obj.name}
                            isChecked={obj.isChecked || false}
                            handleChange={() => console.log('checked')} />
                    )}
                </FormGroup>
            </Paper>
        </Grid>
    );
};

export default VisitorsForm;
