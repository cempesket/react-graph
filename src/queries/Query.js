import gql from 'graphql-tag';

// language=GraphQL
const FETCH_FEED = gql `query Feed($filter: String,$skip: Int,$first: Int){

    feed(filter:$filter, orderBy:createdAt_DESC,skip:$skip,first:$first) {
        id
        url
        description
        createdAt
        author {
            name
            email
        }
        votes {
            createdAt
        }
    }}
`;

// language=GraphQL
const NEW_FEED = gql `mutation PostMutation($description: String!, $url: String!){
    postLink(description: $description, url: $url) {
        id
        url
        description
        createdAt
        author {
            name
            email
        }
        votes {
            createdAt
        }
    }
}`;

// language=GraphQL
const LOGIN = gql `mutation PostMutation($email: String!, $password: String!){
    login(email: $email, password:$password) {
        token
        user {id}
    }
}`;

// language=GraphQL
const SIGNUP = gql `mutation PostMutation($name: String!,$email: String!, $password: String!){
    signup(name:$name, email: $email, password:$password) {
        token
        user {id}
    }
}`;

// language=GraphQL
const VOTE = gql `mutation PostMutation($linkId: ID!){
    createVote(linkId:$linkId) {
        createdAt
        link {id votes {createdAt}}

    }
}`;

export {FETCH_FEED, NEW_FEED, LOGIN, SIGNUP, VOTE}