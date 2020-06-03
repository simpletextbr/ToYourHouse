import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#FF0000",
        paddingTop: Constants.statusBarHeight + 20,
    },
    
    logout:{
        alignSelf: 'flex-end',
        marginRight: 10,
        marginBottom: 40
    },

    logowelcome:{
        marginBottom: 20, 
        alignSelf: "center"
    },

    welcome:{
        fontSize: 30,
        alignSelf: "center",
        color: '#FFFFFF',
        marginBottom: 10
    },

    name:{
        fontSize: 40,
        alignSelf: "center",
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: 100,
    },

    btn:{
        width:239,
        height:76,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
    },

    textbtn:{
        fontSize: 30,
        color: '#FF0000'
    }

})

export default styles;