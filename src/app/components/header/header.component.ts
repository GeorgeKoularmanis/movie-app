import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(){ }

  ngOnInit() {
    this.initMyLists();
   }

  private initMyLists = () => {
    /*refresh-clear user lists*/
    localStorage.setItem('movieAppData', JSON.stringify({lists: []}));
  }

}
