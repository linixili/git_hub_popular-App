import React from "react"
import {
    View,
    Text,
    StyleSheet,
    Image,
    AsyncStorage,
    TouchableOpacity
}from "react-native"
import HTMLView from "react-native-htmlview"
import FavoriteDeo from "../utils/favoritedeo"
export default class Cell extends React.Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isFavorite:false,
            favoriteIcon:require("../static/images/star.png"),
        };
        this.favoritedeo=new FavoriteDeo("trending")
    }
    _onPressStar(){
        let fav=this.state.isFavorite
        this.setState({
            isFavorite:!fav,
            favoriteIcon:!fav?require('../static/images/star_link.png'):require("../static/images/star.png")
        })
        if(!fav){
            this.favoritedeo.updateFavoriteKeys(this.props.data,"Add")
        }else{
            this.favoritedeo.updateFavoriteKeys(this.props.data,"Remove")
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('FAVORITE_KEYtrending',(e,result)=>{
            result=JSON.parse(result)
            if(result&&result.data.length){
                for(var i=0;i<result.data.length;i++){
                    if(result.data[i].fullName===this.props.data.fullName){
                        this.setState({
                            isFavorite:true,
                            favoriteIcon:require('../static/images/star_link.png')
                        })
                    }
                }
            }
        })

    }
    render(){
        let description='<p>'+this.props.data.description+'</p>'
        return (
            <TouchableOpacity style={stylesheet.container}
                              onPress={()=>{
                this.props.onSelect(this.props.data)
            }}
            >
                <View style={stylesheet.cell_container}>
                    <Text style={stylesheet.title}>{this.props.data.fullName}</Text>
                    <View style={{flexDirection:"row",flex:1}}>
                        <HTMLView
                            value={description}
                            onLinkPress={(url)=>{}}
                            stylesheet={{
                            p:stylesheet.description,
                            a:stylesheet.description
                            }}
                        >
                        </HTMLView>
                    </View>
                    <Text  style={stylesheet.description}>{this.props.data.meta}</Text>
                    <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:4}}>
                        <View style={{flexDirection:"row" ,alignItems:"center"}}>
                            <Text style={stylesheet.title}>Build by:</Text>
                            {this.props.data.contributors.map((a,i ,arr)=>{
                                return (
                                    <Image key={i} style={{width:22,height:22}}
                                           source={{uri:arr[i]}}
                                    />
                                )
                            })}
                        </View>

                       <TouchableOpacity
                        onPress={()=>{
                            this._onPressStar()
                        }}
                       >
                           <Image
                               style={{width:22,height:22}}
                               source={this.state.favoriteIcon}
                           ></Image>
                       </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
const stylesheet = StyleSheet.create({
    container:{
        fontSize:15,
        flex:1,
        justifyContent:"center",
    },
    title:{
        fontSize:16,
        color:'#212121',
        marginBottom:4,

    },
    description:{
        color:'#666'
    },
    cell_container:{
        flex:1,
        backgroundColor:'white',
        padding:6,
        marginTop:5,
        marginLeft:5,
        marginRight:5,
        borderWidth:0.5,
        borderColor:"#eee",
        shadowColor:'gray',
        shadowOffset:{width:0.5,height:0.5},
        shadowOpacity:0.4,
        shadowRadius:1,
        elevation:2,
    }
})