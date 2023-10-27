import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
  styleUrls: ['./gifs-card.component.css']
})
export class GifsCardComponent implements OnInit{


  @Input()
  gif !: Gif;

  ngOnInit(): void {
    if(!this.gif) throw new Error('GIF is require')
  }
}
