import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  standalone: false,
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnChanges {
  @Input() video: any;
  sanitizedUrl!: SafeResourceUrl;
  sanitizedTitle!: string;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    if (this.video) {
      const videoId = this.video.id.videoId || this.video.id; // Fallback
      const url = `https://www.youtube.com/embed/${videoId}`;
      this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

      const decodedTitle = this.decodeHtml(this.video.snippet.title);
      this.sanitizedTitle = this.insertLineBreaks(decodedTitle);
    }
  }

  private decodeHtml(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  private insertLineBreaks(title: string): string {
    // Inserta un <br> antes de cualquier número de 3 cifras (como 001, 123...)
    return title.replace(/(\s|^)(\d{3})(?=\s|$)/g, '<br>$2');
  }
}
