import { StyleSheet } from "react-native";

import colors from "../../colors/color";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    title: {
        fontFamily: 'AndikaNewBasic',
        fontSize: 30,
        color: colors.color4,
        marginStart: 10,
        paddingBottom: 20
    }
})

export default styles