import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {

  private url = 'http://localhost:8000/api/youtube/search'; // Cambia al dominio o IP de tu backend

  constructor(private http: HttpClient) {}

  // Método para obtener los últimos videos subidos al canal

  getVideos(): Observable<any> {
    const url = this.url;
    return this.http.get(url);
  }
}
