import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import LazyRoute from "lazy-route";
import DevTools from "mobx-react-devtools";

import TopBar from "./TopBar";

@withRouter
@inject("store")
@observer
export default class App extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}
	componentDidMount() {
		this.authenticate();
	}
	authenticate(e) {
		if (e) e.preventDefault();
		this.store.appState.authenticate();
	}
	render() {
		const {
			authenticated,
			authenticating,
			timeToRefresh,
			refreshToken,
			testval
		} = this.store.appState;
		return (
			<div className="wrapper">
				{/*<DevTools />*/}
				<TopBar />

				<Route
					exact
					path="/"
					render={props => (
						<LazyRoute {...props} component={import("./Home")} />
					)}
				/>
				<footer>
					<span>See here envrionment data collected using Arduino, Mosquitto, AWS IoT, DynamoDB, API Gateway and AWS Lambda</span>
				</footer>
			</div>
		);
	}
}
