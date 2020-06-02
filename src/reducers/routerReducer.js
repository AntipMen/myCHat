import React from "react";
import { connect } from "react-redux";
import { Route as OriginalRoute } from "react-router-dom";

export default function routerReducer(state, action) {
  if (state === undefined) {
    return { match: null };
  }
  if (action.type === "ROUTE") {
    return { match: action.match };
  }
  return state;
}

function actionRouteToRedux(match) {
  return {
    type: "ROUTE",
    match,
  };
}

let CRoute = (
  p //action - actionCreator to push into redux
) => (
  <OriginalRoute
    {...p}
    component={(pp) => {
      let OriginalPage = p.component;
      p.action(pp.match);
      return <OriginalPage {...pp} />;
    }}
  />
);

export const Route = connect(null, { action: actionRouteToRedux })(CRoute);

// let App = () => (
//   <Provider store={store}>
//     <Router history={createHistory()}>
//       <div>
//         <Route
//           path="/chat/:param1/:param2"
//           component={(p) => <div>CHAT</div>}
//         />
//         <Route path="/" component={(p) => <div>MAIN</div>} exact />
//       </div>
//     </Router>
//   </Provider>
// );
