import React from "react"

import {AsyncStorage} from "react-native"
import keys from "./keys.json"
import langs from "./langs.json"

export const FLAG_LANGUAGE = {flag_language:"flag_language",flag_key:"flag_language_key"}

export default  class Flag extends React.Component{
    // 构造
      constructor(flag,props) {
        super(props)
        this.flag=flag
        this.state = {};
      }
        fetch(){
            return new Promise((resolve,reject)=>{
                AsyncStorage.getItem(this.flag,(error,result)=>{
                    if(error){
                        reject(error)
                    }else{
                        if(result&&result.length){
                            try{
                                resolve(JSON.parse(result))
                            }
                            catch(e){
                                reject(e)
                            }
                        }else{
                            var data=this.flag===FLAG_LANGUAGE.flag_key?keys:langs
                                 this.save(data)
                                 resolve(data)
                        }
                    }
                })
            })
        }
    save(data){
        AsyncStorage.setItem(this.flag,JSON.stringify(data),(error)=>{})

    }
}