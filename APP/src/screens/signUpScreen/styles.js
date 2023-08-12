import { StyleSheet } from "react-native";
import Constants from 'expo-constants';
import { Platform } from "react-native";

import colors from "../../colors/color";

const styles = StyleSheet.create({
    signUp:{
        flex: 1,
        backgroundColor: '#F7FBFF',
        alignItems: 'center',
    },
    gobackContainer: {
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'center',
    },
    imgLogo: {
        width: 25,
        height: 25
    },
    title: {
        color: colors.black,
        fontSize: 36,
        fontFamily: 'AndikaNewBasic',
        marginBottom: 15
    },
    form:{
        width: '100%',
        paddingStart: '6%',
        paddingEnd: '6%',
        flex: 1
    },
    label: {
        fontSize: 16,
        fontFamily: 'AndikaNewBasic'
    },
    container:{
        flex: 1,
        marginTop: Platform.OS === 'android'? Constants.statusBarHeight: 0
    },
    logo: {
        width: 200,
        height: 130,
        marginTop: 20
    }
})

export default styles;