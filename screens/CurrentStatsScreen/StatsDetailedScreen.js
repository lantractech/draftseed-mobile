import React from 'react';
import { StyleSheet } from 'react-native'
import { Text, Tab, Tabs, TabHeading } from 'native-base';
import { connect } from "react-redux";
import _ from 'lodash'
import StatsList from 'components/common/StatsList'

export class StatsDetailedScreen extends React.Component {

	render() {
		const {
			detailedGainers, detailedLosers, detailedMostActive,
			fetchDetailedGainers, fetchDetailedLosers, fetchDetailedMostActive
		} = this.props
		
		return (
			<Tabs>
				<Tab heading={ 
						<TabHeading style={styles.tab}>
							<Text style={styles.tabText}>
								GAINERS
							</Text>
						</TabHeading>
					}>

					<StatsList
						data={detailedGainers.data}
						refreshing={detailedGainers.fetching}
						onRefresh={fetchDetailedGainers} />
				</Tab>
				<Tab heading={ 
						<TabHeading style={styles.tab}>
							<Text style={styles.tabText}>
								LOSERS
							</Text>
						</TabHeading>
					}>

					<StatsList
						data={detailedLosers.data}
						refreshing={detailedLosers.fetching}
						onRefresh={fetchDetailedLosers} />
				</Tab>
				<Tab heading={ 
						<TabHeading style={styles.tab}>
							<Text style={styles.tabText}>
								MOST ACTIVE
							</Text>
						</TabHeading>
					}>
					
					<StatsList
						data={detailedMostActive.data}
						refreshing={detailedMostActive.fetching}
						onRefresh={fetchDetailedMostActive} />
				</Tab>
			</Tabs>
		)
	}
}

const mapStateToProps = state => {
	return {
		detailedGainers: state.detailedGainers,
		detailedLosers: state.detailedLosers,
		detailedMostActive: state.detailedMostActive
	};
};

export default connect(mapStateToProps)(StatsDetailedScreen);

const styles = StyleSheet.create({
	tab: {
		backgroundColor:"#3a3a3a"
	},
	tabText: {
		color:'#fff',
		fontSize: 12
	},
  });