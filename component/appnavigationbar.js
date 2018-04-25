import React from "react"
import {
    Platform,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Button,
    View,
    Alert,
    TouchableOpacity
} from 'react-native';
import {
    TabNavigator,
    StackNavigator,
    TabBarBottom
} from "react-navigation"
import Icon from "react-native-vector-icons/FontAwesome"

import Like from "../page/like/like"
import PopularLikeScreen from "../page/like/popularLikeScreen"
import TrendingLikeScreen from "../page/like/trendingLikeScreen"
import PopularScreen from "../page/theme/popularpage"
import WelcomeScreen from "../page/welcome/welcome"
import FavoriteScreen from "../page/me/favorite/favorite"
import MeScreen from "../page/me/me"
import SortFlag from "../page/me/sortflag/sortflag"
import RemvoeFlag from "../page/me/removeFlad/removeflag"
import DetailPage from "./poptrdDetail"
import TreedingScreen from "../page/treeding/treedingpage"
import SearchScreen from "../page/me/search/searchpage"

class TabBarComponent extends React.Component{
      constructor(props) {
        super(props);
        this.theme={
                tintColor:props.activeTintColor,
                updateTime:new Date().getTime(),
                bgColor:props.activeBackgroundColor
        }

      }
    render(){
        const {routes,index}=this.props.navigationState
        const {theme} = routes[index].params
        if(theme&&theme.updateTime>this.theme.updateTime){
            this.theme=theme
        }
        return (
            <TabBarBottom
                {...this.props}
                activeTintColor={this.theme.tintColor||this.props.activeTintColor}
                style={{background:this.theme.bgColor||'skyblue'}}
            ></TabBarBottom>
        )
    }
}
const LikeTabNavigation= TabNavigator({
        pop:{
            screen:PopularLikeScreen,
            navigationOptions:{
                title:"最热",
                tabBarLabel:"最热",
            },
        },
        trd:{
            screen:TrendingLikeScreen,
            navigationOptions:{
                title:"趋势",
                tabBarLabel:"趋势",
            },
        }

    },
    {
        tabBarPosition: "top",
        tabBarOptions: {
            activeTintColor: '#eee8aa',
            showIcon: false,
            showLabel: true,
            activeBackgroundColor: "skyblue",
            style: {
                backgroundColor: 'skyblue'
            }
        }
    })

export const APPTabNavigation=TabNavigator(
    {
        page1:{
            screen:PopularScreen,
            navigationOptions:{
                title:"热点",
                tabBarOptions:{
                    showIcon:true,
                },
                tabBarLabel:"火箭",
                tabBarIcon:({tintColor,focused})=>(
                    <Icon
                        name="rocket"
                        size={20}
                        style={{color:tintColor}}
                    />
                )
            },
        },
        page2:{
            screen:TreedingScreen,
            navigationOptions:{
                title:"趋势",
                tabBarLabel:"趋势",
                tabBarIcon:({tintColor,focused})=>(
                    <Icon
                        name="bookmark"
                        size={20}
                        style={{color:tintColor}}
                    />
                )
            },
        },
        page3:{
            screen:LikeTabNavigation,
            navigationOptions:{
                title:"喜欢",
                tabBarLabel:"喜欢",
                tabBarIcon:({tintColor,focused})=>(
                    <Icon
                        name="heart"
                        size={20}
                        style={{color:tintColor}}
                    />
                )
            },
        },
        page4:{
            screen:MeScreen,
            navigationOptions:{
                title:"me",
                tabBarLabel:"me",
                tabBarIcon:({tintColor,focused})=>(
                    <Icon
                        name="user"
                        size={20}
                        style={{color:tintColor}}
                    />
                )
            },
        },
},{
        tabBarComponent:TabBarComponent,
        tabBarPosition:"bottom",
        tabBarOptions:{
            activeTintColor:'#eee8aa',
            showIcon:true,
            showLabel:false,
            activeBackgroundColor:"skyblue",
            style:{
                backgroundColor:'skyblue'
            }
        }


    })


export const APPStackNavigation = StackNavigator(
    {
        Welcome:{
            screen:WelcomeScreen,
            navigationOptions:({navigation}) =>({
               header:null,
            })
        },

        Home: {
            screen: APPTabNavigation,
            navigationOptions:({navigation}) =>({
                headerRight:(
                    <TouchableOpacity
                        onPress={()=>{
                                navigation.navigate("Search")
                            }}
                    >
                      <Image  source={require("../static/images/search.png")} style={styles.rightBtn}/>

                    </TouchableOpacity>
                )
            })
        },
        Search:{
          screen:SearchScreen,
            navigationOptions:({navigation}) =>({
                headerTitle:(<TextInput
                    style={styles.headerTitle}
                    onChangeText={(value)=>{
                        navigation.state.params.keyword(value)
                    }}
                />),
                headerLeft:(<View>
                    <TouchableOpacity
                        onPress={()=>{navigation.goBack()}}>
                        <Image style={{width:22,height:22,marginLeft:10}} source={require("../static/images/back.png")}></Image>
                    </TouchableOpacity>
                </View>),
                headerRight:(<View style={{flexDirection:"row"}}>
                    <Text style={{color:"white",marginRight:10}} onPress={()=>{navigation.state.params.goSearch()}}>搜索</Text>
                </View>)
            }),
        },
        DetailPage:{
            screen:DetailPage,
            navigationOptions:({navigation}) =>({
                title:navigation.state.params.title,
                headerLeft:(<View>
                    <TouchableOpacity
                        style={{width:22,height:22,marginLeft:15,justifyContent:"center",alignItems:"center"}}
                        onPress={()=>{
                           navigation.state.params.action()
                        }}>
                        <Image style={{width:22,height:22}} source={require("../static/images/back.png")}></Image>
                    </TouchableOpacity>
                </View>),
                headerRight:(
                    <TouchableOpacity
                        onPress={()=>{
                            navigation.state.params.saveFavorite()
                        }}
                    >
                        {navigation.state.params.isFavorite?( <Image   source={require("../static/images/star_link.png")} style={styles.rightBtn}/>)
                        : <Image   source={require("../static/images/star.png")} style={styles.rightBtn}/>
                        }

                    </TouchableOpacity>
                )
            }),
        },
        FavoriteLans:{
            screen:FavoriteScreen,
            title:"选定喜欢的语言",
            navigationOptions:({navigation}) =>({
                headerLeft:(<View>
                    <TouchableOpacity
                        style={{width:22,height:22,marginLeft:15,justifyContent:"center",alignItems:"center"}}
                        onPress={()=>{
                            if(navigation.state.params.isBack){
                                Alert.alert("提示","是否放弃更改?",[{text:"要更改",onPress:()=>{navigation.setParams({"action":"_onSave"})}},{text:"不更改",onPress:()=>{navigation.goBack()}}])
                            }else{
                                navigation.goBack()
                            }
                        }}>
                        <Image style={{width:22,height:22}} source={require("../static/images/back.png")}></Image>
                    </TouchableOpacity>
                </View>),
                headerRight:(<View style={{flexDirection:"row"}}>
                    <Text style={{color:"white",marginRight:10}} onPress={()=>{navigation.setParams({"action":"_onSave"})}}>保存</Text>
                </View>)
            }),
        },
        RemoveFlag:{
            screen:RemvoeFlag,
            title:"移除指定标签",
            navigationOptions:({navigation}) =>({
                headerLeft:(<View>
                    <TouchableOpacity
                        style={{width:22,height:22,marginLeft:15,justifyContent:"center",alignItems:"center"}}
                        onPress={()=>{
                            if(navigation.state.params.isBack){
                                Alert.alert("提示","是否放弃更改?",[{text:"要更改",onPress:()=>{navigation.setParams({"action":"_onSave"})}},{text:"不更改",onPress:()=>{navigation.goBack()}}])
                            }else{
                                navigation.goBack()
                            }
                        }}>
                        <Image style={{width:22,height:22}} source={require("../static/images/back.png")}></Image>
                    </TouchableOpacity>
                </View>),
                headerRight:(<View style={{flexDirection:"row"}}>
                    <Text style={{color:"white",marginRight:10}} onPress={()=>{navigation.setParams({"action":"_onSave"})}}>移除</Text>
                </View>)
            }),
        },
        SortFlag:{
            screen:SortFlag,
            title:"排序标签",
            navigationOptions:({navigation}) =>({
                headerLeft: (<View>
                    <TouchableOpacity
                        style={{width:22,height:22,marginLeft:15,justifyContent:"center",alignItems:"center"}}
                        onPress={()=>{
                            if(navigation.state.params.isBack){
                                Alert.alert("提示","是否更改?",[{text:"要更改",onPress:()=>{navigation.setParams({"action":"_onSave"})}},{text:"不更改",onPress:()=>{navigation.goBack()}}])
                            }else{
                                navigation.goBack()
                            }
                        }}>
                        <Image style={{width:22,height:22}} source={require("../static/images/back.png")}></Image>
                    </TouchableOpacity>

                </View>),
            })
        },
        SortLang:{
            screen:SortFlag,
            title:"排序标签",
            navigationOptions:({navigation}) =>({
                headerLeft: (<View>
                    <TouchableOpacity
                        style={{width:22,height:22,marginLeft:15,justifyContent:"center",alignItems:"center"}}
                        onPress={()=>{
                            if(navigation.state.params.isBack){
                                Alert.alert("提示","是否更改?",[{text:"要更改",onPress:()=>{navigation.setParams({"action":"_onSave"})}},{text:"不更改",onPress:()=>{navigation.goBack()}}])
                            }else{
                                navigation.goBack()
                            }
                        }}>
                        <Image style={{width:22,height:22}} source={require("../static/images/back.png")}></Image>
                    </TouchableOpacity>

                </View>),
            })
        },
        Favorite:{
            screen:FavoriteScreen,
            title:"感兴趣的标签",
            navigationOptions:({navigation}) =>({
                headerLeft:(<View>
                    <TouchableOpacity
                        style={{width:22,height:22,marginLeft:15,justifyContent:"center",alignItems:"center"}}
                        onPress={()=>{
                            if(navigation.state.params.isBack){
                                Alert.alert("提示","是否放弃更改?",[{text:"要更改",onPress:()=>{navigation.setParams({"action":"_onSave"})}},{text:"不更改",onPress:()=>{navigation.goBack()}}])
                            }else{
                                navigation.goBack()
                            }
                        }}>
                        <Image style={{width:22,height:22}} source={require("../static/images/back.png")}></Image>
                    </TouchableOpacity>
                </View>),
                headerRight:(<View style={{flexDirection:"row"}}>
                    <Text style={{color:"white",marginRight:10}} onPress={()=>{navigation.setParams({"action":"_onSave"})}}>保存</Text>
                </View>)
            }),
        }
    },

    {
        navigationOptions:({navigation})=>{
            return ({
                headerTintColor:"white",
                headerTitleStyle:{alignSelf:"center"},
                headerStyle:{fontSize:20,backgroundColor:'skyblue',elevation:0,boxShadow:"none"},

             })
            },
            mode:"card",
            hedaerMode:'float',
            initialRouteParams: {
                // 设置初始参数
                name: 'Welcome'
            },
         }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rightBtn:{
        width:23,
        marginRight:10,
        height:23,
    },
    headerTitle:{
        flex:1,
        height: 40,
        fontSize: 16,
        color:"white",
        backgroundColor: 'skyblue',
        marginLeft: 10,  //左右留出一定的空间
        marginRight: 10,
        borderColor:"white",
    }
});