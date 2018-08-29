import React, {Component, Fragment} from 'react';
import {Query} from 'react-apollo';
import FeedItem from "./FeedItem";
import {FETCH_FEED} from "../queries/Query";


class FeedList extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        const {page, loadPage} = this.props;
        return (
            <Query query={FETCH_FEED} variables={{filter: this.props.search,first: 10, skip: page}}>


                {({loading, error, data}) => {
                    if (loading)
                        return (<div>Loading...</div>);
                    if (error) {
                        console.log(error.graphQLErrors[0]);
                        return (<div>{error.graphQLErrors[0].message}</div>);
                    }
                    const feed = data.feed
                        .map((feedItem, index) => (<FeedItem
                            index={index}
                            key={feedItem.id}
                            feedItem={feedItem}
                            isAuth={this.props.isAuth}
                        />));
                    return (<Fragment><div>{feed}</div><button onClick={()=> loadPage()}>More</button></Fragment>)
                }}

            </Query>
        );
    }


}


export default FeedList;
