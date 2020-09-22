
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
  categories(params){
    return request({
      url:'categories',
      method:'get',
      params
    })
  },
  categoriesll(data){
    return request({
      url:app.categoriesl,
      method:'post',
      data:qs.stringify(data)
    })
  },
  categorieslll(params,id){
    return request({
      url:`categories/${id}/attributes`,
      method:'get',
      params
    })
  },
  categoriesllll(data,id){
    return request({
      url:`categories/${id}/attributes`,
      method:'post',
      data:qs.stringify(data)
    })
  },
  categorieslllll(params,id,attr_id){
    return request({
      url:`categories/${id}/attributes/${attr_id}`,
      method:'get',
      params
    })
  },
  categoriesllllll(data,id,attr_id){
    return request({
      url:`categories/${id}/attributes/${attr_id}`,
      method:'put',
      data
    })
  },
  categorieslllllll(id,attrid){
    return request({
      url:`categories/${id}/attributes/${attrid}`,
      method:'delete',
      
    })
  },
  categoriesllllllll(data,id,attrid){
    return request({
      url:`categories/${id}/attributes/${attrid}`,
      method:'put',
      data
    })
  },
  goods(params){
    return request({
      url:`goods`,
      method:'get',
      params
    })
  },
  removegoods(id){
    return request({
      url:`goods/${id}`,
      method:'delete',
      
    })
  },
  addgoods(data){
    return request({
      url:'goods',
      method:'post',
      data:qs.stringify(data)
    })
  },
}


export default database