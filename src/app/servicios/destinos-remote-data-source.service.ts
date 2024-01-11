import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DestinosRemoteDataSourceService {

  private _baseUrl = 'http://api.opentripmap.com/0.1'
  
  constructor() { }

  apikey = '5ae2e3f221c38a28845f05b6d965da8ca4e4ce343ba50317ef0be2a2'
  name   = 'teatro'
  radius = '500000'
  lat    = '-33.000'
  lon    = '-73.000'
  limit  = '200'

  async getAutosuggest(): Promise<ViajeRemoto[]> {
    const path = 'en/places(autosuggest?format=json&name=' + 
                 this.name + this.radius + this.lat + this.lon +
                 this.apikey + this.limit
    const url = `${this._baseUrl}${path}`
    
    try{
      const res  = await fetch(url)
      const data = await res.json()
      return data
    } catch(error){
      console.error(error)
      throw error
    }
  }

  async getRegistro(): Promise<ViajeRemoto[]> {
    const res = await this.getAutosuggest()
    if(res) {
      return res
    } else {
      return []
    }
  }
  
  async getXid(xid:string): Promise<nombreLugar> {
    const path = 'en/places/xid/' + xid + '?apikey=' + this.apikey
    const url  = `${this._baseUrl}${path}`

    try{
      const res  = await fetch(url)
      const data = await res.json()
      return data
    } catch(error){
      console.error(error)
      throw error
    }
  }
}

  async getRegistroDetalle(xid:string): Promise<nombreLugar> {
    const res = await this.getXid(xid)
    return res
  }

export interface ViajeRemoto {
  xid             : string;
  name            : string;
  highlighted_name: string;
  dist            : string;
  rate            : string;
  osm             : string;
  wikidata        : string;
  kinds           : string;
  point: {
    lon           : string;
    lat           : string;
  }
}

export interface nombreLugar {
  kinds: string
  sources: {
    geometry: string
    attributes: string[]
  }
  bbox: {
    lat_max: string
    lat_min: string
    lon_max: string
    lon_min: string
  }
  point: {
    lon: string
    lat: string
  }
  osm: string
  otm: string
  xid: string
  name: string
  wikipedia: string
  image: string
  wikidata: string
  rate: string
  info: {
    descr: string
    image: string
    img_width: string
    src: string
    src_id: string
    img_height: string
  }
}

