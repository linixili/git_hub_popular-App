import React from "react"
import {
    View,
    Text
} from "react-native"
export default class Welcome extends React.Component{
        constructor(props) {
            super(props);
            this.state = {};
          }

        componentDidMount() {
            this.timer=setTimeout(()=>{
                this.props.navigation.replace("Home",{})
            },2000)
        }
        componentWillUnMount(){
            this.timer?clearTimeout(this.timer):null;
        }
        render(){
            return (
                <View style={{alignItems:"center",justifyContent:"center",flex:1,backgroundColor:"skyblue"}}>
                    <Text style={{color:"white",fontSize:20}}>欢迎</Text>
                </View>
            )
        }
}