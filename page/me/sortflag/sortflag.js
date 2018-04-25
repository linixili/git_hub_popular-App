import React from "react"

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight
} from "react-native"
import Language_demo,{FLAG_LANGUAGE} from "../../../utils/asyncstorage"
import ArrayUtils from "../../../utils/arrayUtils"
import SortableListView from "react-native-sortable-listview"
export default class Sort extends React.Component{
    // 构造
    constructor(props) {
        super(props);
        this.middleArray=[],
        this.state = {
            dataArray:[],
        };
        this.languageDeo=new Language_demo(this.props.navigation.state.params.type)
    }

    _loadData(){
        this.languageDeo.fetch()
            .then(result=>{
                this.middleArray=result.map((lan,i,arr)=>{
                    if(lan.checked){
                        return lan
                    }
                })
                this.setState({"dataArray":result})
                })
            .catch(e=>{
                console.log(e)
            })
    }
    _onSave(){
        let finalArr=[]
       this.state.dataArray.forEach((a,i,arr)=>{
               if(!a.checked===true){
                   finalArr.push(a)
               }
       })

        this.middleArray.forEach((a,i,arr)=>{
            finalArr.push(a)
        })
        this.languageDeo.save(finalArr)
        this.props.navigation.goBack()
    }

    componentWillMount() {
        this.props.navigation.setParams({"isBack":true})
    }
    componentDidMount() {
        this._loadData()
    }
    render(){
        const {state:{params,routeName,key},setParams,navigate}=this.props.navigation
        if(this.middleArray.length===0)return null
        if(params.action&&params.action==='_onSave'){
            this._onSave()
        }
        let order = Object.keys(this.middleArray)
           return (
               <View style={stylesheet.container}>
                   <SortableListView
                       style={{flex:1}}
                       data={this.middleArray}
                       order={order}
                       onRowMoved={(e)=>{
                        order.splice(e.to,0,order.splice(e.from,1)[0])
                    }}
                       renderRow={row=><SortCell row={row}></SortCell>}
                   />
               </View>
           )
    }
}
class SortCell extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }
    render(){
        if(!this.props.row){return null}

        return  <TouchableHighlight
            underlayColor={'#eee'}
            delayLongPress={100}
            style={{
            padding: 15,
            backgroundColor: '#F8F8F8',
            borderBottomWidth: 1,
            borderColor: '#eee',
         }}
            {...this.props.sortHandlers}
        >
            <View style={{flexDirection:"row"}}>
                <Image style={{width:20,height:20,marginRight:10}} source={require("../../../static/images/category.png")}/>
                <Text>{this.props.row.name}</Text>
            </View>
        </TouchableHighlight>
    }
}
const stylesheet = StyleSheet.create({
    container:{
        flex:1,
    },

})