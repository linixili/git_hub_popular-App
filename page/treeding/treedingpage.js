import React from "react"
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    ListView,
    RefreshControl,
    AsyncStorage,
    StatusBar,
    DeviceEventEmitter
} from "react-native"
import Toast,{DURATION} from "react-native-easy-toast"
import ScrollableTabView,{ScrollableTabBar} from "react-native-scrollable-tab-view"
import HttpUtils from "../../utils/httputils"
import ResponseCell from "../../component/trendingcell"
import Language_demo,{FLAG_LANGUAGE} from "../../utils/asyncstorage"
import Dataresponse,{FLAG_STORAGE} from "../../utils/dataresponse"
const URL = "https://github.com/trending/"
const QUERY='?since=today'
var dataRepository = new Dataresponse(FLAG_STORAGE.flag_trending)
export default class Trendingpage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            isLoading:false,
            dataArray:[]
        }
        this.languageDeo= new Language_demo("flag_language_langs")
    }

    componentDidMount() {
        this.listener=DeviceEventEmitter.addListener("showToast",(text)=>{
            this.toast.show(text,DURATION.LENGTH_LONG);
        })
        this._loadData()
    }

    componentWillUnmount() {
        this.listener&&this.listener.remove()
    }
    _loadData(){
        this.languageDeo.fetch()
            .then(result=>{
                this.setState({"dataArray":result})
            })
            .catch(e=>{
                console.log(e)
            })
    }

    render(){
        let content = this.state.dataArray.length>0?(
            <ScrollableTabView
                tabBarInactiveTextColor="mintcream"
                tabBarActiveTextColor="white"
                tabBarUnderlineStyle={{backgroundColor:'mintcream',height:2}}
                renderTabBar={()=>(<ScrollableTabBar style={stylesheet.scrollbar}/>)}>
                {
                    this.state.dataArray.map((lan,i,arr)=>{
                        return   lan.checked? <PopularTab tabLabel={lan.name} key={i} {...this.props}>{lan.name}</PopularTab>:null
                    })
                }
            </ScrollableTabView>
        ):null
        return (
            <View style={stylesheet.container}>
                <StatusBar   backgroundColor={'skyblue'}
                             barStyle={'light-content'} style={{backgroundColor:"skyblue",coclor:"white"}}/>
                {content}
                <Toast ref={toast=>this.toast=toast}></Toast>
            </View>
        )
    }
}
class PopularTab extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>(r1!==r2)})
        }
    }
    componentDidMount() {
        this._onloadData()
    }
    _onloadData(){
        this.setState({
            "isLoading":true
        })
        dataRepository.fetchResponsicity(URL+this.props.tabLabel+QUERY).then(result=> {
            let items = result && result.items ? result.items : result ? result : []
            this.setState({'dataSource': this.state.dataSource.cloneWithRows(items), isLoading: false})
                    if(result&&result.update_data&&!dataRepository.checkDate(result.update_data)){
                        DeviceEventEmitter.emit("showToast",'数据过时')
                        return dataRepository.fetchNetResponse(URL+this.props.tabLabel+QUERY)
                    }else{
                        DeviceEventEmitter.emit("showToast",'显示缓存数据')
                    }
                })
                .then(resultitems=>{
                    if(!resultitems||resultitems.length===0)return
                    DeviceEventEmitter.emit("showToast",'显示网络数据')
                    this.setState({'dataSource':this.state.dataSource.cloneWithRows(resultitems),isLoading:false})
                }).catch(e=>{
                this.setState({isLoading:false})
            })
    }
    onSelect(item){

        AsyncStorage.getItem('FAVORITE_KEYtrending',(e,result)=>{
            result=JSON.parse(result)
            if(result&&result.data.length){
                for(var i=0;i<result.data.length;i++){
                    if(result.data[i]===item.fullName){
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
        return (
            <View style={{flex:1}}>
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
                ></ListView>
            </View>
        )
    }
}
const stylesheet =StyleSheet.create({
    container:{
        flex:1,
    },
    textinput:{
        width:200,
    },
    scrollbar:{
        backgroundColor:"skyblue",
    }
})
