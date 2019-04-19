import React from 'react';
import { StyleSheet } from 'react-native'
import { Container, Footer, FooterTab, Button, Text } from 'native-base';
import StatsQuickScreen from './StatsQuickScreen'
import StatsDetailedScreen from './StatsDetailedScreen'
import { connect } from "react-redux";
import _ from 'lodash'

export class CurrentStatsScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			activeName: 'quickStats',
			tabOptions: ['quickStats', 'detailedStats']
		}
		this._updating = false
	}

	componentDidMount() {
		this._mounted = true;
		this.fetchGainers()
		this.fetchLosers()
		this.fetchMostActive()
		this.fetchDetailedGainers()
		this.fetchDetailedLosers()
		this.fetchDetailedMostActive()
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	fetchGainers = () => {
		this.props.requestIexGainers()
	}

	fetchLosers = () => {
		this.props.requestIexLosers()
	}

	fetchMostActive = () => {
		this.props.requestIexMostActive()
	}

	fetchDetailedGainers = () => {
		this.props.requestDetailedGainers()
	}

	fetchDetailedLosers = () => {
		this.props.requestDetailedLosers()
	}

	fetchDetailedMostActive = () => {
		this.props.requestDetailedMostActive()
	}


	renderContent() {
		const { activeName } = this.state;
		if (activeName === 'detailedStats') {
			return <StatsDetailedScreen
				fetchDetailedLosers={this.fetchDetailedLosers.bind(this)}
				fetchDetailedGainers={this.fetchDetailedGainers.bind(this)}
				fetchDetailedMostActive={this.fetchDetailedMostActive.bind(this)}
			/>
		}
		return <StatsQuickScreen
			fetchLosers={this.fetchLosers.bind(this)}
			fetchGainers={this.fetchGainers.bind(this)}
			fetchMostActive={this.fetchMostActive.bind(this)}
		/>
	}

	getButtonStyle = (tabIsActive) => {
		return tabIsActive
			? styles.footerButtonActive
			: styles.footerButton
	}
	getButtonTextStyle = (tabIsActive) => {
		return tabIsActive
			? styles.footerButtonTextActive
			: styles.footerButtonText
	}

	renderFooterButtons = () => {
		const { activeName } = this.state;
		const quickStatsSelected = activeName === 'quickStats'
		const detailedStatsSelected = activeName === 'detailedStats'

		return (
			<FooterTab>
				<Button active={quickStatsSelected}
					style={this.getButtonStyle(quickStatsSelected)}
					onPress={() => this.setState({ activeName: 'quickStats' })}>
					<Text style={this.getButtonTextStyle(quickStatsSelected)}>Quick</Text>
				</Button>
				<Button active={detailedStatsSelected}
					style={this.getButtonStyle(detailedStatsSelected)}
					onPress={() => this.setState({ activeName: 'detailedStats' })}>
					<Text style={this.getButtonTextStyle(detailedStatsSelected)}>Detailed</Text>
				</Button>
			</FooterTab>
		)
	}

	render() {
		return (
			<Container>
				{this.renderContent()}
				<Footer>
					{this.renderFooterButtons()}
				</Footer>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		iexGainers: state.iexGainers,
		iexLosers: state.iexLosers,
		iexMostActive: state.iexMostActive
	};
};

const mapDispatchToProps = dispatch => {
	return {
		requestIexGainers: () => dispatch({ type: 'IEX_GAINERS_REQUEST' }),
		requestIexLosers: () => dispatch({ type: 'IEX_LOSERS_REQUEST' }),
		requestIexMostActive: () => dispatch({ type: 'IEX_MOST_ACTIVE_REQUEST' }),
		requestDetailedGainers: () => dispatch({ type: 'API_DETAILED_GAINERS_REQUEST' }),
		requestDetailedLosers: () => dispatch({ type: 'API_DETAILED_LOSERS_REQUEST' }),
		requestDetailedMostActive: () => dispatch({ type: 'API_DETAILED_MOST_ACTIVE_REQUEST' })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentStatsScreen);

const styles = StyleSheet.create({
	footerButton: {
		backgroundColor: '#3a3a3a'
	},
	footerButtonActive: {
		backgroundColor: '#06dab4'
	},
	footerButtonText: {
		color: '#eee',
		fontWeight: 'bold',
		fontSize: 13
	},
	footerButtonTextActive: {
		color: '#333',
		fontWeight: 'bold',
		fontSize: 13
	},
	tabText: {
		color: '#fff',
		fontSize: 12
	}
});