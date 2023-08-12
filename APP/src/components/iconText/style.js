import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'baseline',
    },
    imgMedium: {
        width: 30,
        height: 30
    },
    imgSmall: {
        width: 16,
        height: 16
    },
    textMedium: {
        fontFamily: 'AndikaNewBasic',
        fontSize: 16
    },
    textSmall: {
        fontFamily: 'AndikaNewBasic',
        fontSize: 12
    }
});

export default styles;