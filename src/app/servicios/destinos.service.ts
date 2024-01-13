import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DestinosService {

  constructor() {}

  viajesPosibles:ViajesPosibles[] = []
  misViajes:MisViajes[] = []

  name   = 'parque'

  private _baseUrl = 'http://api.opentripmap.com/0.1/'
  apikey = '5ae2e3f221c38a28845f05b6d965da8ca4e4ce343ba50317ef0be2a2'

  //fn obtener listado de lugaresde desde api segun igualdad con propiedad "name"
  async getAutosuggest(): Promise<ViajeRemoto[]> {
    const path = 'en/places/autosuggest?format=json&name='+this.name+'&radius=300000&lat=-33.45694&lon=-70.64827&apikey='+this.apikey+'&limit=4'
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

  //fn obtener lugar por id desde api
  async getXid(xid:string): Promise<ViajeDetalle> {
    const path = 'en/places/xid/' + xid + '?apikey=' + this.apikey
    const url = `${this._baseUrl}${path}`
    try {
      const res = await fetch(url)
      const data = await res.json()
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  //fn agpregar registro al listado
  async getRegistroDetallado(xid: string): Promise<ViajesPosibles> {
    const res = await this.getXid(xid)
    return {
      xid: res.xid,
      name: res.name,
      country: res.address.country,
      imageurl:'https://img.freepik.com/vector-premium/icono-planeta-tierra-vectorial-icono-planeta-tierra-plano-ilustracion-vectorial-diseno-plano-banner-web-infografia-web-movil-icono-grafico-vectorial-tierra-icono-vectorial-aislado-sobre-fondo-degradado_724904-466.jpg?w=826'
    }
  }

  //
  async getRegistro(buscarlugar:string): Promise<ViajesPosibles[]> {
    this.viajesPosibles = []
    if(buscarlugar && buscarlugar.trim() !== ""){
      this.name = buscarlugar
    }
    const res = await this.getAutosuggest();
    res.forEach(async (element) => {
      this.viajesPosibles.push(await this.getRegistroDetallado(element.xid))
    })
    return this.viajesPosibles
  }

  //agregar registros
  addMisViajes(miviaje:MisViajes): { mensaje:string; tipo:string } {
    var existe = this.misViajes.find((x) => x.xid === miviaje.xid)
    if(!existe) {
      this.misViajes.push(miviaje)
      return { mensaje: 'Haz añadido un nuevo destino a la lista!', tipo: 'success'}
    } else {
      return { mensaje: 'Ey! el registro ya existe en la lista.', tipo: 'warning'}
    }
  }

  getMisViajes() {
    return this.misViajes
  }

  //fn modificar precio de viaje
  updateMisViajes(valor:number, xid:string | undefined):{ mensaje:string; tipo:string } {
    var msg:string = ''
    var tipo: string = ''
    this.misViajes.forEach((objeto) => {
      if (objeto.xid === xid) {
        objeto.precio = valor
        msg  = 'Haz actualizado el precio!'
        tipo = 'success'
      }
    })
    if (!msg){
      msg  = 'El precio no pudo ser actualizado',
      tipo = 'warning'
    }
    return { mensaje: msg, tipo: tipo}
  }

  updateFoto(
    image: string | undefined,
    xid: string | undefined
  ): { mensaje: string; tipo: string } {
    var msg: string = ''
    var tipo: string = ''
    this.misViajes.forEach((objeto) => {
      if (objeto.xid === xid) {
        objeto.imageurl = image
        msg = 'Haz actualizado la imagen!'
        tipo = 'success'
      }
    })
    if (!msg) {
      msg = 'La imagen no pudo ser actualizada'
      tipo = 'warning'
    }
    return { mensaje: msg, tipo: tipo }
  }
  

  //fn eliminar de la lista
  deleteMisViajes(xid?:string): { mensaje:string; tipo:string }{
    const index = this.misViajes.findIndex((objeto) => objeto.xid === xid)
    if (index !== -1) {
      this.misViajes.splice(index, 1)
      return {
        mensaje: 'Haz eliminado el registro',
        tipo: 'success'
      }
    } else {
      return { mensaje: 'El registro no pudo ser eliminado', tipo: 'warning'}
    }
  } 
}


//interfaces

export interface ViajesPosibles {
  xid: string
  name: string
  country: string
  imageurl: string
}

export interface MisViajes {
  xid?: string
  name?: string
  country?: string
  imageurl?: string
  precio: number
}


export interface ViajeRemoto {
  xid: string
  name: string
  highlighted_name: string
  dist: string
  rate: string
  osm: string
  wikidata: string
  kinds: string
  point: {
    lon: string
    lat: string
  }
}

export interface ViajeDetalle {
  xid: string;
  name: string;
  address: {
    city: string;
    road: string;
    state: string;
    county: string;
    suburb: string;
    country: string;
    postcode: string;
    country_code: string;
    neighbourhood: string;
  };
  rate: string;
  osm: string;
  bbox: {
    lon_min: string;
    lon_max: string;
    lat_min: string;
    lat_max: string;
  };
  wikidata: string;
  kinds: string;
  url: string;
  sources: {
    geometry: string;
    attributes: string[];
  };
  otm: string;
  wikipedia: string;
  image: string;
  preview: {
    source: string;
    height: string;
    width: string;
  };
  wikipedia_extracts: {
    title: string;
  };
  point: {
    lon: string;
    lat: string;
  };
}
