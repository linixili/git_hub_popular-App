import React from "react"
import {
    View,
    Text,
    ListView,
    RefreshControl,
    StyleSheet,
    AsyncStorage,
    ScrollableTabView
}from "react-native"
import ResponseCell from "../../component/popularpagecell"
export default class PopularLike extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>(r1!==r2)}),
            isLoading:false
        }
      }

    componentDidMount() {
        this._onloadData()
    }
    _onloadData(){
        this.setState({
            isLoading:true
        })
        AsyncStorage.getItem("FAVORITE_KEYfavoritedeo",(e,result)=>{
           if(!e){
               result=JSON.parse(result)
               if(result.data){
                   if(result.data.length){
                       this.setState({
                           dataSource:this.state.dataSource.cloneWithRows(result.data),
                           isLoading:false
                       })
                   }
               }

           }
        })
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
    scrollbar:{
        backgroundColor:"skyblue"
    }
})