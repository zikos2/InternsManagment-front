import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addDocumentDTO } from 'src/app/dto/addDocument.dto';
import { Etudiant } from 'src/app/entities/Etudiant';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  constructor(private httpService: HttpService) {}

  me(): Observable<Etudiant> {
    return this.httpService.doGet(`http://localhost:8081/etudiant/me`);
  }

  addDocument(document: addDocumentDTO): Observable<Etudiant> {
    return this.httpService.doPost(
      'http://localhost:8081/etudiant/importDocument',
      document
    );
  }

  getCollegues(): Observable<Etudiant> {
    return this.httpService.doGet('http://localhost:8081/etudiant/collegues');
  }
}
