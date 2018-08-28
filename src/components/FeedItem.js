import React from 'react'

const FeedItem = ({feedItem}) => {
    return (<div>
        <hr/>
        <div key={feedItem.id}>
            {feedItem.description} ({feedItem.url})
        </div>
        <p>{feedItem.author.name}</p>
        <p>{feedItem.author.email}</p>
        <hr/>
    </div>)
};

export default FeedItem;