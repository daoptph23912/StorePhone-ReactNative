import { StyleSheet } from "react-native";

import colors from "../../colors/color";

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: '#25C2AC',

    },
    label: {
        fontSize: 16,
        fontFamily: 'AndikaNewBasic'
    },
    logoBtn: {
        width: 40,
        height: 40,
        backgroundColor: colors.white,
        borderRadius: 20,
        resizeMode: "contain"
    },
});

export default styles