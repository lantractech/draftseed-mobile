import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { Content, Text, List, Button, Spinner } from 'native-base';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import ListItemStock from 'components/common/ListItemStock'
import * as num from 'helpers/numbers'
import _ from 'lodash'
import { connect } from "react-redux";

export class CurrentStats extends React.Component {
    constructor() {
        super();
        this.state = {
            refreshing: false,
            activeItem: 'mostActive',
            data: [],
            tabOptions: []
        }
    }

    componentDidMount() {
        this._mounted = true;
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.activeName !== this.props.activeName) {
            if (this._mounted) { this.setState({ data: [] }) }
            this.fetchData()
        }
        else if (
            prevProps.sectorCommunicationServices.data !== this.props.sectorCommunicationServices.data ||
            prevProps.sectorConsumerDiscretionary.data !== this.props.sectorConsumerDiscretionary.data ||
            prevProps.sectorConsumerStaples.data !== this.props.sectorConsumerStaples.data ||
            prevProps.sectorEnergy.data !== this.props.sectorEnergy.data ||
            prevProps.sectorFinancials.data !== this.props.sectorFinancials.data ||
            prevProps.sectorHealthCare.data !== this.props.sectorHealthCare.data ||
            prevProps.sectorIndustrials.data !== this.props.sectorIndustrials.data ||
            prevProps.sectorMaterials.data !== this.props.sectorMaterials.data ||
            prevProps.sectorRealEstate.data !== this.props.sectorRealEstate.data ||
            prevProps.sectorTechnology.data !== this.props.sectorTechnology.data ||
            prevProps.sectorUtilities.data !== this.props.sectorUtilities.data
        ) {
            this.updateData()
        }
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    fetchData = () => {
        const { activeName } = this.props
        _.forEach(sectors, (sector) => {
            if (sector.showResult && sectorMap[sector.name]) {
                this.props[sectorMap[sector.name]["request"]](activeName)
            }
        })
    }

    updateData() {
        const { activeName } = this.props
        let data = _.concat(
            this.props.sectorCommunicationServices.data,
            this.props.sectorConsumerDiscretionary.data,
            this.props.sectorConsumerStaples.data,
            this.props.sectorEnergy.data,
            this.props.sectorFinancials.data,
            this.props.sectorHealthCare.data,
            this.props.sectorIndustrials.data,
            this.props.sectorMaterials.data,
            this.props.sectorRealEstate.data,
            this.props.sectorTechnology.data,
            this.props.sectorUtilities.data
        )

        if (activeName === "topGainers") {
            let newData = this.sortByReverse(data, 'changePercent')
            if (this._mounted) { this.setState({ data: newData }) }
        }
        else if (activeName === "topLosers") {
            let newData = this.sortBy(data, 'changePercent')
            if (this._mounted) { this.setState({ data: newData }) }
        }
        else if (activeName === "mostActive") {
            let newData = this.sortByReverse(data, 'latestVolume')
            if (this._mounted) { this.setState({ data: newData }) }
        }

    }

    sortBy = (data, field) => {
        return _.slice(_.sortBy(data, [field]), 0, 40)
    }

    sortByReverse = (data, field) => {
        return _.slice(_.reverse(_.sortBy(data, [field])), 0, 40)
    }


    keyExtractor = (item, index) => item.symbol;

    _onRefresh = () => {
        if (this._mounted) {
            this.setState({ refreshing: true, data: [] }, () => {
                this.fetchData()
            });
        }
    }

    onSwipeLeft(gestureState) {
        this.setState({ myText: 'You swiped left!' });
    }

    onSwipeRight(gestureState) {
        this.setState({ myText: 'You swiped right!' });
    }

    renderRow() {
        const { data } = this.props
        if (_.isEmpty(data)) { return null }
        return this.props.refreshing ? <Spinner /> : <FlatList
            data={data}
            keyExtractor={this.keyExtractor}
            onRefresh={this._onRefresh.bind(this)}
            refreshing={refreshing}
            renderItem={({ item }) => {
                return <ListItemStock item={item} />
            }}

        />
    }


    render() {
        const { data, refreshing } = this.props;
        if (refreshing) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color='white' />
                </View>
            )
        }

        return _.isEmpty(data) ?
            (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Button rounded light >
                        <Text>Refresh</Text>
                    </Button>
                </View>
            ) :
            (
                <GestureRecognizer
                    onSwipeLeft={(state) => this.onSwipeLeft(state)}
                    onSwipeRight={(state) => this.onSwipeRight(state)}>
                    <View style={{ backgroundColor: 'black', flex: 1 }}>
                        {this.renderRow()}
                    </View>
                </GestureRecognizer>
            )
    }
}

const mapStateToProps = state => {
    return {
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

const mapDispatchToProps = dispatch => {
    return {
        requestSectorCommunicationServices: (param) => dispatch({ type: 'SECTOR_COMMUNICATION_SERVICES_REQUEST', param }),
        requestSectorConsumerDiscretionary: (param) => dispatch({ type: 'SECTOR_CONSUMER_DISCRETIONARY_REQUEST', param }),
        requestSectorConsumerStaples: (param) => dispatch({ type: 'SECTOR_CONSUMER_STAPLES_REQUEST', param }),
        requestSectorEnergy: (param) => dispatch({ type: 'SECTOR_ENERGY_REQUEST', param }),
        requestSectorFinancials: (param) => dispatch({ type: 'SECTOR_FINANCIALS_REQUEST', param }),
        requestSectorHealthCare: (param) => dispatch({ type: 'SECTOR_HEALTH_CARE_REQUEST', param }),
        requestSectorIndustrials: (param) => dispatch({ type: 'SECTOR_INDUSTRIALS_REQUEST', param }),
        requestSectorMaterials: (param) => dispatch({ type: 'SECTOR_MATERIALS_REQUEST', param }),
        requestSectorRealEstate: (param) => dispatch({ type: 'SECTOR_REAL_ESTATE_REQUEST', param }),
        requestSectorTechnology: (param) => dispatch({ type: 'SECTOR_TECHNOLOGY_REQUEST', param }),
        requestSectorUtilities: (param) => dispatch({ type: 'SECTOR_UTILITIES_REQUEST', param })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentStats);