import {AsyncStorage} from "react-native"
import React from "react"
import GitHubTrending from "GitHubTrending"
export var FLAG_STORAGE={flag_popular:"popular",flag_trending:'trending'}
export default class Dataresponse{
    // 构造
      constructor(flag) {
        // 初始状态
          this.flag=flag
          if(this.flag===FLAG_STORAGE.flag_trending)this.trending=new GitHubTrending();
        this.state = {};
      }
     fetchResponsicity(url){
        return new Promise((resolve,reject)=>{
            //优先获取本地数据
           this.fetchLoacalResponse(url)
               .then(result=>{
               if(result){
                   resolve(result)
               }else{
                   this.fetchNetResponse(url)
                       .then(result=>{
                        resolve(result)
                   }).catch(e=>{
                       reject(e)
                   })
               }
           })
        })
    }
     fetchLoacalResponse(url){
      return new Promise((resolve,reject)=>{
          AsyncStorage.getItem(url,(error,result)=>{
              if(!error){
                  try{
                      resolve(JSON.parse(result))
                  }
                  catch(e){
                      reject(e)
                  }
              }
          })
      })
    }
       fetchNetResponse(url){
           if(this.flag===FLAG_STORAGE.flag_trending){
              return new Promise((resolve,reject)=>{
                  this.trending.fetchTrending(url)
                      .then(result=>{
                          if(!result){
                              reject(new Error("resonseData is null"))
                              return
                          }
                          resolve(JSON.stringify(result))
                          this.svaeResponse(url,result)
                      }).catch(e=>{
                      reject(e)
                  })
              })
           }else{
               return new Promise((resolve,reject)=>{
                   fetch(url).then(result=>result.json())

                       .then(res=>{
                           if(!res){
                               reject(new Error("resonseData is null"))
                               return
                           }
                           resolve(res.items)
                           this.svaeResponse(url,res.items)
                       }).catch(e=>{
                       reject(e)
                   })
               })
           }

    }
      svaeResponse(url,items,callback){
        if(!url||!items)return
        let res = {items:items,update_data:new Date().getTime()}
        AsyncStorage.setItem(url,JSON.stringify(res),callback)
    }
      checkDate(longTime){
        let cDate=new Date();
        let tDate=new Date();
        tDate.setTime(longTime)
        if(cDate.getMonth()!=tDate.getMonth())return false
        if(cDate.getDay!=tDate.getDay())return false
        if((cDate.getHours()+4)<tDate.getHours())return false
        return true
    }
}