import React, {Component} from 'react';
import PortfolioComponent from '../../component/AccountComponents/UserPortfolioComponent'
import UserService from "../../services/UserService"
import Cookies from 'js-cookie'

class UserPortfolioContainer extends Component {

    constructor(props) {
        super(props)
        this.userService = UserService.getInstance()
        this.state = {
            portfolioItems: [],
            totalItem: '',
            retailSum: '',
            marketSum: '',
            gainLossSum: '',
        }
    }

    componentDidMount() {
        const uid = this.props.match.params.uid
        // if (Cookies.get("JSESSIONID") != undefined
        //     && JSON.parse(localStorage.getItem(Cookies.get("JSESSIONID"))).dtype == 'Editor') {
        //     this.userService.getPortfolioForEditorByEditorId(uid)
        //         .then(response => {
        //             this.setState({
        //                 portfolioItems: response.portfolioItems,
        //                 totalItem: response.totalItem,
        //                 retailSum: response.retailSum,
        //                 marketSum: response.marketSum,
        //                 gainLossSum: response.gainLossSum
        //             })
        //         })
        // } else { //visitor or user
        this.userService.getPortfolioForUserByUserId(uid)
            .then(response => {
                this.setState({
                    portfolioItems: response.portfolioItems,
                    totalItem: response.totalItem,
                    retailSum: response.retailSum,
                    marketSum: response.marketSum,
                    gainLossSum: response.gainLossSum
                })
            })


    }

    render() {
        return (
            <div>
                {this.state.portfolioItems !=null && this.state.portfolioItems.length > 0 &&
                <PortfolioComponent uid={this.props.match.params.uid} portfolio={this.state}/>}
            </div>
        );
    }
}

export default UserPortfolioContainer;
