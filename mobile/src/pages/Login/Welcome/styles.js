import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FF0000",
        paddingTop: Constants.statusBarHeight + 60,
    },

    logowelcome:{
        marginBottom: 60
    },

    welcome:{
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 10
    },

    name:{
        fontSize: 40,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: 100,
    },

    btn:{
        width:239,
        height:76,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textbtn:{
        fontSize: 30,
        color: '#FF0000'
    }

})

export default styles;