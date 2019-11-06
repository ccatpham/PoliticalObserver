import React from 'react';
import {Button, Text, View} from 'react-native';

export default class LandingScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Landing Screen</Text>
                <Button
                    title="Login"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
                <Button
                    title="Register"
                    onPress={() => this.props.navigation.navigate('Register')}
                />
            </View>
        );
    }
}
