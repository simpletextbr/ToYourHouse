import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFE1E1",
        paddingTop: Constants.statusBarHeight + 20,
    },
    
    logoLogin:{
        marginBottom: 32,
        marginTop: 'auto'
    },

    p:{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 40,
    },

    input:{
        width: '90%',
        height: 56,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#C2C2C2',
        fontSize: 28,
    },

    btn:{
        width:240,
        height:76,
        borderRadius: 8,
        backgroundColor:'#FF0000',
        marginTop: 20,
        marginBottom: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },

    btnText:{
        fontSize:48,
        color: '#FFFFFF'
    }
})


export default styles;