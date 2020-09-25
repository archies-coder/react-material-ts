import React, { FunctionComponent } from 'react';
import { Box, createStyles, Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from '@date-io/date-fns';
import EventIcon from '@material-ui/icons/Event';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';
import { ExpandMore } from '@material-ui/icons';

interface OwnProps extends React.HTMLAttributes<any> {
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            // display: 'inline-block',
            // marginTop: '15px',
            cursor: 'pointer',

            // margin: '15px 0 0 15px',
            '& .MuiInput-underline:before, & .MuiInput-underline:after': {
                borderBottom: 'none !important'
            },
            '& #date-picker-inline': {
                fontWeight: 600,
                color: theme.palette.text.primary,
                fontSize: '20px',
                letterSpacing: '0.5px',
                cursor: 'pointer !important',
                // width: '400px',
            }
        },
        icon: {
            '& > *': {
                fontSize: '45px',
                color: '#192949',
                paddingTop: '20px',
            },
        },
        date: {
            fontSize: '20px',
            fontWeight: 600,
            color: '#192949',
            letterSpacing: '0.5px',
            marginTop: '-25px',
            verticalAlign: 'super'
        },
        expandIcon: {
            '& > *': {
                fontSize: '35px',
                top: '-13px',
                marginLeft: '-130px',
                zIndex: '1',
                verticalAlign: '-webkit-baseline-middle',
                position: 'relative',
                // top: '116px',
                color: theme.palette.text.primary,
                cursor: 'pointer'
            },
        },

    })
)

const HomeDateDropdown: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
    return (
        <Box className={classes.container} {...props}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <span className={classes.icon}><EventIcon /></span>
                <DatePicker
                    disableToolbar
                    variant="inline"
                    format="MMM dd, yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    autoOk
                    value={selectedDate}
                    onChange={handleDateChange}

                // KeyboardButtonProps={{
                //     'aria-label': 'change date',
                //     edge: 'start'
                // }}
                />
                <ExpandMore />
            </MuiPickersUtilsProvider>
            {/*<span className={classes.icon}><EventIcon /></span>*/}
            {/*<span className={classes.date}>June 23, 2020</span>*/}
            {/*<span className={classes.expandIcon}><ExpandMoreIcon /></span>*/}
        </Box>
    );
};

export default HomeDateDropdown;
