
import request from "./reques"
import {app} from "./api"
import qs from "qs"


const database = {
  logins(data){
    return request({
      url:app.loginadd,
      method:'post',
      data:qs.stringify(data)
    })
  }
}


export default database