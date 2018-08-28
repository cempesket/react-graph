import React from 'react'
import Mutation from "react-apollo/Mutation";
import {FETCH_FEED, VOTE} from "../queries/Query";

const FeedItem = ({feedItem, index}) => {

    const auth = localStorage.getItem('token');
    return (<div className="flex mt2 items-start">
        <div className="flex items-center">
            <span className="gray">{index + 1}.</span>
            <Mutation mutation={VOTE} variables={{linkId: feedItem.id}} refetchQueries={[ { query: FETCH_FEED }]}>
                {(mutate) => {
                    return auth && (
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

function timeDifference(current, previous) {
    const milliSecondsPerMinute = 60 * 1000;
    const milliSecondsPerHour = milliSecondsPerMinute * 60;
    const milliSecondsPerDay = milliSecondsPerHour * 24;
    const milliSecondsPerMonth = milliSecondsPerDay * 30;
    const milliSecondsPerYear = milliSecondsPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < milliSecondsPerMinute / 3) {
        return 'just now'
    }

    if (elapsed < milliSecondsPerMinute) {
        return 'less than 1 min ago'
    } else if (elapsed < milliSecondsPerHour) {
        return Math.round(elapsed / milliSecondsPerMinute) + ' min ago'
    } else if (elapsed < milliSecondsPerDay) {
        return Math.round(elapsed / milliSecondsPerHour) + ' h ago'
    } else if (elapsed < milliSecondsPerMonth) {
        return Math.round(elapsed / milliSecondsPerDay) + ' days ago'
    } else if (elapsed < milliSecondsPerYear) {
        return Math.round(elapsed / milliSecondsPerMonth) + ' mo ago'
    } else {
        return Math.round(elapsed / milliSecondsPerYear) + ' years ago'
    }
}

export function timeDifferenceForDate(date) {
    const now = new Date().getTime();
    const updated = new Date(date).getTime();
    return timeDifference(now, updated)
}

export default FeedItem;