import request,{requestPost,commonRequest} from "./request";


export async function getCaptcha(data){
  return await commonRequest("/captcha","GET",data)
}

export async function login(data){
  return await commonRequest("/auth/login","POST",data)
}