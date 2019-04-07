import React from 'react';
import { StyleSheet } from 'react-native'
import { Container, Footer, FooterTab, Button, Text, Header, Tab, Tabs, ScrollableTab, TabHeading } from 'native-base';
import { connect } from "react-redux";
import _ from 'lodash'
import StatsList from 'components/common/StatsList'

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


	renderContent() {
		const { iexGainers, iexLosers, iexMostActive } = this.props
		return (
			<Tabs renderTabBar={() => <ScrollableTab tabsContainerStyle={styles.scrollableTabs} />}>
				<Tab heading={ 
						<TabHeading style={styles.tab}>
							<Text style={styles.tabText}>
								GAINERS
							</Text>
						</TabHeading>
					}>

					<StatsList
						data={iexGainers.data}
						refreshing={iexGainers.fetching}
						onRefresh={this.fetchGainers} />
				</Tab>
				<Tab heading={ 
						<TabHeading style={styles.tab}>
							<Text style={styles.tabText}>
								LOSERS
							</Text>
						</TabHeading>
					}>

					<StatsList
						data={iexLosers.data}
						refreshing={iexLosers.fetching}
						onRefresh={this.fetchLosers} />
				</Tab>
				<Tab heading={ 
						<TabHeading style={styles.tab}>
							<Text style={styles.tabText}>
								MOST ACTIVE
							</Text>
						</TabHeading>
					}>
					
					<StatsList
						data={iexMostActive.data}
						refreshing={iexMostActive.fetching}
						onRefresh={this.fetchMostActive} />
				</Tab>
			</Tabs>
		)
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
		requestIexMostActive: () => dispatch({ type: 'IEX_MOST_ACTIVE_REQUEST' })
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
	scrollableTabs: {
		backgroundColor: '#3a3a3a'
	},
	tab: {
		backgroundColor:"#3a3a3a"
	},
	tabActive: {
		backgroundColor:"#06dab4"
	},
	tabText: {
		color:'#fff',
		fontSize: 12
	},
	tabTextActive: {
		color:'#fff',
		fontWeight:'normal',
	},
	tabTextFont: {
		fontSize: 12
	},
  });