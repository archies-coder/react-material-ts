import axios from 'axios'
import parseLink, { Links } from 'parse-link-header'


export const apis = axios.create({
  baseURL: 'http://52.66.55.89:18446',
  timeout: 5000,
  //headers: {'X-Custom-Header': 'foobar'}
});

interface CheckinModelOld {
  name: string,
  mobile: number,
  email: string,
  tomeet: string,
  purpose: string,
  gender: string,
  noofvisitor: number,
  company: string,
  country: string,
  organisation: string,
  site: string,
  vehicleno: string,
  belongings: string,
  idtype: string,
  idnumber: string
}
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

export interface VisitorInfo  {
  answer1: any,
  answer2: any,
  answer3: any,
  answer4: any,
  answer5: any,
  belongings: any,
  checkin_id: any,
  city: any,
  company: any,
  country: any,
  email: any,
  gender: any,
  idCardImagePath: any,
  idtype: any,
  intime: any,
  mobile: any,
  name: any,
  ndastatus: any,
  noofvisitor: any,
  organisation: any,
  outime: any,
  policycheckstatus: any,
  profilePicPath: any,
  purpose: any,
  signaturePath: any,
  site: any,
  tomeet: any,
  usertype: any,
  vehicleno: any
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

export async function getVisitorData() {
  const url = `/product/reception/checkin/user/data`

  const { data } = await apis.get(url)
  // debugger
  return {
    //pageLinks: '',
    pageCount: 1,
    visitors: data.data
  }
  // debugger
}

export async function getVisitorInfo() {
  const url = ``

  //const { data } = await apis.post(url)
  const sample = {
    avatar: '',
    name: 'Vijaya Tondon from API',
    mobileNo: 9754821630,
    personToMeet: 'Ramesh Chawla',
    purpose: 'Meeting',
    inTime: '11:30 am',
    outTime: '2:30 pm',
  }
  let data = []
  for (let i = 0; i < 10; i++) {
    let copy: any = sample

    data.push(copy)
  }
  return {
    //pageLinks: '',
    pageCount: 1,
    visitors: data
  }
}

export async function getHomeStats() {
  const url = `/product/stats/data`

  const { data } = await apis.get(url)
  return data
}

export async function getInvitesData() {
  const url = `/product/reception/invite/user/data`

  const { data } = await apis.get(url)

  return {
    //pageLinks: '',
    pageCount: 1,
    invites: data.data
  }

}

export async function getEmployeesData(){
  const url = `/product/reception/checkin/user/data`

  const { data } = await apis.get(url)

  return {
    //pageLinks: '',
    pageCount: 1,
    employees: data.data
  }

}

export async function getSitesData(){
  const url = `/product/reception/checkin/user/data`

  const { data } = await apis.get(url)

  return {
    //pageLinks: '',
    pageCount: 1,
    sites: data.data
  }

}

export async function getDevicesData(){
  const url = `/product/device/data`

  const { data } = await apis.get(url)
  // debugger
  return {
    //pageLinks: '',
    pageCount: 1,
    devices: data.data
  }

}

export async function getUsersData(){
  const url = `/product/device/data`

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
export async function createInvite(json:string) {
  return await apis.post('/product/reception/user/invite', json, {
    headers: {
      "Content-Type": "application/json",
      // "Content-Length": 2617
    },
  })
}