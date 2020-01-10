import React,{ useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ReactSelect from 'react-select';

import { getYears, getMakes } from "../../redux/actionCreators/index";
import { connect } from "react-redux";

const styles = theme => ({
    root: {
        width: "100%",
    },
    text: {
        width: "100%",
        marginTop: "28px",
    },
    mainCard: {
        marginTop: "80px",
    },
    firstCard: {
        marginBottom: "160px"
    },
    make: {
        marginTop: "20px",
    }
});

const mapDispatchToProps = {
    getYears: getYears,
    getMakes: getMakes,
};

const mapStateToProps = (state) => ({
    years: state.years,
    makes: state.makes,
});

const Quote = function(props) {
    const { classes } = props;
    const [country, setCountry] = React.useState('');
    const [year, setYear] = React.useState('');
    const [make, setMake] = React.useState('');
    const handleChange = event => {
        setCountry(event.target.value);
    };
    const handleYearChange = event => {
        setYear(event.target.value);
        props.getMakes(event.target.value);
    };
    const handleMakeChange = selected => {
        setMake(selected);
    };
    useEffect(() => {
        props.getYears()
    }, []);

    return (
        <div>
            <Grid container justify="center" className={classes.mainCard}>
                <Grid item>
                    <Card variant="outlined">
                        <CardContent className={classes.firstCard}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <Typography color="textPrimary" gutterBottom>
                                    Enter your location
                                    </Typography>

                                    <InputLabel>Country</InputLabel>
                                    <Select
                                    value={country}
                                    onChange={handleChange}
                                    className={classes.root}
                                    >
                                        <MenuItem value={1}>USA</MenuItem>
                                        <MenuItem value={2}>Canada</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className={classes.text} label="Zipcode"/>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography color="textPrimary" gutterBottom>
                                    Select your car
                                    </Typography>

                                    <Typography color="textSecondary" gutterBottom>
                                    Year
                                    </Typography>
                                    <Select
                                    value={year}
                                    onChange={handleYearChange}
                                    className={classes.root}
                                    >
                                    {props.years.map((value, index) => {
                                        return <MenuItem key={index} value={index}>{value}</MenuItem>
                                    })}
                                    </Select>

                                    <Typography color="textSecondary" className={classes.make} gutterBottom>
                                    Make
                                    </Typography>
                                    <ReactSelect
                                        value={make}
                                        onChange={handleMakeChange}
                                        options={props.makes}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Quote))