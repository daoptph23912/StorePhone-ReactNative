import { StyleSheet } from "react-native";

import colors from "../../colors/color";

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 8,
    },
    container: {
        backgroundColor: colors.white,
        borderRadius: 4
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    viewIfo: {
        
    },
    avatar: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 25,
        backgroundColor: colors.color6,
        margin: 8
    },
    label1: {
        fontFamily: 'AndikaNewBasic',
        fontSize: 17
    },
    label2: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15
    },
    label3: {
        fontFamily: 'AndikaNewBasic',
        fontSize: 12
    },
    footer: {
        padding: 4
    },
    footer1: {
        flexDirection: 'row',
        paddingBottom: 4,
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10
    },
    footer2: {
        paddingTop: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    imgContent: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        marginTop: 5
    }
})

export default styles