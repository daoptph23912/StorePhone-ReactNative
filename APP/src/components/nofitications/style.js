import { StyleSheet } from "react-native";
import colors from "../../colors/color";

const styles = StyleSheet.create({
    btn: {
        paddingTop: 6
    },
    container: {
        flexDirection: 'row',
        height: 90,
        alignItems: 'center',
        paddingRight: 10
    },
    img: {
        width: 60,
        height: 60,
        backgroundColor: colors.color6,
        borderRadius: 30,
        marginStart: 8
    },
    content: {
        flex: 1,
        height: '100%',
        paddingStart: 10,
        paddingRight: 6
    },
    textContent: {
        fontFamily: 'AndikaNewBasic',
        height: 70,
        fontSize: 14,
        color: colors.black,
        paddingTop: 6
    },
    textTime: {
        fontFamily: 'Roboto-Regular',
        fontSize: 11,
        color: colors.color7,
        marginTop: 3
    },
    checkWatch: {
        width: 15,
        height: 15,
        borderRadius: 8,
        zIndex: 1,
    }
})

export default styles