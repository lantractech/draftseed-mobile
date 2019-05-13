import React from 'react';
import { StyleSheet } from 'react-native'
import { Text, Tab, Tabs, TabHeading } from 'native-base';
import { connect } from "react-redux";
import _ from 'lodash'
import StatsDetailedSubScreen from 'screens/CurrentStatsScreen/StatsDetailedSubScreen'

export class StatsDetailedScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			currentTabIndex: 0
		}
	}

	renderGainersTab() {
		return <StatsDetailedSubScreen
			param={'topGainers'}
		/>
	}

	renderLosersTab() {
		return <StatsDetailedSubScreen
			param={'topLosers'}
		/>
	}
	renderMostActiveTab() {
		return <StatsDetailedSubScreen
			param={'mostActive'}
		/>
	}


	render() {

		return (
			<Tabs
				locked={true}
				style={{height: 30}}
				onChangeTab={({ i, from }) => {
					this.setState({ currentTabIndex: i })
				}}>
				<Tab heading={
					<TabHeading style={styles.tab}>
						<Text style={styles.tabText}>
							GAINERS
							</Text>
					</TabHeading>
				}>
					{this.state.currentTabIndex === 0 && this.renderGainersTab()}

				</Tab>
				<Tab heading={
					<TabHeading style={styles.tab}>
						<Text style={styles.tabText}>
							LOSERS
							</Text>
					</TabHeading>
				}>
					{this.state.currentTabIndex === 1 && this.renderLosersTab()}

				</Tab>
				<Tab heading={
					<TabHeading style={styles.tab}>
						<Text style={styles.tabText}>
							MOST ACTIVE
							</Text>
					</TabHeading>
				}>
					{this.state.currentTabIndex === 2 && this.renderMostActiveTab()}

				</Tab>
			</Tabs>
		)
	}
}

const mapStateToProps = state => {
	return {
		detailedGainers: state.detailedGainers,
		detailedLosers: state.detailedLosers,
		detailedMostActive: state.detailedMostActive,
	};
};

export default connect(mapStateToProps)(StatsDetailedScreen);

const styles = StyleSheet.create({
	tab: {
		backgroundColor: "#3a3a3a"
	},
	tabText: {
		color: '#fff',
		fontSize: 12
	},
});