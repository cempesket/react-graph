import gql from 'graphql-tag';

// language=GraphQL
const FETCH_FEED = gql `query {

    feed {
        id
        url
        description
        author {
            name
            email
        }
    }}
`;

// language=GraphQL
const NEW_FEED = gql `mutation PostMutation($description: String!, $url: String!){
    postLink(description: $description, url: $url) {
        id
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
export {FETCH_FEED, NEW_FEED, LOGIN, SIGNUP}