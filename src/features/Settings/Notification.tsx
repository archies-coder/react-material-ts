import React, { ChangeEvent, FunctionComponent } from 'react';
import { Checkbox, createStyles, FormControlLabel, FormGroup, Grid, Paper, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CheckBoxComponent } from 'components/CheckBoxComponent';
import { dataConfig, headConfig } from 'features/Settings/NotificationConfig';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { updateNotification } from './NotificationSlice';

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


const Notification: FunctionComponent<Props> = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {
        notificationById
    } = useSelector((state: RootState) => state.notifications)
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.name.split("-")
        const name = key[1]
        const id = key[0]
        const value = event.target.checked
        debugger
        dispatch(updateNotification({name:name,id:id,value:value}));
      };

    return (
        <Grid item xs style={{ height: "100%" }}>
            <Paper className={classes.paper}>
                <Grid container>
                    {headConfig.map(o => (
                        <Grid item xs={o.breakPoint} key={o.key}>{o.label}</Grid>
                    ))}
                </Grid>
                <Grid container>
                    {dataConfig.map((obj: any, i:any) => {
                        return headConfig.map(o => (
                            <Grid item xs={o.breakPoint}
                                key={o.key + i}>
                                {(o.render && o.render(notificationById[i], handleChange, i + "-" + o.key)) || obj[o.key]}
                            </Grid>
                        ))
                    })}
                </Grid>
            </Paper>
        </Grid>
    );
};

export default Notification;
