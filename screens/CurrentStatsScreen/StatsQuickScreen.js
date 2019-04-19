import React from 'react';
import { StyleSheet } from 'react-native'
import { Text, Tab, Tabs, TabHeading } from 'native-base';
import { connect } from "react-redux";
import _ from 'lodash'
import StatsList from 'components/common/StatsList'

export class StatsQuickScreen extends React.Component {

	sortBy = (data, field) => {
        return _.slice(_.sortBy(data, [field]), 0, 40)
    }

    sortByReverse = (data, field) => {
        return _.slice(_.reverse(_.sortBy(data, [field])), 0, 40)
    }

	render() {
		const {
			iexGainers, iexLosers, iexMostActive,
			fetchGainers, fetchLosers, fetchMostActive
		} = this.props

		const gainers = this.sortByReverse(iexGainers.data, 'changePercent')
		const losers = this.sortBy(iexLosers.data, 'changePercent')
		const mostActive = this.sortByReverse(iexMostActive.data, 'latestVolume')
		
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
						data={gainers}
						refreshing={iexGainers.fetching}
						onRefresh={fetchGainers} />
				</Tab>
				<Tab heading={ 
						<TabHeading style={styles.tab}>
							<Text style={styles.tabText}>
								LOSERS
							</Text>
						</TabHeading>
					}>

					<StatsList
						data={losers}
						refreshing={iexLosers.fetching}
						onRefresh={fetchLosers} />
				</Tab>
				<Tab heading={ 
						<TabHeading style={styles.tab}>
							<Text style={styles.tabText}>
								MOST ACTIVE
							</Text>
						</TabHeading>
					}>
					
					<StatsList
						data={mostActive}
						refreshing={iexMostActive.fetching}
						onRefresh={fetchMostActive} />
				</Tab>
			</Tabs>
		)
	}
}

const mapStateToProps = state => {
	return {
		iexGainers: state.iexGainers,
		iexLosers: state.iexLosers,
		iexMostActive: state.iexMostActive
	};
};

export default connect(mapStateToProps)(StatsQuickScreen);

const styles = StyleSheet.create({
	tab: {
		backgroundColor:"#3a3a3a"
	},
	tabText: {
		color:'#fff',
		fontSize: 12
	},
  });