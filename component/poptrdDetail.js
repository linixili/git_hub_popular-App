import React  from "react"

import {
    View,
    Text,
    WebView,
    StyleSheet,
    AsyncStorage
}from "react-native"
import FavoriteDeo from "../utils/favoritedeo"
const trending="https://github.com/"
export default class Web  extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          let detail=this.props.navigation.state.params.detaildata
        this.state = {
            url:detail.html_url?
                detail.html_url:
                trending+detail.fullName,
            cangoBack:false,
            title:detail.full_name?
                detail.full_name:
                detail.fullName,
            isFavorite:this.props.navigation.state.params.isFavorite
        };
          this.type=detail.full_name?'favoritedeo':"trending"

          this.favoritedeo=new FavoriteDeo(this.type)
      }

    componentDidMount() {
        this.props.navigation.setParams(
            {
                "action":()=>{
                this.onBack()
             },
                "saveFavorite":()=>{
                    this.props.navigation.setParams({
                        isFavorite:!this.state.isFavorite
                    })
                    this.state.isFavorite?  this.favoritedeo.updateFavoriteKeys('FAVORITE_KEY'+this.type,this.props.navigation.state.params.detaildata,"Remove"):
                        this.favoritedeo.updateFavoriteKeys('FAVORITE_KEY'+this.type,this.props.navigation.state.params.detaildata,"Add")
        },
            "isFavorite":this.props.navigation.state.params.isFavorite
        })

    }
    onBack(){
        if(this.state.cangoBack){
            this.webView.goBack()
        }else{
            this.props.navigation.goBack();
        }
    }

    onNavigationStateChange(e){
        this.setState({
            cangoBack:e.cangoBack,
            url:e.url,
            title:e.title
        })
        this.props.navigation.setParams({"title":e.title})
    }
    render(){

        return (
            <View style={stylesheet.container}>
                <WebView
                    ref={(webView)=>this.webView=webView}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    source={{uri:this.state.url}}
                    startInLoadingState={true}
                ></WebView>
            </View>
        )
    }
}

var stylesheet=StyleSheet.create({
    container:{
        flex:1
    }
})