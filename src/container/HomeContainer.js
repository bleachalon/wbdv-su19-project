import React, {Component} from 'react';
import UserProductComponent from "../component/HomeComponents/UserProductComponent";
import EditorProductComponent from "../component/HomeComponents/EditorProductsComponent";
import Cookies from 'js-cookie'
import UserService from "../services/UserService";
import EditorService from "../services/EditorService";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Link} from "react-router-dom";


const styles = theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: "theme.palette.background.paper",
        padding: theme.spacing(6),
        position: "fixed",
        height: "100px",
        bottom: '0',
        width: "100%",

    },
    editorComp: {
        marginTop: "100px"
    }

});


class HomeContainer extends Component {

    constructor(props) {

        super(props);
        this.userService = UserService.getInstance()
        this.editorService = EditorService.getInstance();
        // this.id = Cookies.get("JSESSIONID") != null ? (JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID")))).uid : -1
        // this.type = Cookies.get("JSESSIONID") != null ? (JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID")))).dtype : -1
        this.id = JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID")))? JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID"))).uid :0
        this.type = JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID")))? JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID"))).dtype :0

        this.state = {
            editorPickProducts: [],
            editorPickByEditor: [],
            userProducts: [],
            uid: '',
            search: ""
        }
    }

    componentDidMount() {
        this.editorService.getAllEditor()
            .then(response => {
                this.setState({
                    editorPickProducts: response
                })
            })

        if (localStorage.getItem(Cookies.get("JSESSIONID")) != null && this.type == "Editor") {
            this.userService.getPortfolioForEditorByEditorId(this.id)
                .then(response => {
                    this.setState({
                        editorPickByEditor: response
                    })
                })
        }

        if (localStorage.getItem(Cookies.get("JSESSIONID")) != null) {
            var uid = JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID"))).uid
            this.setState({
                uid: uid
            })
            this.getProductsForUser(uid);
        }

    }

    getProductsForUser = (uid) =>
        this.userService.getProductsForUser(uid)
            .then(products => this.setState({
                userProducts: products
            }))

    searchChange = (e) =>
        this.setState({search: e.target.value})


    getEditorComp = () => {
        if (this.state.editorPickProducts.length > 0 && this.type != "Editor") {
            return (
                <Container maxWidth="md">
                    <h3 style={{marginBottom: 30}}>EDITORS' PICKS</h3>
                    <EditorProductComponent editorProducts={this.state.editorPickProducts} login={false}/>
                </Container>
            )
        } else if (this.state.editorPickByEditor.length > 0 && this.type == "Editor") {
            return (
                <Container maxWidth="md">
                    <h3 style={{marginBottom: 30}}>EDITOR'S PICKS</h3>
                    <EditorProductComponent editorProducts={this.state.editorPickByEditor} login={true}/>
                </Container>
            )
        }

    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <CssBaseline/>
                <main>
                    <div className={classes.heroContent}>
                        <Container maxWidth="md">
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Let's Collect & Review Sneakers!
                            </Typography>
                            <div className="row">
                                <div className='input-group mb-3'>
                                    <input className="form-control"
                                           value={this.state.search}
                                           onChange={(e) => this.searchChange(e)}
                                           placeholder="Seach for Sneakers"/>
                                    <div className="input-group-append">
                                        <Link to={`/search/${this.state.search}`}>
                                            <button
                                                className="btn btn-primary">
                                                Search
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.heroButtons}>
                            </div>
                        </Container>
                    </div>


                    {this.getEditorComp()}

                    {localStorage.getItem(Cookies.get("JSESSIONID")) != null && this.state.userProducts.length > 0 &&
                    <Container maxWidth="md">
                        <h3>MY COLLECTION</h3>
                        <UserProductComponent userProducts={this.state.userProducts}/>

                    </Container>}

                </main>

                {/* Footer */}
                {/*<footer className={classes.footer}>*/}
                {/*    <Typography variant="h6" align="center" gutterBottom>*/}
                {/*        SneakerStock 2019*/}
                {/*    </Typography>*/}
                {/*</footer>*/}
                {/* End footer */}
            </React.Fragment>

        )
    }
}

export default withStyles(styles)(HomeContainer)
