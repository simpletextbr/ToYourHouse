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
        textAlign: "center"
    },

    productName:{
        marginTop: 10,
        fontSize: 20,
        textAlign: "center"  
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
        backgroundColor: "#E5E5E522",
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

    shoppingCart:{
        padding: 6,
        borderRadius: 4,
    },

    rowbuttons:{
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20,
        justifyContent: "space-between", 
        paddingHorizontal: 20
    },

    roworders:{
        backgroundColor: "#E5E5E599",
        padding: 10,
        width: '96%',
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
    },

    qtdShopping:{
        marginLeft: 10,
        padding: 6,
        backgroundColor: '#A5A5A566',
        fontWeight: "bold",
        borderRadius: 6
    },

    nameShopping:{
        marginLeft: 10,
        fontSize: 18
    },

    priceShopping:{
        marginLeft: 'auto',
        fontSize: 16,
        fontWeight: "bold"
    },

    nextbutton:{
        padding: 4,
        borderRadius: 4,
        height:42,
        width: 42
    },
})



export default styles;