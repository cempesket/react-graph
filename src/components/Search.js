import React from 'react'
import {debounce} from "../utils/utils";

const search = ({search}) => {
    return (<input type="text" placeholder='search' onChange={(e) => {
        debounce(search, 1000)(e.target.value)
    }}/>)
};
export default search;

