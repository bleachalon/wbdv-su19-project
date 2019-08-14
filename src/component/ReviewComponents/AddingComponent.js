import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Divider from '@material-ui/core/Divider';
import ReviewService from "../../services/ReviewService";
import {Snackbar} from "@material-ui/core";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Link from "@material-ui/core/Link"




const useStyles = makeStyles(theme => ({
    element: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: "center",
        margin: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    margin: {
        margin: theme.spacing(2),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        flexBasis: 800,
    },
    Sbutton : {
        marginTop: theme.spacing(5)
    },
    title: {
        display: 'flex',
        justifyContent: "center"
    }
}));

export default function AddingComponent({uid, pid, url}) {
    const classes = useStyles();
    const reviewService= ReviewService.getInstance();
    const [values, setValues] = React.useState({
        overall:'',
        description: '',
        isRecommend: false,
        openFailure: false,
        openSuccess: false

    });

    const [size, setSize] = React.useState('');
    const handleChange1 = (event, newValue) => {
        setSize(newValue);
    };

    const [width, setWidth] = React.useState('');
    const handleChange2 = (event, newValue) => {
        setWidth(newValue);
    };

    const [comfort, setComfort] = React.useState('');
    const handleChange3 = (event, newValue) => {
        setComfort(newValue);
    };

    const [quality, setQuality] = React.useState('');
    const handleChange4 = (event, newValue) => {
        setQuality(newValue);
    };

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    };

    const notRecommend = () =>{
        setValues({...values, isRecommend: false})}
    const Recommend =() =>{
        setValues({...values, isRecommend: true})}




    function createReview (review, pid, uid) {
        reviewService.createReview(review, pid, uid).then(response => {
            if (response.status != 200) {
                setValues({...values, openFailure: true})
            } else {
                setValues({...values, openSuccess: true})
            }
        });
    }

    const closeSnackbar = () => {
        setValues({...values, openFailure: false})
        setValues({...values, openSuccess: false})
    }

    const User={
        overall: values.overall,
        size: size,
        width:width,
        comfort:comfort,
        quality: quality,
        isRecommend: values.isRecommend,
        description: values.description
    }

    const marks = [
        {value: 1, label: 'Too Small',},
        {value: 2, label: 'Small',},
        {value: 3, label: 'Perfect',},
        {value: 4, label: 'Large',},
        {value: 5, label: 'Too Large',},
    ];
    const marks1 = [
        {value: 1, label: 'Too Narrow',},
        {value: 2, label: 'Narrow',},
        {value: 3, label: 'Perfect',},
        {value: 4, label: 'Wide',},
        {value: 5, label: 'Too Wide',},
    ];
    const marks2 = [
        {value: 1, label: 'Very Uncomfortable',},
        {value: 2, label: 'Uncomfortable',},
        {value: 3, label: 'Ok',},
        {value: 4, label: 'Comfortable',},
        {value: 5, label: 'Very Comfortable',}
    ];
    const marks3 = [
        {value: 1, label: 'Too Poor',},
        {value: 2, label: 'Poor',},
        {value: 3, label: 'Ok',},
        {value: 4, label: 'Ok',},
        {value: 5, label: 'Perfect',}
    ];

    function valuetext(value) {
        return `${value}°C`;
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                open={values.openSuccess}
                autoHideDuration={3000}
                message={<span id="message-id">Update Succeed!</span>}
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                onClose={closeSnackbar}
                action={[
                    <IconButton onClick={closeSnackbar} color='inherit' key='close' aria-label='close'>
                        <CloseIcon/>
                    </IconButton>
                ]}
            />

            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                open={values.openFailure}
                autoHideDuration={3000}
                message={<span id="message-id">Update Fail! </span>}
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                onClose={closeSnackbar}
                action={[
                    <IconButton onClick={closeSnackbar} color='inherit' key='close' aria-label='close'>
                        <CloseIcon/>
                    </IconButton>
                ]}
            />
            <div className={classes.title}><h1>Write Your Reviews</h1></div>
            <Box className={classes.element}>
                <Box component="fieldset" borderColor="transparent" >
                    <Typography component="legend"><h5>Overall rating</h5></Typography>
                    <Rating size="large"
                        name="simple-controlled"
                        value={values.overall}
                        onChange={handleChange('overall')}
                    />
                </Box>
            </Box>
            <Box className={classes.element}>
                    <Box>
                    <Typography><h5>Do you recommend this product?</h5></Typography>
                        <Box display="flex" bgcolor="background.paper">
                            <Box flexGrow={1}>
                                <Button onClick={()=>Recommend()} variant="outlined" color="inherit">Yes</Button>
                            </Box>
                            <Box >
                                <Button onClick={()=>notRecommend()} variant="outlined" color="inherit">No</Button>
                            </Box>
                        </Box>
                    </Box>
            </Box>
            <Box className={classes.element} >
                <Box width="50%" display="block" justifyContent="center">
                    <Box display="flex" justifyContent="center">
                        <Typography id="discrete-slider-restrict" >
                            <h5>Size</h5>
                        </Typography>
                    </Box>
                <Slider
                    // valueLabelFormat={valueLabelFormat}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-restrict"
                    step={1}
                    valueLabelDisplay="auto"
                    marks={marks}
                    value={size}
                    onChange={handleChange1}
                    max={5}
                    min={1}
                />
                </Box>
            </Box>
            <Box className={classes.element} >
                <Box width="50%" display="block" justifyContent="center">
                    <Box display="flex" justifyContent="center">
                        <Typography id="discrete-slider-restrict" >
                            <h5>Width</h5>
                        </Typography>
                    </Box>
                    <Slider
                        // valueLabelFormat={valueLabelFormat}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-restrict"
                        step={1}
                        valueLabelDisplay="auto"
                        marks={marks1}
                        value={width}
                        onChange={handleChange2}
                        max={5}
                        min={1}
                    />
                </Box>
            </Box>
            <Box className={classes.element} >
                <Box width="50%" display="block" justifyContent="center">
                    <Box display="flex" justifyContent="center">
                        <Typography id="discrete-slider-restrict" >
                            <h5>Comfort</h5>
                        </Typography>
                    </Box>
                    <Slider
                        // valueLabelFormat={valueLabelFormat}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-restrict"
                        step={1}
                        valueLabelDisplay="auto"
                        marks={marks2}
                        value={comfort}
                        onChange={handleChange3}
                        max={5}
                        min={1}
                    />
                </Box>
            </Box>
            <Box className={classes.element} >
                <Box width="50%" display="block" justifyContent="center">
                    <Box display="flex" justifyContent="center">
                        <Typography id="discrete-slider-restrict" >
                            <h5>Quality</h5>
                        </Typography>
                    </Box>
                    <Slider
                        // valueLabelFormat={valueLabelFormat}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-restrict"
                        step={1}
                        valueLabelDisplay="auto"
                        marks={marks3}
                        value={quality}
                        onChange={handleChange4}
                        max={5}
                        min={1}
                    />
                </Box>
            </Box>

            <Divider />

            <Box className={classes.element} >
                <TextField
                    id="standard-multiline-static"
                    label="Review in Details"
                    multiline
                    rows="5"
                    className={classes.textField}
                    margin="normal"
                    value={values.description}
                    onChange={handleChange('description')}
                />
            </Box>

            <Divider />

            <Box className={classes.Sbutton}>
                <Button onClick={()=>createReview(User, uid,pid)} fullWidth size={"large"} variant="outlined" color="secondary" className={classes.button}>
                    Submit Review
                </Button>
            </Box>
            <Box className={classes.Sbutton}>
                <Link href={`/detail/${url}`}><Button fullWidth size={"large"} variant="outlined" color="inherit" className={classes.button}>
                    Back to Product
                </Button></Link>
            </Box>
        </div>
    );
}
