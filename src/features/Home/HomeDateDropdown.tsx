import React, {FunctionComponent} from 'react';
import {Box, createStyles, Grid, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';

interface OwnProps {
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'inline-block',
            // marginTop: '15px',
            margin: '15px 0 0 15px'
        },
        icon: {
            '& > *': {
                fontSize: '45px',
                color: '#192949',
                paddingTop: '20px'
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
                marginTop: '10px',
                verticalAlign: 'bottom'
            }
        }
    })
)

const HomeDateDropdown: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
    return (
        <Box className={classes.container}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"

                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
            </MuiPickersUtilsProvider>
            {/*<span className={classes.icon}><EventIcon /></span>*/}
            {/*<span className={classes.date}>June 23, 2020</span>*/}
            {/*<span className={classes.expandIcon}><ExpandMoreIcon /></span>*/}
        </Box>
    );
};

export default HomeDateDropdown;
