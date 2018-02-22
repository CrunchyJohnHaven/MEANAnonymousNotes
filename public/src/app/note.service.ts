import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
//build the NoteService class
export class NoteService { 

  notes;
  constructor( private _http: Http ) { }

  //from app.component.html
  retrieveNotes(callback) { 
    console.log('************ method - retrieveNotes(' + callback + ')************' );
    this._http.get('/notes').subscribe(
      (response) => {
        this.notes = response.json();
        console.log('******* response.json(): ' + this.notes + '*********');
        callback(this.notes);
      },
      (err) => {
        console.log('***** error: ' + err + '*******');
      }
    ); 
  } //end of retrieveNotes() method 
  //addNote method
  addNote(note, callback) {
    console.log('******** method - addNote( note: ' + note + ', callback: ' + callback + ' **********');
    let body = JSON.stringify(note);
    let headers = new Headers( { 'Content-Type': 'application/json' } ) ;
    let options = new RequestOptions( { headers: headers } ); 
    this._http.post('/notes', body, options ).subscribe( ( response ) => {
      callback( this.notes );
      },
          (err) => {
            console.log( 'http POST error : ', err);
        }
    );
  }
}
