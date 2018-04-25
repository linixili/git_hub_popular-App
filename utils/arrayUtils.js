export default dataArrayUtils={
     changeValue(changesValues,data){
        for(var i=0;i<changesValues.length;i++){
            if(data.name===changesValues[i]){
                changesValues.splice(i,1);
                return
            }
        }
         changesValues.push(data)
     }
}