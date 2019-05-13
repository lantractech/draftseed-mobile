import React from 'react';
import { Image } from 'react-native'
import _ from 'lodash'

export default class LogoTitle extends React.PureComponent {

    render() {
        return <Image
            source={require('assets/images/draftseed_color_large.png')}
            style={{
                marginLeft: 10,
                maxHeight: '40%',
                maxWidth: '40%'
            }}
        />
    }
}
