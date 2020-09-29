import React, { FunctionComponent, useEffect } from 'react';
import { Checkbox, createStyles, FormControlLabel, FormGroup, Grid, Paper, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CheckBoxComponent } from 'components/CheckBoxComponent';
import { config } from './VisitorFormConfig';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { fetchVisitorConfigs } from './visitorConfigSlice';

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
    const dispatch = useDispatch()
    const {
        visitorConfigs,
        visitorConfigsById,
        isLoading,
        error
    } = useSelector((state: RootState) => state.visitorConfig)

    useEffect(() => {
        dispatch(fetchVisitorConfigs())
    }, [dispatch])

    return (
        <Grid item xs style={{ height: "100%" }}>
            <Paper className={classes.paper}>
                <FormGroup>
                    {config.map(obj =>
                        <CheckBoxComponent
                            key={obj.name}
                            title={obj.name}
                            isChecked={(visitorConfigsById[obj.id]&&visitorConfigsById[obj.id].value) || false}
                            handleChange={() => console.log('checked')} />
                    )}
                </FormGroup>
            </Paper>
        </Grid>
    );
};

export default VisitorsForm;
