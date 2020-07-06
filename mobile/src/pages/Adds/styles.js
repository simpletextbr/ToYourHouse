import { StyleSheet} from 'react-native';
import Constants from 'expo-constants';


const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: Constants.statusBarHeight + 10
    },

    Header:{
        padding: 10,
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
    },

    enterpriselogo:{
        width: 32,
        height:28,
    },

    enterprisename:{
        marginLeft: 10,
        fontWeight: "bold"
    },

    back:{
        marginLeft: 'auto'
    },

    close:{
        marginLeft: 'auto'
    },

    title:{
        marginTop: 20,
        fontSize: 23,
        textAlign: "center",
    },

    productName:{
        fontSize: 20,
        textAlign: "center"
    },

    adds:{
        fontSize: 12,
        color: 'grey',
        paddingHorizontal: 10,
    },

    detail:{
        fontSize: 10,
        fontWeight:"bold"
    },

    content:{
        maxWidth: 410,
        flexDirection: 'column',
        
    },
    
    rowadds:{
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 8,
        
        
    },

    add:{
        backgroundColor: "#E5E5E544",
        padding: 10,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8
    },

    nameadds:{
        textAlign: "center",
    },

    input:{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        
    },

    adc:{
        alignItems: "center",
        fontSize: 10
    },

    priceadds:{
        fontWeight: "bold",
        textAlign: "center"
    },

    rowbuttons:{
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20,
        justifyContent: "space-between", 
        paddingHorizontal: 20
    },

    nextbutton:{
        padding: 4,
        borderRadius: 4,
        height:42,
        width: 42,
        marginLeft: 'auto',
        marginBottom: 40
    },
})



export default styles;