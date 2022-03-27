const Waxpeer =require('waxpeer') 
const WP = new Waxpeer.Waxpeer('c71343cc53d1be7df9eec017ab7c522254ee14426f188cbcba5aebf58187ea31')
const express=require('express')
app=express()
app.get('/',()=>{
var item_id_array,item_name_array;
let search = function(element) {
        return WP.searchItems(element);
    }

let getListedItems = function(){
    return WP.myListedItems();
}
let update =function(item_id,toSetprice){
 return WP.editItems([{ item_id: parseInt(item_id), price: toSetprice }])
}
    let user=getListedItems().then(function(result){
        let len=result.items.length
        var item_name_array=[]
        for(let i=0;i<len;i++){
        item_name_array.push(result.items[i].name)}
        result=JSON.stringify(result);
        var item_id_array=result.match(/\d{8,}/g)
        for(let i=0;i<item_name_array.length;i++){          
        let userToken = search(item_name_array[i])
        userToken.then(async function(result) {
            result=JSON.stringify(result)
            let cleanJsonRegex = /:\d+/g
            let nameJsonStr = result.match(cleanJsonRegex).toString().match(/\d+/g).sort()
            var toSetprice=nameJsonStr[0]-1;
            console.log(item_name_array[i]+" "+item_id_array[i]+ " :"+toSetprice)
            let setPriceRes=await update(item_id_array[i],toSetprice).then(function(result){console.log(result)})
        })
    }
})
})
app.listen(3000,()=>{
        console.log("Server Running on 3000")
})
