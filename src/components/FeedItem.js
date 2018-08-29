import React from 'react'
import Mutation from "react-apollo/Mutation";
import {VOTE} from "../queries/Query";
import {timeDifferenceForDate} from "../utils/utils";

const FeedItem = ({feedItem, index,isAuth}) => {

    return (<div className="flex mt2 items-start">
        <div className="flex items-center">
            <span className="gray">{index + 1}.</span>
            <Mutation mutation={VOTE} variables={{linkId: feedItem.id}}
                      onCompleted={(data) => console.log(data)}
            >
                {(mutate) => {
                    return isAuth && (
                        <div className="ml1 gray f11" onClick={mutate}>
                            ▲
                        </div>
                    )
                }}
            </Mutation>
        </div>
        <div className="ml1">
            <div>
                {feedItem.description} ({feedItem.url})
            </div>
            <div className="f6 lh-copy gray">
                {feedItem.votes.length} votes | by{' '}
                {feedItem.author
                    ? feedItem.author.name
                    : 'Unknown'}{' '}
                {timeDifferenceForDate(feedItem.createdAt)}
            </div>
        </div>
    </div>)
};



export default FeedItem;