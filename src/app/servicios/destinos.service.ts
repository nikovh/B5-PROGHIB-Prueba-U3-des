import { Injectable } from '@angular/core';
import { DestinosRemoteDataSourceService, ViajeRemoto } from './destinos-remote-data-source.service';

@Injectable({
  providedIn: 'root'
})
export class DestinosService {

  constructor(
    private destinosRemoteDataSource:DestinosRemoteDataSourceService
  ) { }

  async getAutosuggest():Promise<string[]> {
    const res = await this.destinosRemoteDataSource.getAutosuggest()
    return res.viajes.map(v => v.strCategory)
  }


}
