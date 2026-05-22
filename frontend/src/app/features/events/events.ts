import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  imports: [],
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class Events {
  ngOnInit(){
    window.scrollTo(0,0)
  }
}
