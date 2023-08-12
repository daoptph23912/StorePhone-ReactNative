import { StyleSheet } from "react-native";

import colors from "../../colors/color";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.color6,
    }, 
    box1: {
        height: 430,
        backgroundColor: 'white',
    },
    images: {
        height: 300,
    },
    background: {
        height: 250,
        backgroundColor: 'gray'
    },
    avatarContainer: {
        width: 200,
        height: 200,
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 1,
        bottom: 5,
        start: 10,
        borderRadius: 100,
    },
    avatar: {
        position: 'absolute',
        width: 190,
        height: 190,
        top: 5,
        start: 5,
        zIndex: 1,
        borderRadius: 95
    },
    followContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    text1: {
        fontFamily: 'AndikaNewBasic',
        fontSize: 24
    },
    infoContainer: {
        width: '92%',
        paddingBottom: 20,
        alignSelf: 'center'
    },
    textBold: {
        fontWeight: 'bold',
        fontSize: 15
    },
    btnEditProfile: {
        height: 35,
        backgroundColor: colors.color10,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        paddingHorizontal: 20,
        paddingVertical: 6,
        width: '92%',
    },
    text2: {
        fontSize: 14,
        color: colors.black,
        fontWeight: 'bold',
        marginStart: 5
    },
    box2: {
        width: '100%',
        marginTop: 10,
        alignSelf: 'baseline',
        backgroundColor: 'white',
        paddingHorizontal: '4%',
        paddingBottom: 10
    },
    box3: {
        marginTop: 10
    }
})

export default styles;