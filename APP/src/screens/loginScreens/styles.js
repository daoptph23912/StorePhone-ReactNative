import { StyleSheet } from "react-native";
import Constants from 'expo-constants';
import { Platform } from "react-native";

import colors from "../../colors/color";

const styles = StyleSheet.create({
    logIn:{
        flex: 1,
        paddingStart: '6%',
        paddingEnd: '6%',
        paddingTop: '6%',
        backgroundColor: '#F7FBFF',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: colors.black,
        fontSize: 36,
        fontFamily: 'AndikaNewBasic',
        marginBottom: 15
    },
    form:{
        width: '100%'
    },
    forgotPass: {
        alignSelf: 'flex-end',
        padding: 4,
        textDecorationLine: "underline",
        fontFamily: 'AndikaNewBasic',
    },
    label: {
        fontSize: 16,
        fontFamily: 'AndikaNewBasic'
    },
    bottomForm: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btnContainer: {
        flexDirection: 'row',
        width: '30%',
        justifyContent: 'space-between',
        marginTop: 8
    },
    container:{
        flex: 1,
        marginTop: Platform.OS === 'android'? Constants.statusBarHeight: 0
    },
    bottomView: {
        width: '100%',
        marginBottom: '8%'
    },
    bottomText: {
        color: '#484848',
        fontFamily: 'AndikaNewBasic',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    textSignUp: {
        fontWeight: "bold",
        fontSize: 20,
        textDecorationLine: 'underline',
        fontFamily: 'AndikaNewBasic',
    },
    orContainer: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewLine: {
        height: 1.5,
        flex: 1,
        backgroundColor: colors.black
    },
    logo: {
        width: 200,
        height: 130,
        marginTop: 10
    }

})

export default styles;