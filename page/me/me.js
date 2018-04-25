import React from "react"

import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    AsyncStorage,
    Image
} from "react-native"


export default class Me extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        this.flagconfig=
            {
                name:"标签选项",
                data:[
                    {
                        name:"Favorite",
                        title:"选择喜欢的标签",
                        type:"flag_language_key"
                    },
                    {
                        name:"SortFlag",
                        title:"对喜欢的标签进行排序",
                        type:"sortflag"
                    },
                    {
                        name:"RemoveFlag",
                        title:"移除喜欢的标签",
                        type:"removeflag"
                    },
                ]
            }
          this.languageconfig=
            {
                name:"语言设置",
                data:[
                    {
                        name:"FavoriteLans",
                        title:"选择喜欢的语言",
                        type:"flag_language_langs"
                    },
                    {
                        name:"SortLang",
                        title:"排序喜欢的语言",
                        type:"flag_language_langs"
                    },
                ]
            }
      }
    jump(a){
       this.props.navigation.navigate(a.name,{type:a.type})
    }
    render(){
        return (
            <View style={{flex:1}}>
                <ScrollView>
                    <View style={stylesheet.title}>
                        <View>
                            <Image
                                style={{width:50,height:50}}
                                source={require("../../static/images/github.png")}
                            ></Image>
                            <Text>Git_Hub</Text>
                        </View>
                        <Image style={{width:18,height:18,marginRight:5, justifyContent:"flex-end",}} source={require("../../static/images/right.png")}/>
                    </View>
                    <Text style={stylesheet.text_u}>{this.flagconfig.name}</Text>
                    {this.flagconfig.data.map((b,index,arr)=>{
                           return (

                               <View style={stylesheet.view}

                                     key={index}
                               >
                                   <View style={{flexDirection:"row"}}>
                                       <Image style={{width:20,height:20,marginRight:5}} source={require("../../static/images/item.png")}></Image>
                                       <Text style={stylesheet.text}
                                             onPress={()=>{this.jump(b)}
                              }
                                       >{b.title}</Text>
                                   </View>
                                   <Image style={{width:18,height:18,marginRight:5, justifyContent:"flex-end",}} source={require("../../static/images/right.png")}></Image>

                               </View>
                           )

                    })}
                    <Text style={stylesheet.text_u}>{this.languageconfig.name}</Text>
                    {this.languageconfig.data.map((b,index,arr)=>{
                        return (
                            <View style={stylesheet.view}
                                  key={index}
                            >
                                <View style={{flexDirection:"row"}}>
                                    <Image style={{width:20,height:20,marginRight:5}} source={require("../../static/images/item.png")}></Image>
                                    <Text style={stylesheet.text}
                                          onPress={()=>{this.jump(b)}
                              }
                                    >{b.title}</Text>
                                </View>
                                <Image style={{width:18,height:18,marginRight:5, justifyContent:"flex-end",}} source={require("../../static/images/right.png")}></Image>

                            </View>
                        )

                    })}
                </ScrollView>
            </View>

        )
    }
}
const stylesheet=StyleSheet.create({
    text_u:{
        flex:1,
        fontSize:12,
        height:20,
        paddingLeft:10,
        backgroundColor:"#ddd"
    },
    title:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        height:70,
        marginTop:10,
        marginLeft:30,
        marginBottom:10
    },
    view:{
        flex:1,
        flexDirection:"row",
        height:40,
        justifyContent:"space-between",
        alignItems:"center",
        borderBottomColor:"#ccc",
        borderBottomWidth:1,
    },
    text:{
        color:"#555",
        fontSize:12,
    }
})