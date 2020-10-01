import axios from 'axios'
import parseLink, { Links } from 'parse-link-header'
import { VisitorInfo } from 'features/Home/visitorSlice';
import { Tune } from '@material-ui/icons';

export const serverUrl= 'http://52.66.55.89:18446/'
export const apis = axios.create({
  baseURL: serverUrl,
  timeout: 10000,
  //headers: {'X-Custom-Header': 'foobar'}
});

interface CheckinModel {
  profilepic: any//""
  idcard: any//""
  signature: any//""
  name: any//"arjun"
  mobile: any//"9769335758"
  email: any//"arjunpanwar85@gmail.com"
  tomeet: any//"arjunp"
  purpose: any//"tomeet"
  gender: any//"male"
  visitorcount: any//"2"
  company: any//"test"
  country: any//"India"
  organisation: any//"test"
  site: any//"test"
  vehicleno: any//"test"
  belongings: any//"test"
  idtype: any//"pancard"
}

interface UserModel {
  username: any,
  password: any,
  name: any,
  usertype: any
}



// export interface VisitorInfo {
//   avatar: any,
//   name: any,
//   mobileNo: any,
//   personToMeet: any,
//   purpose: any,
//   inTime: any,
//   outTime: any,
// }
export interface VisitorsResult {
  //pageLinks: Links | null
  pageCount: number
  visitors: VisitorInfo[]
}
export async function checkin(model: CheckinModel) {
  const url = `/product/reception/user/checkin`

  const { data } = await apis.post<CheckinModel>(url, { data: model })
  return data
}

export async function login(model: UserModel) {
  const url = `/product/login`

  const { data } = await apis.post(url)
  return data
}

export async function register(model: UserModel) {
  const url = `/product/acountDetail/register`

  const { data } = await apis.post(url)
  return data
}

export async function data(model: any) {
  const url = `/product/reception/user/data`

  const { data } = await apis.get(url)
  return data

}

interface VisitorModel {
  "belongings": any//"belongings",
  "company": any//"company",
  "country": any//"country",
  "email": any//"arjunpanwar85@gmail.com",
  "gender": any//"gender",
  "idnumber": any//"idtype",
  "idtype": any//"idtype",
  "intime": any//"2020-09-10 00:29:31",
  "mobile": any//9769335758,
  "name": any//"arjun",
  "noofvisitor": any// 4,
  "organisation": any//"organisation",
  "purpose": any//"to meet",
  "site": any//"site",
  "tomeet": any//"Arjunp",
  "vehicleno": any//"vehicleno"
}

export async function getVisitorData(page:number=0,count:number=10,visitor:String = '',purpose:String = '', site:String='') {
  const url = `/product/reception/checkin/user/data?page=${page}&count=${count}&visitor=${visitor}&purpose=${purpose}&site=${site}`

  const { data } = await apis.get(url)
  // debugger
  return {
    //pageLinks: '',
    pageCount: data.totalCount,
    visitors: data.data
  }
  // debugger
}

export async function getInOfficeVisitorData(page:number=0,count:number=10,visitor:String = '',purpose:String = '', site:String='') {
  const url = `/product/reception/checkin/in/user/data?page=${page}&count=${count}&visitor=${visitor}&purpose=${purpose}&site=${site}`

  const { data } = await apis.get(url)
  // debugger
  return {
    //pageLinks: '',
    pageCount: data.totalCount,
    visitors: data.data
  }
  // debugger
}

export async function getHomeStats() {
  const url = `/product/stats/data?page=0&count=10`

  const { data } = await apis.get(url)
  return data
}

export async function getInvitesData(page:number=0,count:number=10,visitor:String = '',purpose:String = '', site:String='') {
  const url = `/product/reception/invite/user/data?page=${page}&count=${count}&visitor=${visitor}&purpose=${purpose}&site=${site}`

  const { data } = await apis.get(url)

  return {
    //pageLinks: '',
    pageCount: data.totalCount,
    invites: data.data
  }

}

export async function getInOfficeInviteData(page:number=0,count:number=10) {
  const url = `/product/reception/checkin/in/user/data?page=${page}&count=${count}`

  const { data } = await apis.get(url)
  // debugger
  return {
    //pageLinks: '',
    pageCount: data.totalCount,
    invites: data.data
  }
  // debugger
}


export async function getEmployeesData(page:number=0,count:number=10,filter:string='') {
  const url = `/product/employee/data?page=${page}&count=${count}&keyword=${filter}`

  const { data } = await apis.get(url)

  return {
    //pageLinks: '',
    pageCount: data.totalCount,
    employees: data.data
  }

}

export async function getSitesData(page:number=0,count:number=10) {
  const url = `/product/site/data?page=${page}&count=${count}`

  const { data } = await apis.get(url)

  return {
    //pageLinks: '',
    pageCount: data.totalCount,
    sites: data.data.map((item:any,i:any)=>({...item,site_id:i}))
  }

}
export async function getCheckInPointsData(page:number=0,count:number=10) {
  const url = `/product/checkinpoint/data?page=${page}&count=${count}`

  const { data } = await apis.get(url)

  return {
    //pageLinks: '',
    pageCount: data.totalCount,
    checkInPoints: data.data.map((item:any,i:any)=>({...item,checkinpoint_id:i}))
  }

}

export async function getDevicesData(page:number=0,count:number=10) {
  const url = `/product/device/data?page=${page}&count=${count}`

  const { data } = await apis.get(url)
  // debugger
  return {
    //pageLinks: '',
    pageCount: data.totalCount || 20,
    devices: data.data
  }

}

export async function getPurpose(page:number=0,count:number=10) {
  const url = `/product/reception/meeting/purpose/data?page=${page}&count=${count}`

  const { data } = await apis.get(url)
  // debugger
  return {
    //pageLinks: '',
    pageCount: data.totalCount || 20,
    purpose: data.data
  }

}

export async function getUsersData() {
  const url = `/product/device/data?page=0&count=10`

  const { data } = await apis.get(url)
  // debugger
  return {
    //pageLinks: '',
    pageCount: 1,
    users: data.data
  }

}

export async function checkout(id: any) {
  await apis.post('/product/reception/user/checkout', JSON.stringify({
    "checkin_id": id
  }), {
    headers: {
      "Cache-Control": "no-cache",
      'Content-Type': 'application/json'
    }
  })
}
export async function createInvite(json: string) {
  return await apis.post('/product/reception/user/invite', json, {
    headers: {
      "Content-Type": "application/json",
      // "Content-Length": 2617
    },
  })
}
export async function createDevice(json: string) {
  return await apis.post('/product/acountDetail/device/register', json, {
    headers: {
      "Content-Type": "application/json",
      // "Content-Length": 2617
    },
  })
}
export async function createEmployee(formData: any) {
  return await apis.post('/product/employee/register', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      // "Content-Length": 2617
    },
  })
}
export async function createSite(json: string) {
  return await apis.post('/product/register/site', json, {
    headers: {
      "Content-Type": "application/json",
      // "Content-Length": 2617
    },
  })
}
export async function createCheckInPoint(json: string) {
  return await apis.post('/product/register/checkinpoint', json, {
    headers: {
      "Content-Type": "application/json",
      // "Content-Length": 2617
    },
  })
}

export async function signIn(username: string, password: string) {
  return await apis.post('/product/login', JSON.stringify({
    "username": username,
    "password": password
  }), {
    headers: {
      'Content-type': 'application/json'
    }
  })
}
// panwar.arjunp@gmail.com 12345

export async function signUp(username: string, password: string, name: string, userType: string) {
  return await apis.post('/product/accountDetail/register',
    JSON.stringify({
      "username": username,
      "password": password,
      "name": name,
      "usertype": userType
    }), {
    headers: {
      'Content-type': 'application/json'
    }
  })
}

export async function getVisitorConfigData() {
  //const url = `/product/reception/checkin/user/data?page=${page}&count=${count}&visitor=${visitor}&purpose=${purpose}&site=${site}`

  //const { data } = await apis.get(url)
  // debugger
  const data ={
    answer1: true,
    answer2: true,
    answer3: true,
    answer4: true,
    answer5: true,
    belongings: true,
    checkin_id: true,
    city: true,
    company: true,
    country: true,
    email: true,
    gender: true,
    idCardImagePath: true,
    idtype: true,
    intime: true,
    mobile: true,
    name: true,
    ndastatus: true,
    noofvisitor: true,
    organisation: true,
    outime: true,
    policycheckstatus: true,
    profilePicPath: true,
    purpose: true,
    signaturePath: true,
    site: true,
    tomeet: true,
    usertype: true,
    vehicleno: true
  }
  return {
    //pageLinks: '',
    pageCount: 10,//data.totalCount,
    //@ts-ignore
    visitorConfigs: Object.keys(data).map((i:string)=>({key:i,value:data[i]}))//data.data
  }
  // debugger
}

export async function getContractorData(page:number=0,count:number=10,contractor:String = '',purpose:String = '', site:String='') {
  const url = `/product/reception/checkin/user/data?page=${page}&count=${count}&contractor=${contractor}&purpose=${purpose}&site=${site}`

  const { data } = await apis.get(url)
  // debugger
  return {
    //pageLinks: '',
    pageCount: data.totalCount,
    contractors: data.data
  }
  // debugger
}

export async function getInOfficeContractorData(page:number=0,count:number=10,contractor:String = '',purpose:String = '', site:String='') {
  const url = `/product/reception/checkin/in/user/data?page=${page}&count=${count}`

  const { data } = await apis.get(url)
  // debugger
  return {
    //pageLinks: '',
    pageCount: data.totalCount,
    contractors: data.data
  }
  // debugger
}
