import React from 'react';
import { Text } from 'native-base';
import Colors from 'constants/Colors';

export default class TabBarLabel extends React.Component {
    render() {
        const color = this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
        const styles = { color: color, fontSize: 12, textAlign: 'center' }

        return (
            <Text style={styles}>
                {this.props.name}
            </Text>
        );
    }
}