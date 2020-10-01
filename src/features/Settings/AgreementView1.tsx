import { makeStyles, Theme, createStyles, Grid, Paper } from '@material-ui/core';
import { serverUrl } from 'api/Apis';
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import 'features/Settings/pdf.less'

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

export default function AgreementView() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    //@ts-ignore
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    const classes = useStyles()

    return (
        <Grid item xs style={{ height: "inherit" }}>
            <Paper className={classes.paper}>
                <Document
                    file={serverUrl + "uploads/documents/NDA.pdf"}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {
                        Array.from(
                            new Array(numPages),
                            (el, index) => (
                                <Page
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                />
                            ),
                        )
                    }
                </Document>
            </Paper>
        </Grid>
    );
}