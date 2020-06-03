import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFE1E1",
        paddingTop: Constants.statusBarHeight + 20,
    }
})

export default styles;