import React, {FunctionComponent} from 'react';
import {Checkbox, createStyles, FormControlLabel, Grid, Paper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface OwnProps {
}

type Props = OwnProps;

type CheckBoxComponentProps = {
    isChecked: boolean,
    handleChange: () => void,
    title: string
}

const config = [{
    name: 'Mobile Number',
    isChecked: true
}, {
    name: 'Full Name',
    isChecked: true
}, {
    name: 'Gender',
    isChecked: true
}, {
    name: 'Photo',
    isChecked: false
}, {
    name: 'Email',
    isChecked: false
}, {
    name: 'Address/Locality/City/Country',
    isChecked: false
},]

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

const CheckBoxComponent: FunctionComponent<CheckBoxComponentProps> = ({isChecked, handleChange, title}) =>
    <FormControlLabel
        // @ts-ignore
        control={<Checkbox checked={isChecked} onChange={handleChange} name={title}/>}
        label={title}
    />

const VisitorsForm: FunctionComponent<Props> = (props) => {
    const classes = useStyles()


    return (
        <Grid item xs style={{height: "100%", marginTop: '22px'}}>
            <Paper className={classes.paper}>
                {config.map(obj =>
                    <CheckBoxComponent
                        key={obj.name}
                        title={obj.name}
                        isChecked={obj.isChecked}
                        handleChange={() => console.log('checked')}/>
                )}
            </Paper>
        </Grid>
    );
};

export default VisitorsForm;
