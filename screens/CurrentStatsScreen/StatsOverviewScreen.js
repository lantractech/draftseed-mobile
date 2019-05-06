import React from 'react';
import { connect } from "react-redux";
import _ from 'lodash'
import SectorList from 'components/common/SectorList'

export class StatsOverviewScreen extends React.Component {

	render() {
		const {
			iexOverview, fetchOverview,
		} = this.props
		
		return (
			<SectorList
						data={iexOverview.data}
						refreshing={iexOverview.fetching}
						onRefresh={fetchOverview} />
		)
	}
}

const mapStateToProps = state => {
	return {
		iexOverview: state.iexOverview
	};
};

export default connect(mapStateToProps)(StatsOverviewScreen);
