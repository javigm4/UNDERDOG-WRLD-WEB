import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../../services/youtube.service';
import { CommonModule } from '@angular/common';
import { VideoComponent } from '../video/video.component';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-lista-videos',
  standalone: false,
  templateUrl: './lista-videos.component.html',
  styleUrls: ['./lista-videos.component.css'],
})
export class ListaVideosComponent implements OnInit {
  videoDestacado: any = null;
  videos: any[] = [];
  mostrarTodos = false;
  animacionColapsando = false;


  constructor(private youtubeService: YoutubeService) {}

  ngOnInit(): void {
      console.log('ListaVideosComponent ngOnInit');
    this.youtubeService.getVideos().subscribe((response) => {
      const videosFiltrados = response.items.filter((video: any) =>
        video.snippet.title.includes('UNDERDOG WRLD')
      );

      this.videoDestacado = videosFiltrados[0];
      this.videos = videosFiltrados.slice(1);
    });
  }

  toggleTodos(): void {
    this.mostrarTodos = !this.mostrarTodos;
  }

  mostrarHolaMundo(): void {
    console.log('holamundo');
  }
}
