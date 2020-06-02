import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#FFE1E1",
        paddingTop: Constants.statusBarHeight + 20,
    }, 

    Header:{
        alignItems: 'center'
    }

})


export default styles;