//https://thumbs.gfycat.com/LameDifferentBalloonfish-size_restricted.gif

import React, { Component } from 'react';
import { View, Image } from 'react-native';
class LoadingGIF extends React.Component {

    render() {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,

                }}>
                <Image source={{ uri: 'https://thumbs.gfycat.com/LameDifferentBalloonfish-size_restricted.gif' }}
                    style={{
                        height: 200, width: 200
                    }}>
                </Image>
            </View>
        );
    }
}

export default LoadingGIF;