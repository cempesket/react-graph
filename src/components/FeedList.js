import React, {Component} from 'react';
import {Query} from 'react-apollo';
import FeedItem from "./FeedItem";
import {FETCH_FEED} from "../queries/Query";


class FeedList extends Component {
    render() {
        return (
            <Query query={FETCH_FEED}>
                {({loading, error, data}) => {
                    if (loading)
                        return (<div>Loading...</div>);
                    if (error){
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
                    return (<div>{feed}</div>)
                }}

            </Query>
        );
    }


}


export default FeedList;
