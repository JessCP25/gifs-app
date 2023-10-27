import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gif.interface';

@Injectable({providedIn: 'root'})
export class GifsService {
  constructor( private http: HttpClient) {
    this.loadLocalStorage();
  }

  public gifList: Gif[] = [];

  private apiKey: string = 'bivg03UGr1NwdV9HwwHErLE8gjX6OvSs';
  private urlGifs: string = 'https://api.giphy.com/v1/gifs';

  private _tagsHistory: string[] = [];

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizedHistory (tag: string):void {
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(tags => tags !== tag);
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history',JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0) return;

    this.searchTag(this._tagsHistory[0]);
  }

  searchTag( tag: string):void{

    if(tag.length === 0 ) return;

    this.organizedHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.urlGifs}/search`, {params})
      .subscribe(result=>{
        this.gifList = result.data;
      });
  }

}
