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
import Modal from '@material-ui/core/Modal';
import ReactSelect from 'react-select';

import { getYears, getMakes, getModels, setYear, getVehicleDetails } from "../../redux/actionCreators/index";
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
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        padding: theme.spacing(2, 4, 3),
    },
    modalClass: {
        position:'absolute',
        top:'10%',
        left:'10%',
        overflow:'scroll',
        height:'100%',
        display:'block'
    },
});

function rand() {
    return Math.round(Math.random() * 20) - 10;
}
  
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const mapDispatchToProps = {
    getYears: getYears,
    getMakes: getMakes,
    getModels: getModels,
    setYear: setYear,
    getVehicleDetails: getVehicleDetails,
};

const mapStateToProps = (state) => ({
    years: state.years,
    makes: state.makes,
    models: state.models,
    selectedYear: state.selectedYear,
    vehicle: state.vehicle,
});

const Quote = function(props) {
    const { classes } = props;
    const [country, setCountry] = React.useState('');
    const [year, setYear] = React.useState('');
    const [make, setMake] = React.useState('');
    const [model, setModel] = React.useState('');
    const [showDetailButton, toggleDetailButton] = React.useState(false);
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        setCountry(event.target.value);
    };
    
    const handleYearChange = selected => {
        setYear(selected)
        props.setYear(selected.value);
        props.getMakes(selected.value);
        setMake(null)
        setModel(null)
        toggleDetailButton(!showDetailButton)
    };
    
    const handleMakeChange = selected => {
        setMake(selected);
        props.getModels(year.value, selected.value);
        setModel(null)
        toggleDetailButton(!showDetailButton)
    };
    
    const handleModelChange = selected => {
        setModel(selected);
        props.getVehicleDetails(year.value, make.value, selected.value)
        toggleDetailButton(true)
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
                                    <ReactSelect
                                        value={year}
                                        onChange={handleYearChange}
                                        options={props.years}
                                    />

                                    <Typography color="textSecondary" className={classes.make} gutterBottom>
                                    Make
                                    </Typography>
                                    <ReactSelect
                                        value={make}
                                        onChange={handleMakeChange}
                                        options={props.makes}
                                    />

                                    <Typography color="textSecondary" className={classes.make} gutterBottom>
                                    Model
                                    </Typography>
                                    <ReactSelect
                                        value={model}
                                        onChange={handleModelChange}
                                        options={props.models}
                                    />

                                    
                                    {showDetailButton && (<Button variant="contained" color="primary" className={classes.make} onClick={handleOpen}>
                                        Show Vehicle Details
                                    </Button>)}

                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={open}
                                        onClose={handleClose}
                                        className={classes.modalClass}
                                    >
                                        <div style={modalStyle} className={classes.paper}>
                                            {props.vehicle.sub_models && (
                                            <div>
                                                <Typography color="textPrimary" gutterBottom>
                                                    Sub Models: 
                                                </Typography>
                                                <Typography color="textSecondary" gutterBottom>
                                                    {props.vehicle.sub_models && props.vehicle.sub_models.map(submodel => {return(<p>{submodel.SubModelName}</p>)})}
                                                </Typography> 
                                            </div>
                                            )}

                                            <Typography color="textPrimary" gutterBottom>
                                                Car Type: 
                                            </Typography>
                                            <Typography color="textSecondary" gutterBottom>
                                                {props.vehicle.type}
                                            </Typography>

                                            <Typography color="textPrimary" gutterBottom>
                                                Transmission:
                                            </Typography>
                                            <Typography color="textSecondary" gutterBottom>
                                                {props.vehicle.transmission}
                                            </Typography>

                                            <Typography color="textPrimary" gutterBottom>
                                                Drive Type: 
                                            </Typography>
                                            <Typography color="textSecondary" gutterBottom>
                                                {props.vehicle.drive_type}
                                            </Typography>


                                            <Typography color="textPrimary" gutterBottom>
                                            Door Count: 
                                            </Typography>
                                            <Typography color="textSecondary" gutterBottom>
                                                {props.vehicle.door_count}
                                            </Typography>
                                        </div>
                                    </Modal>
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