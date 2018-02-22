// touch package.json 
// {
//     "name": "basic_mongoose_app",
//     "version": "1.0.0",
//     "description": "",
//     "main": "index.js",
//     "scripts": {
//       "test": "echo \"Error: no test specified\" && exit 1"
//     },
//     "keywords": [],
//     "author": "",
//     "license": "ISC",
//     "dependencies": {
//       "body-parser": "^1.18.0",
//       "ejs": "^2.5.7",
//       "express": "^4.15.4",
//       "mongoose": "^4.13.11"
//     }
//   }
//   npm install 
//   ng new public
//   cd public 

//   install latest angular CLI {
//     npm uninstall -g angular-cli @angular/cli
//     npm cache clean
//     npm install -g @angular/cli@latest
//   }
//   ng build
//   cd src 
//   cd app 

//   ng g c add-note
//   ng g c notes
//   ng g s note

//   - add-note
//     - add-note.component.css
//         - .addnote 
//         - input[type=text]
//     - add-note.component.html 
//     - add-note.component.ts 2b)

//   - notes
//     - notes.component.css
//     - notes.component.html
//         - 
//         - 
//     - notes.component.ts 

//   - app.component.css 
//   - app.component.html  
        // METHODS
            // - noteAdded() 1a) (5a
                    // PARAMETERS
                        // - newNoteEmitter
//             - notes 1b) 6b) 
//   0 app.components.ts 4b)
//   - app.module.ts 

//   - note.service.ts  3b) 5b
//         - CLASS 'NoteService'
//             - METHODS
//                 - retrieveNotes(callback) 2a)
//                     - 
//                 - addNote(note, callback) 
//                     - note -_JSON text
//                     - callback - this.notes  
                
console.log( ' ************* server.js *************');
var mongoose = require( 'mongoose' )
var path = require( 'path' );
var express = require( 'express' );
var app = express();
var bodyparser = require( 'body-parser' );

app.use( bodyparser.urlencoded( {extended: true } ) );
app.use( bodyparser.json() ); 
app.use( express.static(__dirname + '/public/dist'));

mongoose.connect( 'mongodb://localhost/MEAN_AnonymousNotes' )

var NoteSchema = new mongoose.Schema( { 
    text: {type: String, required: true, minlength: 3, maxlength: 256},
}, {timestamps: true} );
let Note = mongoose.model('Note', NoteSchema);

app.get('/notes', function(req,res){
    console.log('************ GET notes route *************');
    Note.find({}).sort('-createdAt').exec(function(err,notes){
        if(!err){
            return res.json(notes);
        }
    });
}),
app.post('/notes', function(res,req){
    console.log('*************** POST notes route ***********');
    var note = new Note({text: req.body.text});
    note.save(function(err){
        if(!err) {
            return res.json(note);
        }    
    });
});
app.listen(8000, function(){
    console.log('Anonymous listening on port 8000');
});
