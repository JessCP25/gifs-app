import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit{

  @Input()
  url !: string;

  hasLoaded: boolean = false;

  @Input()
  alt !: string;

  ngOnInit(): void {
    if(!this.url) throw new Error('URL property is required.')
  }

  onLoaded(){
    this.hasLoaded = true;
  }
}
