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

    listProducts:{
        marginBottom: 20
    },

    products:{
        backgroundColor: "#FFFFFF22",
        padding: 20,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    nameProduct:{
        fontSize: 16,
    },

    IngProduct:{
        maxWidth: 180,
        fontSize: 10,
        color: '#00000044'
    },

    input:{
        alignItems:"center",
        flexDirection: "row",
        padding: 2
    },

    qtd:{
        backgroundColor: '#FFFFFF66',
        marginLeft: 4,
        marginRight: 4,
        borderRadius: 4
    }

})

export default styles;