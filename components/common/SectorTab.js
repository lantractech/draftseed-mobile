import React from 'react';
import { Text, Tab, TabHeading } from 'native-base'
import _ from 'lodash'
import { StyleSheet } from 'react-native'
import StatsList from 'components/common/StatsList'

export default class SectorTab extends React.PureComponent {

    render() {
        const { obj, data, refreshing, onRefresh } = this.props

        return (
            <Tab key={obj.name} heading={
                <TabHeading style={styles.tab}>
                    <Text style={styles.tabText}>{obj.name}</Text>
                </TabHeading>
            }>
                <StatsList
                    data={data}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            </Tab>
        )
    }
}

StatsList.defaultProps = {
    data: [],
    refreshing: false
}

const styles = StyleSheet.create({
    tab: {
        backgroundColor: "#ddd"
    },
    tabText: {
        color: '#333',
        fontSize: 12
    }
});