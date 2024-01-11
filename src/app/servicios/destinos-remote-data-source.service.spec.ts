import { TestBed } from '@angular/core/testing';

import { DestinosRemoteDataSourceService } from './destinos-remote-data-source.service';

describe('DestinosRemoteDataSourceService', () => {
  let service: DestinosRemoteDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinosRemoteDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
