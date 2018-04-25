import {AsyncStorage} from "react-native"
import React from "react"
export var FAVORITE_KEY='FAVORITE_KEY'
export default class Dataresponse{
    // 构造
    constructor(flag) {
        // 初始状态
        this.favoriteKey=FAVORITE_KEY+flag
    }


    updateFavoriteKeys(key,type){

        AsyncStorage.getItem(this.favoriteKey,(e,result)=>{
            if(!e){
                if(result===null){
                    result={}
                }else{
                    result=JSON.parse(result)
                }

                if(!result.data){
                   result.data=[]
                }

                let index =result.data.indexOf(key)
                if(index===-1&&type==="Add"){
                    result.data.push(key)
                }else if(index!=-1&&type==="Remove"){
                    result.data.splice(index,1)
                }
                AsyncStorage.setItem(this.favoriteKey,JSON.stringify(result),e=>{});
            }
        })
    }

}