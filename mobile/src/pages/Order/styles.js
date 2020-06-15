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

    close:{
        marginLeft: 'auto'
    },

    Main:{
        paddingHorizontal: 20
    },

    categories:{
       
    },

    nameCat:{
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 40,
        marginBottom: 10
    },

    products:{
        backgroundColor: "#FFFFFF22",
        padding: 20,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        
    },

    nameProduct:{
        fontSize: 16,
        maxWidth: 180,
    },

    IngProduct:{
        maxWidth: 180,
        fontSize: 10,
        color: '#00000044'
    },

    input:{
        alignItems:"center",
        marginLeft: 'auto',
        marginRight: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 2
    },

    minus:{
        marginRight:10
    },

    add:{
        marginLeft:10
    },

    priceProduct:{
        fontWeight: "bold"
    },

    rowbuttons:{
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20,
        justifyContent: "space-between", 
        paddingHorizontal: 20
    },

    cardapio:{
        alignItems: "center",
    },

    textCardapio:{
        fontSize: 12
    },

    cardapiobutton:{
        padding: 4,
        borderRadius: 8,
    },

    nextbutton:{
        padding: 4,
        borderRadius: 4,
        height:42,
        width: 42
    },
})

export default styles;