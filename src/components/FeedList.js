import React, {Component, Fragment} from 'react';
import {Query} from 'react-apollo';
import FeedItem from "./FeedItem";
import {FETCH_FEED} from "../queries/Query";
import {FEED_SORT_BY, PAGINATION_LIMIT} from "../Constants";


class FeedList extends Component {

    render() {

        const {search} = this.props;
        return (
            <Query query={FETCH_FEED} variables={{
                filter: search,
                orderBy: FEED_SORT_BY,
                first: PAGINATION_LIMIT
            }}
                   fetchPolicy="cache-and-network">


                {({loading, error, data, fetchMore}) => {
                    if (error) {
                        console.log(error.graphQLErrors[0]);
                        return (<div>{error.graphQLErrors[0].message}</div>);
                    }
                    let feed = [];
                    if (data && data.feed) {
                        feed = data.feed
                            .map((feedItem, index) => (<FeedItem
                                index={index}
                                key={feedItem.id}
                                feedItem={feedItem}
                                isAuth={this.props.isAuth}
                            />));
                        window.onscroll = () => {
                            const d = document.documentElement;
                            const offset = d.scrollTop + window.innerHeight;
                            const height = d.offsetHeight;
                            if (offset >= height) {
                                if (feed.length === data.count) return;
                                fetchMore({
                                    variables: {
                                        skip: feed.length
                                    },
                                    updateQuery: (prev, {fetchMoreResult}) => {
                                        if (!fetchMoreResult) return prev;
                                        return Object.assign({}, prev, {
                                            feed: [...prev.feed, ...fetchMoreResult.feed]
                                        });
                                    }
                                })
                            }

                        }
                    }

                    return (<Fragment>
                        <div>{feed}</div>
                        {data.count !== feed.length ? (<div style={{border: 'none'}}>More
                        </div>) : ''}
                        {!!loading ? (<p>Loading...</p>) : ('')}
                    </Fragment>)
                }}

            </Query>
        );
    }


}


export default FeedList;
