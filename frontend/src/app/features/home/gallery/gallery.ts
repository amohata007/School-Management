import { Component } from '@angular/core';
import { Api } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, RouterLink],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
constructor(private _api: Api){}

  galleries: any[] = [];

  ngOnInit(): void {
    this.getGallery();
  }

  getGallery(){
    this._api.getGallery().subscribe((res:any)=>{
      if (res && res.status === "Y" && res.data.length > 0) {
          this.galleries = res.data;
          console.log(this.galleries);
        }
    })
  }
}
