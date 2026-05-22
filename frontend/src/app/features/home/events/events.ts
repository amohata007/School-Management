import { Component, OnInit } from '@angular/core';
import { Api } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  imports: [CommonModule, RouterLink],
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class Events implements OnInit {
  constructor(private _api: Api){}

  events: any[] = [];

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(){
    this._api.getEvents().subscribe((res:any)=>{
      if (res && res.status === "Y" && res.data.length > 0) {
          this.events = res.data;
          console.log(this.events);
        }
    })
  }
}
