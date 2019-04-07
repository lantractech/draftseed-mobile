import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import _ from 'lodash'
import ListItemStock from 'components/common/ListItemStock'

export default class StatsList extends React.PureComponent {

    keyExtractor = (item, index) => item.symbol;

    renderRow() {
        const { data, refreshing } = this.props

        if (_.isEmpty(data)) { return null }

        return <FlatList
            data={data}
            keyExtractor={this.keyExtractor}
            onRefresh={this.props.onRefresh.bind(this)}
            refreshing={refreshing}
            renderItem={({ item }) => {
                return <ListItemStock item={item} displayVolume={true} />
            }}

        />
    }


    render() {
        const { refreshing } = this.props;
        
        return refreshing ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='white' />
            </View>
        ) : (
                <View>
                    {this.renderRow()}
                </View>
            )
    }
}

StatsList.defaultProps = {
    data: [],
    refreshing: false,
}