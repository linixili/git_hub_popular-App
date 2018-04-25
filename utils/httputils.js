export default class HttpUtils{
    static get(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
                .then(response=>response.json())
                .then(result=>{
                     resolve(JSON.stringify(result))
                }).catch(error=>{
                     reject(JSON.stringify(error))
            })

        })
    }
    static post (url,data){
        return new Promise((resolve,reject)=>{
            fetch(url,{
                method:"POST",
                header:{
                    'Accept':"application/json",
                    'Content-Type':"application/json"
                },
                body:data
            })
            .then(response=>response.json())
            .then(result=>{
                resolve(JSON.stringify(result))
            })
            .catch(error=>{
                  reject(JSON.stringify(error))
            })
        })
    }
}