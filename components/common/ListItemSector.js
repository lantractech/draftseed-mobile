import React from 'react';
import { ListItem, Text, Body, Right } from 'native-base';
import * as num from 'helpers/numbers'
import Colors from 'constants/Colors';
import _ from 'lodash'

export default class ListItemStock extends React.PureComponent {

    getSectorName() {
        const { item } = this.props
        return (
            <Body>
                <Text style={{ color: '#555', fontWeight: 'bold' }}>
                    {item.name}
                </Text>
            </Body>
        )
    }

    getPerformance() {
        const { item } = this.props
        const color = item.performance < 0 ? Colors.redFont : Colors.greenFont
        const sign = item.performance < 0 ? '' : '+'
        return item.performance ? (
            <Right>
                <Text style={{ color: color, fontSize: 18 }}>
                    {sign}{num.setPercentFromDecimal(item.performance, 2)}%
                </Text>
            </Right>
        ) : (
                <Right>
                    <Text style={{ color: '#777', fontSize: 18 }}>--</Text>
                </Right>
            )
    }

    render() {
        const { item } = this.props
        return !_.isEmpty(item) ? (
            <ListItem noIndent style={{ height: 50, paddingTop: 5 }}>
                {this.getSectorName()}
                {this.getPerformance()}
            </ListItem>
        ) : null
    }
}
