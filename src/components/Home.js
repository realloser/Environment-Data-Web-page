import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import Sources from '../components/Environment/Sources.jsx';

@inject("store")
@observer
export default class Home extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}

	render() {
		const store = this.store;
		return (
			<div className="home content">
				<h3>Available Sources</h3>
				<Sources />
			</div>
		)

	}
}
