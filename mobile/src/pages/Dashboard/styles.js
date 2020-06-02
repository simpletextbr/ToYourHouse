import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFE1E1",
        paddingTop: Constants.statusBarHeight + 20,
    }

})


export default styles;