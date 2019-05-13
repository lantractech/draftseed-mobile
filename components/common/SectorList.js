import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Text } from 'native-base'
import _ from 'lodash'
import ListItemSector from 'components/common/ListItemSector'

export default class SectorList extends React.PureComponent {

    keyExtractor = (item, index) => item.name;

    renderLoader() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='gray' />
            </View>
        )
    }

    listEmptyComponent() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', paddingTop: 60 }}>No Data Available</Text>
            </View>
        )
    }

    renderNoData() {
        const { data, refreshing } = this.props

        return <FlatList
            data={data}
            onRefresh={this.props.onRefresh.bind(this)}
            refreshing={refreshing}
            ListEmptyComponent={this.listEmptyComponent}
        />
    }

    renderRow() {
        const { data, refreshing } = this.props

        return <FlatList
            data={data}
            keyExtractor={this.keyExtractor}
            onRefresh={this.props.onRefresh.bind(this)}
            refreshing={refreshing}
            renderItem={({ item }) => {
                return <ListItemSector item={item} />
            }}
        />
    }


    render() {
        const { refreshing, data } = this.props

        const dataView = !_.isEmpty(data) ? this.renderRow() : this.renderNoData()
        const loader = this.renderLoader()

        return refreshing ? loader : dataView
    }
}

SectorList.defaultProps = {
    data: [],
    refreshing: false,
}