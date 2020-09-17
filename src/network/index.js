
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
  },
  menus(data){
    return request({
      url:app.menus,
      method:'get',
      data:qs.stringify(data)
    })
  },
  users(params){
    return request({
      url:app.users,
      method:'get',
      params:params
    })
  },
  put(params){
    return request({
      url:`users/${params.id}/state/${params.mg_state}`,
      method:'put',
      params:params
    })
  },
  userss(data){
    return request({
      url:app.userss,
      method:'post',
      data:qs.stringify(data)
    })
  },
  userId(params){
    return request({
      url:`/users/${params}`,
      method:'get',
      params:params
    })
  },
  compile(data){
    return request({
      url:`users/${data.id}`,
      method:'put',
      data
    })
  },
  remove(data){
    return request({
      url:`users/${data}`,
      method:'delete',
      data
    })
  },
  rights(params){
    return request({
      url:app.rights,
      method:'get',
      params:params
    })
  },
  roles(params){
    return request({
      url:app.roles,
      method:'get',
      params:params
    })
  },
  removeroles(roles,rightId){
    return request({
      url:`roles/${roles.id}/rights/${rightId}`,
      method:'delete',
      
    })
  },
  rolescompile(params){
    return request({
      url:`rights/tree`,
      method:'get',
      params:params
    })
  },
  rolesrights(rids,id){
    return request({
      url:`roles/${id}/rights`,
      method:'post',
      data:rids
    })
  },
  rolecompile(id,rid){
    return request({
      url:`users/${id}/role`,
      method:'put',
      data:rid
    })
  },
}


export default database