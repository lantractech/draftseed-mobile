import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

export class HeaderField extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: '#aaa', borderBottomColor: 'black', borderBottomWidth: 1 }} key={'header'}>
				<View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', borderRightColor: '#666', borderRightWidth: 1 }} >
					<Text style={{ color: 'white', fontWeight: 'bold', paddingLeft: 5 }}>Symbol</Text>
				</View>
				<View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', borderRightColor: '#666', borderRightWidth: 1 }} >
					<Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>$</Text>
				</View>
				<View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', borderRightColor: '#666', borderRightWidth: 1 }} >
					<Text style={{ color: 'white', fontWeight: 'bold' }}>%</Text>
				</View>
				<View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center' }} >
					<Text style={{ color: 'white', fontWeight: 'bold', paddingRight: 5 }}>Volume</Text>
				</View>
			</View>
		);
	}
}