import React from 'react';
import { StyleSheet } from 'react-native'
import { Text, Tab, Tabs, TabHeading } from 'native-base';
import { connect } from "react-redux";
import _ from 'lodash'
import StatsList from 'components/common/StatsList'
import StatsDetailedSubScreen from 'screens/CurrentStatsScreen/StatsDetailedSubScreen'

export class StatsDetailedScreen extends React.Component {
	constructor() {
        super();
        this.state = {
            currentTabIndex: 0
        }
    }

	renderGainersTab() {
		const {
			detailedGainers, detailedLosers, detailedMostActive,
			fetchDetailedGainers, fetchDetailedLosers, fetchDetailedMostActive
		} = this.props
		return <StatsDetailedSubScreen
			param={'topGainers'}
			detailedGainers={detailedGainers}
			detailedLosers={detailedLosers}
			detailedMostActive={detailedMostActive}
			fetchDetailedGainers={fetchDetailedGainers}
			fetchDetailedLosers={fetchDetailedLosers}
			fetchDetailedMostActive={fetchDetailedMostActive}
		/>
	}

	renderLosersTab() {
		const {
			detailedGainers, detailedLosers, detailedMostActive,
			fetchDetailedGainers, fetchDetailedLosers, fetchDetailedMostActive
		} = this.props
		return <StatsDetailedSubScreen
			param={'topLosers'}
			detailedGainers={detailedGainers}
			detailedLosers={detailedLosers}
			detailedMostActive={detailedMostActive}
			fetchDetailedGainers={fetchDetailedGainers}
			fetchDetailedLosers={fetchDetailedLosers}
			fetchDetailedMostActive={fetchDetailedMostActive}
		/>
	}
	renderMostActiveTab() {
		const {
			detailedGainers, detailedLosers, detailedMostActive,
			fetchDetailedGainers, fetchDetailedLosers, fetchDetailedMostActive
		} = this.props
		return <StatsDetailedSubScreen
			param={'mostActive'}
			detailedGainers={detailedGainers}
			detailedLosers={detailedLosers}
			detailedMostActive={detailedMostActive}
			fetchDetailedGainers={fetchDetailedGainers}
			fetchDetailedLosers={fetchDetailedLosers}
			fetchDetailedMostActive={fetchDetailedMostActive}
		/>
	}


	render() {

		return (
			<Tabs locked={true} onChangeTab={({ i, from }) => {
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
		sectorCommunicationServices: state.sectorCommunicationServices,
		sectorConsumerDiscretionary: state.sectorConsumerDiscretionary,
		sectorConsumerStaples: state.sectorConsumerStaples,
		sectorEnergy: state.sectorEnergy,
		sectorFinancials: state.sectorFinancials,
		sectorHealthCare: state.sectorHealthCare,
		sectorIndustrials: state.sectorIndustrials,
		sectorMaterials: state.sectorMaterials,
		sectorRealEstate: state.sectorRealEstate,
		sectorTechnology: state.sectorTechnology,
		sectorUtilities: state.sectorUtilities
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