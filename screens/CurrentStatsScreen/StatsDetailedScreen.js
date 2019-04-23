import React from 'react';
import { StyleSheet } from 'react-native'
import { Text, Tab, Tabs, TabHeading } from 'native-base';
import { connect } from "react-redux";
import _ from 'lodash'
import StatsList from 'components/common/StatsList'
import StatsDetailedSubScreen from 'screens/CurrentStatsScreen/StatsDetailedSubScreen'

export class StatsDetailedScreen extends React.Component {

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
		const {
			detailedGainers, detailedLosers, detailedMostActive,
			fetchDetailedGainers, fetchDetailedLosers, fetchDetailedMostActive
		} = this.props

		return (
			<Tabs locked={true}>
				<Tab heading={
					<TabHeading style={styles.tab}>
						<Text style={styles.tabText}>
							GAINERS
							</Text>
					</TabHeading>
				}>
					{this.renderGainersTab()}

					{/* <StatsList
						data={detailedGainers.data}
						refreshing={detailedGainers.fetching}
						onRefresh={fetchDetailedGainers} /> */}
				</Tab>
				<Tab heading={
					<TabHeading style={styles.tab}>
						<Text style={styles.tabText}>
							LOSERS
							</Text>
					</TabHeading>
				}>
					{this.renderLosersTab()}
					{/* <StatsList
						data={detailedLosers.data}
						refreshing={detailedLosers.fetching}
						onRefresh={fetchDetailedLosers} /> */}
				</Tab>
				<Tab heading={
					<TabHeading style={styles.tab}>
						<Text style={styles.tabText}>
							MOST ACTIVE
							</Text>
					</TabHeading>
				}>
					{this.renderMostActiveTab()}
					{/* <StatsList
						data={detailedMostActive.data}
						refreshing={detailedMostActive.fetching}
						onRefresh={fetchDetailedMostActive} /> */}
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