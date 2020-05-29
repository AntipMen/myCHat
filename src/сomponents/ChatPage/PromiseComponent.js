import React, { Component } from "react";

const getGQL = (url, headers = {}) => (query = "", variables = {}) =>

fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
  }).then((res) => res.json());

let GQL = getGQL("http://chat.fs.a-level.com.ua/graphql", {
  Authorization: "Bearer " + localStorage.authToken,
});

class PromiseComponent extends Component {
 
  state = {
    status: "PENDING",
    payload: null,
    error: null,
  };
  render() {

    const p = this.state;
    const setP = this.setState.bind(this);

    //console.log(this.props);

    const { Pending, Resolved, Rejected, promise } = this.props;

    if (p.status === "PENDING") {
      promise.then(
        (payload) => setP({ status: "RESOLVED", payload, error: null }),
        (error) => setP({ status: "REJECTED", payload: null, error })
      );
      return <Pending />;
    }
    if (p.status === "RESOLVED") {
      return <Resolved payload={p.payload} />;
    }
    if (p.status === "REJECTED") {
      return <Rejected error={p.error} />;
    }
  }
}

class P extends Component {
  render() {
    return (
      <>
        <div>
          <img
            src="https://cdn.charmingsardinia.com/sites/all/themes/charming/img/loader.gif"
            alt="foto"
            width="100"
          />
        </div>
      </>
    );
  }
}

const CError = ({ error }) => <pre>ERROR {JSON.stringify(error, null, 4)}</pre>;

export { GQL, PromiseComponent, P, CError};
