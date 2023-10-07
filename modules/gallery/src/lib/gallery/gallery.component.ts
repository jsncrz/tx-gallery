import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGridComponent } from '../image-grid/image-grid.component';

@Component({
  selector: 'lib-gallery',
  standalone: true,
  imports: [CommonModule, ImageGridComponent],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {}
