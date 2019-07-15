using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
 

namespace coreAPIs.helpers
{
    public class roleactions
    {   [BsonRepresentation(BsonType.ObjectId)]
        public string _id {get; set;}
        public string role {get; set;}
        public int action {get; set;}
        public string description {get; set;}
        public int parent { get; set;}
        public string link {get; set;}
        public string menuitem {get; set;}
        public List<roleactions> childactions {get; set;}

        public roleactions(string id, string role, int action, string description, int parent, string link, string menuitem)
        //public roleactions(string role, int action, string description, int parent, string link)
        
        {
            this._id = id;
            this.role = role;
            this.action = action;
            this.description = description;
            this.parent = parent;
            this.link = link;
            this.menuitem = menuitem;
            this.childactions = new List<roleactions>();
        }
    }
    public class user
    {
        public string username {get; set;}
        public string password {get; set;}

        public string token {get; set;}

        public bool tokenexpired {get; set;}

        public string role {get; set;}
 
        public List<roleactions> actions {get; set;}

        public user(string username, string password, string token, bool tokenexpired, string role) {
            this.username = username;
            this.password = password;
            this.token = token;
            this.tokenexpired = tokenexpired;
            this.role = role;
            this.actions = new List<roleactions>();
        }
        public user(){}

    }

    public class credentials {
        public string username {get; set;}
        public string password {get; set;}
        
        public credentials(string username, string password)
        {
            this.username = username;
            this.password = password;
        }
        public credentials()
        {}
    }
}