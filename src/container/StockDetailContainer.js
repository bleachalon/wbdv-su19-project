import React, {Component} from 'react';
import StockDetailComponent from "../component/ProductComponents/StockDetailComponent";
import StockService from "../services/StockService"
import Container from '@material-ui/core/Container'
import ProductReviewContainer from "./ProductReviewContainer";
import Button from '@material-ui/core/Button';
import ProductService from "../services/ProductService";
import {Snackbar} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Cookies from "js-cookie"
import {Redirect, Link} from "react-router-dom";

class StockDetailContainer extends Component {

    constructor(props) {
        super(props)
        this.stockService = StockService.getInstance()
        this.productService = ProductService.getInstance()
        // this.id = Cookies.get("JSESSIONID") != null ? (JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID")))).uid : -1
        // this.type = Cookies.get("JSESSIONID") != null ? (JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID")))).dtype : -1
       // this.id = JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID")))? JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID"))).id :0
        this.type = JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID")))? JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID"))).dtype :0

        this.state = {
            detail: {},
            response: {},
            uid: JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID")))? localStorage.getItem(Cookies.get("JSESSIONID")).uid : "0",
            urlKey: this.props.match.params.urlKey,
            openSuccess: false,
            openFailure: false,
            redirect: false
        }

    }

    componentDidMount() {
        //this.getProductByUrl(this.state.urlKey)
        // const urlKey = this.props.match.params.urlKey
        this.productService.createProduct(this.state.urlKey)


        this.stockService.obtainDetailInfo(this.state.urlKey)
            .then(responseJSON => this.setState({
                detail: responseJSON.Product
            }))

        var loginJson = JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID")))
        if (loginJson != null) {
            this.setState({
                uid: loginJson.uid
            })
        }



    }

    // getProductByUrl = (url) =>
    //     this.productService.findProductByUrlKey(url)
    //         .then(response => {
    //             if (response.status != 200){
    //                 this.productService.createProduct(url)
    //                     .then(response => this.setState({
    //                         response: response
    //                     }))
    //             }else{
    //                 this.setState({
    //                     response:response
    //                 })
    //             }
    //         })


    addProductForUser = (urlKey, uid) => {
        if (JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID"))) != null) {
            return this.productService.addProduct(urlKey, uid)
                .then(response => {
                    if (response.status != 200) {
                        this.setState({
                            openFailure: true,
                        })
                    } else {
                        this.setState({
                            openSuccess: true
                        })
                    }
                })
        } else {
            this.setState({
                redirect: true
            })
        }

    }

    addProductForEditor = (urlKey, uid) => {
        if (JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID"))) != null) {
            return this.productService.addProductForEditor(urlKey, uid)
                .then(response => {
                    if (response.status != 200) {
                        this.setState({
                            openFailure: true,
                        })
                    } else {
                        this.setState({
                            openSuccess: true
                        })
                    }
                })
        } else {
            this.setState({
                redirect: true
            })
        }

    }
    closeSnackbar = () => {
        this.setState({openSuccess: false, openFailure: false})
    }


    renderRedirectLogin = () => {
        if (this.state.redirect) {
            return <Redirect to='/login'/>
        }
    }

    render() {
        const url = "/add/" + this.state.urlKey + "/" + "0" + "/" + this.state.uid
        return (
            <Container maxWidth="lg">
                {console.log(this.state.response)}
                {this.type != "Editor" ? <Snackbar
                    anchorOrigin={{vertical: "top", horizontal: "left"}}
                    open={this.state.openSuccess}
                    autoHideDuration={3000}
                    message={<span id="message-id">Added to your portfolio!</span>}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton onClick={this.closeSnackbar} color='inherit' key='close' aria-label='close'>
                            <CloseIcon/>
                        </IconButton>
                    ]}
                /> :
                <Snackbar
                    anchorOrigin={{vertical: "top", horizontal: "left"}}
                    open={this.state.openSuccess}
                    autoHideDuration={3000}
                    message={<span id="message-id">Added to your collection!</span>}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton onClick={this.closeSnackbar} color='inherit' key='close' aria-label='close'>
                            <CloseIcon/>
                        </IconButton>
                    ]}
                />
                }

                <Snackbar
                    anchorOrigin={{vertical: "top", horizontal: "left"}}
                    open={this.state.openFailure}
                    autoHideDuration={3000}
                    message={<span id="message-id">Sneaker already added. Please don't add it Again! </span>}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton onClick={this.closeSnackbar} color='inherit' key='close' aria-label='close'>
                            <CloseIcon/>
                        </IconButton>
                    ]}
                />


                {this.type != "Editor" ?
                    <div className="float-right">
                        <button type="button" className="btn btn-info"
                                onClick={() => this.addProductForUser(this.state.urlKey, this.state.uid)}>Add to
                            Portfolio
                        </button>
                    </div>
                    :
                    <div className="float-right">
                        <button type="button" className="btn btn-info"
                                onClick={() => this.addProductForEditor(this.state.urlKey, this.state.uid)}>Add to Collection
                        </button>
                    </div>
                }
                <StockDetailComponent detail={this.state.detail}/>
                <ProductReviewContainer params={this.props.match.params}/>
                <br/>
                {this.type != "Editor" && <Link to={JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID"))) != null ? `${url}` : "/login"} color="inherit">
                    <Button fullWidth
                            size={"large"}
                            variant="outlined"
                            onClick={() => this.addProductForUser(this.state.urlKey, this.state.uid)}
                            color="inherit">Add
                        Review</Button></Link>}
                {this.renderRedirectLogin()}

            </Container>
        );
    }
}

export default StockDetailContainer;
