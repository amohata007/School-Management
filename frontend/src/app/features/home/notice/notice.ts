import { Component, OnInit } from '@angular/core';
import { Api } from '../../../services/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notice',
  imports: [RouterLink],
  templateUrl: './notice.html',
  styleUrl: './notice.scss'
})
export class Notice implements OnInit {
  constructor(private _apiService: Api) { }

  public notice = "";

  ngOnInit(): void {
    this.getNotices();
  }

  getNotices() {
    this._apiService.getNotices().subscribe(
      (res: any) => {
        if (res && res.status === "Y" && res.data.length > 0) {
          // extract titles and join with comma
          this.notice = res.data.map((n: any) => n.title).join(', ');
          console.log(this.notice);
        } else {
          this.notice = "";
        }
      },
      (err) => {
        console.error("Error fetching notices:", err);
        this.notice = "";
      }
    );
  }
}
