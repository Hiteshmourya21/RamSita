import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    teamLead: {
        name: {type : String,required : true},
        email:  {type : String,required : true , unique : true},
        password: String, 
        attendance : { type: Boolean, default: false },
      },
      members: [
        {
          name: {type : String,required : true},
          email: {type : String,required : true , unique : true},
          attendance: { type: Boolean, default: false }, 
        },
      ],
      paper: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper' }, 
      track: { type: mongoose.Schema.Types.ObjectId, ref: 'Track' },
      position : {type : String, required : true},
      address : {
        country : String,
        state : String,
        city : String,
      },
      affilation : String,
      contact : String,
      yourRole : String,

},{timestamps: true});

const Author = mongoose.model('Author', authorSchema);

export default Author;