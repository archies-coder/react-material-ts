import React, {FunctionComponent} from 'react';
import {createStyles, Grid, Paper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

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
        title: {
            fontSize: '20px',
            margin: '30px auto'
        },
        tableContainer: {
            paddingRight: 100
        },
        header: {
            fontSize: '22px',
            fontWeight: 'bold',
            // padding: theme.spacing(2, 0, 0, 4),
            color: theme.palette.text.primary
        },
        text: {
            fontSize: '20px',
            lineHeight: '32px'
        }
    })
)

const AgreementView: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    return (
        <Grid item xs style={{height: "100%", marginTop: '22px'}}>
            <Paper className={classes.paper}>
                <div className={classes.header}>
                    <span> Non Disclosure Agreement</span>
                </div>
                <Typography>
                    <p className={classes.title}>What is Lorem Ipsum?</p>
                        <p className={classes.text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                    survived not only five centuries, but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                    containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                            PageMaker including versions of Lorem Ipsum.</p>

                        <p className={classes.title}>Why do we use it?</p>
                            <p className={classes.text}>It is a long established fact that a reader will be distracted by the readable content of a
                    page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
                    normal distribution of letters, as opposed to using 'Content here, content here', making it look
                    like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum
                    as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in
                    their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on
                                purpose (injected humour and the like).</p>


                        <p className={classes.title}>Where does it come from?</p>
                </Typography>
            </Paper>
        </Grid>
    );
};

export default AgreementView;
