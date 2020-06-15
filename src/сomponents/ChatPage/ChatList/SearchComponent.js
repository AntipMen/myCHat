import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionSearch } from "../../../actions/actionSearch";

export const SearchInput = connect(
  ({ search: { query } }) => ({ value: query, placeholder: "Search..." }),
  {
    onChange(event) {
      return actionSearch(event.target.value);
    },
  }
)("input");

const array = [
  { _id: "5e25df7f1719bf13be585723", login: "test2", nick: "" },
  { _id: "5e25e0a41719bf13be585729", login: "test3", nick: "" },
];

const SearchResult = ({ users = array }) => (
  <div style={{ border: "2px solid black" }}>
    {users.map((user) => (
      <div>
        <Link to={`/user/${user._id}`}>
          {user.login} ({user.nick})
        </Link>
      </div>
    ))}
  </div>
);

export const CSearchResult = connect(({ search: { result } }) => ({
  users: result || [],
}))(SearchResult);
