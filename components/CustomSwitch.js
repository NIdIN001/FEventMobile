import React from 'react';
import * as styled from "react-native";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";

class CustomSwitch extends React.Component {
    setView = (a) => true
    constructor(props) {
        super(props);
        this.setView = props.callback
    }
    state = {
        active: false
    }
    handleOFF = () => {
        this.props.callback(false)
        this.setState({
            active: false
        });
    }
    handleOn = () => {
        this.props.callback(true)
        this.setState({
            active: true
        });
    }
    render() {
        return (
            <View style={styles.MainView}>
                <View style={styles.Label}>
                    <TouchableOpacity
                        style={this.state.active ? styles.LabelOff : styles.LabelOn}
                        onPress={this.handleOFF} active={this.state.active} activeOpacity={0.8}>
                        <Text>На карте</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.active ? styles.LabelOn : styles.LabelOff}
                        onPress={this.handleOn} active={this.state.active} activeOpacity={0.8}>
                        <Text>Список</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    MainView: {
        height: "80%"
    },
    Label: {
        height: "100%",
        width: 240,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    LabelOff: {
        height: "100%",
        width: 120,
        backgroundColor: '#D9D9D9',
        border:2,
        borderStyle: "solid",
        borderColor: "#D9D9D9",
        borderRightWidth: 0,
        alignItems: "center",
        justifyContent: "space-around",
    },
    LabelOn: {
        height: "100%",
        width: 120,
        backgroundColor: '#844E36',
        border:2,
        borderStyle: "solid",
        borderColor: "#844E36",
        borderRightWidth: 0,
        alignItems: "center",
        justifyContent: "space-around",
    },
})
// const MainView = styled.View`
//   margin:50px;
// `
// const Label = styled.View`
//   height:60px;
//   width:240px;
//   flex-direction:row;
//   justify-content:space-around;
//   align-items:center;
//   background-color:transparent;
// `

// const LabelOff = styled.TouchableOpacity`
//   height:60px;
//   width:120px;
//   background-color:${props => props.active ? 'transparent' : '#cb6161'};
//   border:2px solid #cb6161;
//   border-right-width:0px;
//   align-items:center;
//   justify-content:space-around;
// `
// const LabelOn = styled.TouchableOpacity`
//   height:60px;
//   width:120px;
//   background-color:${props => props.active ? '#55acee' : 'transparent'};
//   border:2px solid #55acee;
//   border-left-width:0px;
//   align-items:center;
//   justify-content:space-around;
// `
// const Off = styled.Text`
//   font-size:22px;
// `
// const On = styled.Text`
//   font-size:22px;
// `

export default CustomSwitch;