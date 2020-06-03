import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#FFE1E1",
        paddingTop: Constants.statusBarHeight + 20,
    }, 

    Header:{
        alignItems: 'center',
        marginBottom: 60
    },

    welcome:{
        marginTop: 20,
        fontSize: 16,
        fontWeight: "bold"

    },

    enterpriseList:{
        paddingHorizontal: 20,
    },

    enterprise:{
        width: '100%',
        maxHeight: 100,
        backgroundColor: '#FFFFFF77',
        borderRadius: 8,
        marginBottom: 20,
    },

    enterpriselogo:{
        width: 32,
        height: 28
    },

    row:{
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },

    dados:{
        marginLeft: 10,
        marginRight: 'auto'
    },

    name:{
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: -6
    },

    cityUf:{
        fontSize: 12,
        width: 160,
        color: '#00000099'
    },

    contato:{
        marginLeft: 'auto', 
        alignItems: "center",
        backgroundColor: '#FF0000',
        borderRadius: 4,
        padding: 6,
    },

    Textphone:{
        fontWeight: "bold",
        color: '#FFFFFF'
    },

    phone:{
        color: '#FFFFFF'
    }

})


export default styles;