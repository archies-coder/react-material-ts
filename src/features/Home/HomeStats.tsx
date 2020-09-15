import React, { FunctionComponent } from 'react';
import { createStyles, Paper, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface OwnProps {
    config: any
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            // maxHeight: '175px',
            marginLeft: theme.spacing(1),
            // backgroundColor: 'white',
            // width: '60%',

            '& > *': {
                textAlign: 'center',
                color: '#192949',
                backgroundColor: '#E7ECF6',
                margin: theme.spacing(3,3,6,6),
                // marginTop: theme.spacing(3),
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

const HomeStats: FunctionComponent<Props> = ({ config, ...props }) => {
    const classes = useStyles()
    const {
        checked_out,
        in_office,
        invite_sent,
        total_visitor,
        visitorStats,
        isLoadingHomeStats,
    } = config;
    return (
        <div className={classes.root}>
            <Paper elevation={0}>
                <span className={classes.count}>{total_visitor}</span><br />
                <span className={classes.label}>Total Visitors</span>
            </Paper>
            <Paper elevation={0}>
                <span className={classes.count}>{checked_out}</span><br />
                <span className={classes.label}>Checked Out</span>
            </Paper>
            <Paper elevation={0}>
                <span className={classes.count}>{in_office}</span><br />
                <span className={classes.label}>In Office</span>
            </Paper>
            <Paper elevation={0}>
                <span className={classes.count}>{invite_sent}</span><br />
                <span className={classes.label}>Invite Sent</span>
            </Paper>
        </div>
    );
};

export default HomeStats;
