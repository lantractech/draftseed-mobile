import React from 'react';
import { WebView,Linking } from 'react-native';
import { ListItem, Text, Body, Right, Spinner } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as num from 'helpers/numbers'
import Colors from 'constants/Colors';
import _ from 'lodash'

export default class ListItemStock extends React.PureComponent {

    getStockName() {
        const { item } = this.props
        const name = _.truncate(item.companyName, { length: 15 });
        return (
            <Body>
                <Grid>
                    <Col>
                        <Text style={{ color: '#555', fontWeight: 'bold' }}>
                            {item.symbol}
                        </Text>
                        <Text note>
                            {name}
                        </Text>
                    </Col>
                    <Col>
                        {this.getChangePercent()}
                    </Col>
                </Grid>
            </Body>
        )
    }

    getChangePercent() {
        const { item } = this.props
        const color = item.changePercent < 0 ? Colors.redFont : Colors.greenFont
        const sign = item.changePercent < 0 ? '' : '+'
        return item.changePercent ? (
            <Text style={{ color: color, fontSize: 18 }}>
                {sign}{num.setPercentFromDecimal(item.changePercent, 2)}%
            </Text>
        ) : <Text style={{ color: '#777', fontSize: 18 }}>--</Text>
    }

    getLatestPriceVolume() {
        const { item, displayVolume } = this.props
        const color = item.changePercent < 0 ? Colors.redFont : Colors.greenFont
        return (
            <Right>
                {item.latestPrice ? (
                    <Text style={{ color: color, fontSize: 16 }}>
                        ${num.setDecimal(item.latestPrice, 2)}
                    </Text>
                ) : <Text style={{ color: '#777', fontSize: 16 }}>--</Text>}
                {displayVolume && <Text note>{num.abbrFormatter(item.latestVolume)}</Text>}
            </Right>
        )
    }

    openRobinHoodLink() {
        const {item} = this.props
        let uri = `https://robinhood.com/stocks/${item.symbol}`
        Linking.openURL(uri)
    }

    render() {
        const { item } = this.props
        return !_.isEmpty(item) ? (
            // <ListItem noIndent style={{height:50,paddingTop:5}} button onPress={() => this.openRobinHoodLink()}>
            <ListItem noIndent style={{height:50,paddingTop:5}} button>
                {this.getStockName()}
                {this.getLatestPriceVolume()}
            </ListItem>
        ) : null
    }
}
