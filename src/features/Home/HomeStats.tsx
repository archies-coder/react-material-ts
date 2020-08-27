import React, {FunctionComponent} from 'react';
import {createStyles, Paper, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface OwnProps {
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            // flexWrap: 'wrap',
            maxHeight: '175px',
            marginLeft: theme.spacing(2),

            '& > *': {
                textAlign: 'center',
                color: '#192949',
                backgroundColor: '#E7ECF6',
                margin: theme.spacing(6),
                marginTop: theme.spacing(10),
                width: theme.spacing(16),
                height: theme.spacing(14),
                fontWeight: theme.typography.fontWeightBold,
            },
        },
        count: {
            fontSize: '72px',
        },
        label: {
            lineHeight: '5px',
            fontSize: '20px'
        },
    }),
);

const HomeStats: FunctionComponent<Props> = (props) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Paper elevation={0}>
                <span className={classes.count}>178</span><br/>
                <span className={classes.label}>Total Visitors</span>
            </Paper>
            <Paper elevation={0}>
                <span className={classes.count}>120</span><br/>
                <span className={classes.label}>Checked Out</span>
            </Paper>
            <Paper elevation={0}>
                <span className={classes.count}>50</span><br/>
                <span className={classes.label}>In Office</span>
            </Paper>
            <Paper elevation={0}>
                <span className={classes.count}>50</span><br/>
                <span className={classes.label}>Invite Sent</span>
            </Paper>
        </div>
    );
};

export default HomeStats;
