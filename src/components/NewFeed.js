import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import {NEW_FEED} from "../queries/Query";
//import {FETCH_FEED} from "./FeedList";




class NewFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            description: ""
        }
    }

    render() {
        const {url, description} = this.state;
        return (
            <div>
                <div className="flex flex-column mt3">
                    <input className="mb2" type="text" placeholder="Url"
                           value={url}
                           onChange={e => this.setState({url: e.target.value})}/>
                    <input className="mb2" type="text" placeholder="Description"
                           value={description}
                           onChange={e => this.setState({description: e.target.value})}/>
                </div>
                <Mutation mutation={NEW_FEED} variables={{description, url}}
                          onCompleted={()=> this.props.history.push('/', {})}
                onError={(error)=> alert(error.graphQLErrors[0].message)  }>
                    {(postMutation, {loading, error, data}) => {

                        return (<button onClick={postMutation}>{loading ? 'loading...' : '+'}</button>)
                    }}
                </Mutation>

            </div>
        );
    }
}


export default NewFeed;
