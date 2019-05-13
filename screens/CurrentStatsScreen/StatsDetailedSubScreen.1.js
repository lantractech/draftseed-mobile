import React from 'react';
import { StyleSheet } from 'react-native'
import { Text, Tab, Tabs, TabHeading, ScrollableTab } from 'native-base';
import { connect } from "react-redux";
import _ from 'lodash'
import StatsList from 'components/common/StatsList'

export class StatsDetailedSubScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            currentTabIndex: 0
        }

        this.SECTORS = [
            { name: "Technology", mapping: "sectorTechnology", request: () => this.fetchSectorTechnology() },
            { name: "Financials", mapping: "sectorFinancials", request: () => this.fetchSectorFinancials() },
            { name: "Industrials", mapping: "sectorIndustrials", request: () => this.fetchSectorIndustrials() },
            { name: "Energy", mapping: "sectorEnergy", request: () => this.fetchSectorEnergy() },
            { name: "Communication Services", mapping: "sectorCommunicationServices", request: () => this.fetchSectorCommunicationServices() },
            { name: "Consumer Discretionary", mapping: "sectorConsumerDiscretionary", request: () => this.fetchSectorConsumerDiscretionary() },
            { name: "Materials", mapping: "sectorMaterials", request: () => this.fetchSectorMaterials() },
            { name: "Health Care", mapping: "sectorHealthCare", request: () => this.fetchSectorHealthCare() },
            { name: "Consumer Staples", mapping: "sectorConsumerStaples", request: () => this.fetchSectorConsumerStaples() },
            { name: "Utilities", mapping: "sectorUtilities", request: () => this.fetchSectorUtilities() },
            { name: "Real Estate", mapping: "sectorRealEstate", request: () => this.fetchSectorRealEstate() }
        ]
    }

    fetchSectorCommunicationServices() {
        this.props.requestSectorCommunicationServices(this.props.param)
    }
    fetchSectorConsumerDiscretionary() {
        this.props.requestSectorConsumerDiscretionary(this.props.param)
    }
    fetchSectorConsumerStaples() {
        this.props.requestSectorConsumerStaples(this.props.param)
    }
    fetchSectorEnergy() {
        this.props.requestSectorEnergy(this.props.param)
    }
    fetchSectorFinancials() {
        this.props.requestSectorFinancials(this.props.param)
    }
    fetchSectorHealthCare() {
        this.props.requestSectorHealthCare(this.props.param)
    }
    fetchSectorIndustrials() {
        this.props.requestSectorIndustrials(this.props.param)
    }
    fetchSectorMaterials() {
        this.props.requestSectorMaterials(this.props.param)
    }
    fetchSectorRealEstate() {
        this.props.requestSectorRealEstate(this.props.param)
    }
    fetchSectorTechnology() {
        this.props.requestSectorTechnology(this.props.param)
    }
    fetchSectorUtilities() {
        this.props.requestSectorUtilities(this.props.param)
    }

    fetchData(i, from) {
        if (i > 0) {
            const index = i - 1
            this.SECTORS[index]['request']()
            // if (_.isEmpty(this.props[this.SECTORS[index]['mapping']]['data'])) { //current
            //     this.SECTORS[index]['request']()
            // }
            // if (!_.isEmpty(this.SECTORS[index + 1])){ //pre-load next tab
            //     this.SECTORS[index + 1]['request']()
            // }
            // if (index > 0 && !_.isEmpty(this.SECTORS[index - 1])){ //pre-load previous tab
            //     this.SECTORS[index - 1]['request']()
            // }
        }
    }

    renderAllTab() {
        const {
            param, detailedGainers, detailedLosers, detailedMostActive,
            fetchDetailedGainers, fetchDetailedLosers, fetchDetailedMostActive
        } = this.props
        if (param === 'topGainers') {
            return <StatsList
                data={detailedGainers.data}
                refreshing={detailedGainers.fetching}
                onRefresh={fetchDetailedGainers}
            />
        }
        else if (param === 'topLosers') {
            return <StatsList
                data={detailedLosers.data}
                refreshing={detailedLosers.fetching}
                onRefresh={fetchDetailedLosers}
            />
        }
        else if (param === 'mostActive') {
            return <StatsList
                data={detailedMostActive.data}
                refreshing={detailedMostActive.fetching}
                onRefresh={fetchDetailedMostActive}
            />
        }
    }

    renderTabData(obj, sectorIndex) {
        const { currentTabIndex } = this.state
        if (currentTabIndex === sectorIndex + 1) {
            return (
                <StatsList
                    data={this.props[obj.mapping].data}
                    refreshing={this.props[obj.mapping].fetching}
                    onRefresh={obj.request}
                />
            )
        }
    }

    renderSectorTabs() {
        return _.map(this.SECTORS, (obj, sectorIndex) => {
            return (
                <Tab key={obj.name} heading={
                    <TabHeading style={styles.tab}>
                        <Text style={styles.tabText}>{obj.name}</Text>
                    </TabHeading>
                }>
                    {this.renderTabData(obj, sectorIndex)}
                </Tab>
            )
        })
    }


    render() {

        return (
            <Tabs
                // prerenderingSiblingsNumber={1}
                scrollWithoutAnimation={true}
                tabBarUnderlineStyle={styles.underline}
                onChangeTab={({ i, from }) => {
                    this.setState({ currentTabIndex: i })
                    this.fetchData(i, from)
                }}
                renderTabBar={() => <ScrollableTab />}>
                <Tab heading={
                    <TabHeading style={styles.tab}>
                        <Text style={styles.tabText}>All</Text>
                    </TabHeading>
                }>
                    {this.renderAllTab()}
                </Tab>
                {this.renderSectorTabs()}
            </Tabs>
        )
    }
}

const mapStateToProps = state => {
    return {
        detailedGainers: state.detailedGainers,
        detailedLosers: state.detailedLosers,
        detailedMostActive: state.detailedMostActive,
        sectorTechnology: state.sectorTechnology,
        sectorEnergy: state.sectorEnergy,
        sectorFinancials: state.sectorFinancials,
        sectorHealthCare: state.sectorHealthCare,
        sectorIndustrials: state.sectorIndustrials,
        sectorMaterials: state.sectorMaterials,
        sectorRealEstate: state.sectorRealEstate,
        sectorUtilities: state.sectorUtilities,
        sectorCommunicationServices: state.sectorCommunicationServices,
        sectorConsumerDiscretionary: state.sectorConsumerDiscretionary,
        sectorConsumerStaples: state.sectorConsumerStaples,
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

export default connect(mapStateToProps, mapDispatchToProps)(StatsDetailedSubScreen);

const styles = StyleSheet.create({
    tab: {
        backgroundColor: "#ddd"
    },
    tabText: {
        color: '#333',
        fontSize: 12
    },
    underline: {
        backgroundColor: '#555'
    }
});