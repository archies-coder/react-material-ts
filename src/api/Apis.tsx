import axios from 'axios'
import parseLink, { Links } from 'parse-link-header'


const apis = axios.create({
  baseURL: 'http://52.66.55.89:18446',
  timeout: 5000,
  //headers: {'X-Custom-Header': 'foobar'}
});

interface CheckinModel {
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

interface UserModel {
  username: any,
  password: any,
  name: any,
  usertype: any
}

export interface VisitorInfo {
  avatar: any,
  name: any,
  mobileNo: any,
  personToMeet: any,
  purpose: any,
  inTime: any,
  outTime: any,
}
export interface VisitorsResult {
  //pageLinks: Links | null
  pageCount: number
  visitors: VisitorInfo[]
}
export async function checkin(model: CheckinModel) {
  const url = `/product/reception/user/checkin`

  const { data } = await apis.post<CheckinModel>(url)
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

export async function getHomeStats(){
  const url = `/product/stats/data`

  const { data } = await apis.get(url)
  return data
}