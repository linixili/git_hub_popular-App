import React from "react"
import {
    View,
    Text,
    ListView,
    RefreshControl,
    StyleSheet,
    AsyncStorage,
    ActivityIndicator,
    ScrollableTabView
}from "react-native"
import Toast,{DURATION} from "react-native-easy-toast"
import ResponseCell from "../../../component/popularpagecell"
const URL = "https://api.github.com/search/repositories?q="
const QUERY_STR='&sort=stars'
export default class SearchResult extends React.Component{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>(r1!==r2)}),
            isLoading:false,
            keyword:''
        }
    }


    _onloadData(){
        this.setState({"isLoading":true})
        fetch(URL+this.state.keyword+QUERY_STR).then(response=>response.json())
        .then(responseData=>{
            if(responseData&&responseData.items&&responseData.items.length){
                this.setState({dataSource:this.state.dataSource.cloneWithRows(responseData.items)})
            }else{
                this.toast.show("什么也没找到")
            }
            this.setState({"isLoading":false})
        }).catch(e=>{
            console.log(e)
        })

    }
    goSearch(){
        this._onloadData()
    }
    saveKeyword(v){
        this.setState({keyword:v})
    }
    componentWillMount() {
        this.props.navigation.setParams({"keyword":(v)=>{this.saveKeyword(v)}})
        this.props.navigation.setParams({"goSearch":()=>{this.goSearch()}})
    }
    onSelect(item){
        AsyncStorage.getItem('FAVORITE_KEYfavoritedeo',(e,result)=>{
            result=JSON.parse(result)
            if(result&&result.data.length){
                for(var i=0;i<result.data.length;i++){
                    if(result.data[i].id===item.id){
                        this.props.navigation.navigate("DetailPage",{detaildata:item,isFavorite:true})

                    }
                }
                this.props.navigation.navigate("DetailPage",{detaildata:item,isFavorite:false})
            }
        })
    }
    _renderRow(data){
        return (
            <View>
                <ResponseCell
                    data={data}
                    key={data.id}
                    onSelect={(data)=>this.onSelect(data)}
                />
            </View>
        )
    }
    render(){
        let indicator=this.state.isLoading?<ActivityIndicator
            animating={this.state.isLoading}
            style={stylesheet.indicator}
        ></ActivityIndicator>:null
        return (
            <View>
                {indicator}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data)=>this._renderRow(data)}
                    refreshControl={
                       <RefreshControl
                             colors={["#2196f3"]}
                             tintColor={"#2196f3"}
                             title={"loading..."}
                            refreshing={this.state.isLoading}
                            onRefresh={()=>this._onloadData()}
                       />
                      }
                    >
                </ListView>
                <Toast ref={toast=>this.toast=toast}></Toast>
            </View>
        )
    }
}
const stylesheet =StyleSheet.create({
    scrollbar:{
        backgroundColor:"skyblue"
    },
    indicator:{
        alignItems:"center",
        justifyContent:"center",
        flex:1,
        marginTop:30,
    }
})