import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Container, Footer, FooterTab, Button, Text } from 'native-base';
import { connect } from "react-redux";
import _ from 'lodash'
import MostActive from 'components/MostActive'
import TopGainers from 'components/TopGainers'
import TopLosers from 'components/TopLosers'

const sectors = [ //will be imported with user settings
	{ name: 'Communication Services', showResult: true },
	{ name: 'Consumer Discretionary', showResult: true },
	{ name: 'Materials', showResult: true },
	{ name: 'Health Care', showResult: true },
	{ name: 'Technology', showResult: true },
	{ name: 'Financials', showResult: true },
	{ name: 'Industrials', showResult: true },
	{ name: 'Energy', showResult: true },
	{ name: 'Consumer Staples', showResult: true },
	{ name: 'Utilities', showResult: true },
	{ name: 'Real Estate', showResult: true }
]

const sectorMap = {
	"Communication Services": { request: '&sector=Communication%20Services'},
	"Consumer Discretionary": { request: '&sector=Consumer%20Discretionary' },
	"Materials": { request: '&sector=Materials' },
	"Health Care": { request: '&sector=Health%20Care' },
	"Technology": { request: '&sector=Technology' },
	"Financials": { request: '&sector=Financials' },
	"Industrials": { request: '&sector=Industrials' },
	"Energy": { request: '&sector=Energy' },
	"Consumer Staples": { request: '&sector=Consumer%20Staples' },
	"Utilities": { request: '&sector=Utilities' },
	"Real Estate": { request: '&sector=Real%20Estate' },
}

class HeaderField extends React.Component {
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

export class CurrentStatsScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			activeName: 'topGainers',
			tabOptions: ['topGainers', 'topLosers', 'mostActive']
		}
		this.setActiveName = this.setActiveName.bind(this)
		this._updating = false
	}

	static navigationOptions = {
		// header: null
		// title: '',
		// headerTitle: <HeaderField />
		// headerStyle: {
		// 	backgroundColor:'#01c197'
		// }
	};

	componentDidMount() {
		this._mounted = true;
		this.fetchData()
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.activeName !== this.state.activeName) {
			if (this._mounted) {
				this.fetchData()
			}
		}
	}

	fetchData = () => {
		const { activeName } = this.state
		const sectorsQueryString = _.join(_.map(_.filter(sectors, o => o.showResult), (sector) => {
			return sectorMap[sector.name]["request"]
		}),'')
		this.props.requestSectors(activeName,sectorsQueryString)
	}

	onRefresh = () => {
		if (this._mounted) {
			this.fetchData()
		}
	}

	setActiveName(e, value) {
		this.setState({ activeName: value })
	}

	renderContent() {
		const { activeName } = this.state
		if (this.props.sectors.fetching || _.isEmpty(this.props.sectors.data)) {
			return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size='large' color='#06dab4' />
			</View>
		}
		if (activeName === "topGainers") {
			return <TopGainers data={this.props.sectors.data} refreshing={this.props.sectors.fetching} onRefresh={this.onRefresh} activeName={activeName} />
		}
		else if (activeName === "topLosers") {
			return <TopLosers data={this.props.sectors.data} refreshing={this.props.sectors.fetching} onRefresh={this.onRefresh} activeName={activeName} />
		}
		else if (activeName === "mostActive") {
			return <MostActive data={this.props.sectors.data} refreshing={this.props.sectors.fetching} onRefresh={this.onRefresh} activeName={activeName}  />
		}
		return null
	}

	getButtonStyle = (tabIsActive) => {
		return tabIsActive ? { backgroundColor: '#06dab4' } : { backgroundColor: '#3a3a3a' }
	}
	getButtonTextStyle = (tabIsActive) => {
		return tabIsActive ? {
			color: '#333',
			fontWeight: 'bold',
			fontSize: 12
		} : {
				color: '#eee',
				fontWeight: 'bold',
				fontSize: 12
			}
	}


	render() {
		const { activeName } = this.state;
		const topGainersSelected = activeName === 'topGainers'
		const topLosersSelected = activeName === 'topLosers'
		const mostActiveSelected = activeName === 'mostActive'
		return (
			<Container>
				{/* <Header /> */}
				<View style={{ flex: 1 }}>
					<GestureRecognizer
						onSwipeLeft={(state) => this.onSwipeLeft(state)}
						onSwipeRight={(state) => this.onSwipeRight(state)}>
						{this.renderContent()}
					</GestureRecognizer>
				</View>
				<Footer>
					<FooterTab>
						<Button active={topGainersSelected}
							style={this.getButtonStyle(topGainersSelected)}
							onPress={() => this.setState({ activeName: 'topGainers' })}>
							<Text style={this.getButtonTextStyle(topGainersSelected)}>Gainers</Text>
						</Button>
						<Button active={topLosersSelected}
							style={this.getButtonStyle(topLosersSelected)}
							onPress={() => this.setState({ activeName: 'topLosers' })}>
							<Text style={this.getButtonTextStyle(topLosersSelected)}>Losers</Text>
						</Button>
						<Button active={mostActiveSelected}
							style={this.getButtonStyle(mostActiveSelected)}
							onPress={() => this.setState({ activeName: 'mostActive' })}>
							<Text style={this.getButtonTextStyle(mostActiveSelected)}>Most Active</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		sectors: state.sectors
	};
};

const mapDispatchToProps = dispatch => {
	return {
		requestSectors: (param,sectors) => dispatch({ type: 'SECTORS_REQUEST', param, sectors })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentStatsScreen);
