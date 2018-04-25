import React from "react"

import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native"
import CheckBox from "react-native-check-box"
import Toast from "react-native-easy-toast"
import Language_demo,{FLAG_LANGUAGE} from "../../../utils/asyncstorage"
import ScrollableTabView,{ScrollableTabBar} from "react-native-scrollable-tab-view"
import ArrayUtils from "../../../utils/arrayUtils"
export default class Me extends React.Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            onsave:false,
            dataArray:[],
        };
        this.changesValues=[],
        this.languageDeo=new Language_demo(this.props.navigation.state.params.type)
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

    componentDidMount() {
        this._loadData()
    }
    _onSave(){
        if(this.changesValues){
            this.languageDeo.save(this.state.dataArray)
        }
        this.props.navigation.goBack()
    }
    _onClick(data){
        data.checked=!data.checked
        let msg = data.checked?'you checked':"you unchecked"
        this.toast.show(msg+' '+data.name)
        ArrayUtils.changeValue(this.changesValues,data)
        this.props.navigation.setParams({"isBack":true})
    }
    _renderDom(data){
        return (
            <CheckBox
                leftText={data.name}
                style={{flex:1,padding:10}}
                onClick={()=>{this._onClick(data)}}
                isChecked={data.checked}
                checkedImage={<Image style={{width:22,height:22}} source={require('../../../static/images/check-box.png')}/>}
                unCheckedImage={<Image style={{width:22,height:22}} source={require('../../../static/images/check_box_outline_blank.png')}/>}
            ></CheckBox>
        )
    }
    _renderView(){
        if(!this.state.dataArray||this.state.dataArray.length===0)return

        let len =this.state.dataArray.length
        let views=[]
        for(var i=0 ;i<len-2;i+=2){
           views.push(
               <View key={i}>
                  <View style={stylesheet.item}>
                      {this._renderDom(this.state.dataArray[i])}
                      {this._renderDom(this.state.dataArray[i+1])}
                  </View>
                   <View style={stylesheet.line}></View>
               </View>
           )
        }
        views.push(
            <View key={len-1} style={{flexDirection:"row"}}>
                {len % 2===0? this._renderDom(this.state.dataArray[len-2]):null}
                {this._renderDom(this.state.dataArray[len-1])}
            </View>
        )
        return views

    }
    render(){

        const{
            state:{params,routeName,key},
            navigate,
            setParams
            }=this.props.navigation
        if(params.action&&params.action==='_onSave'){
            this._onSave();
        }
        return (
            <View>
                    {this._renderView()}
                <Toast ref={e=>{this.toast=e}}/>
            </View>
        )
    }
}
const stylesheet = StyleSheet.create({
    container:{
        flex:1,
    },
    item:{
        flexDirection:"row",
    },
    line:{
        flex:1,
        height:1,
        backgroundColor:"gray"
    }
})