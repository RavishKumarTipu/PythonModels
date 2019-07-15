using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using coreAPIs.helpers;
using System.Collections.Generic;

namespace coreAPIs.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id {get; set;}
        
        [BsonElement("username")]
        public string username { get; set;}

        [BsonElement("password")]
        public string password {get; set;}

        [BsonElement("token")]
        public string token {get; set;}
        
        [BsonElement("tokenexpired")]
        public string tokenexpired {get; set;}
        
        [BsonElement("role")]
        public string role {get; set;}
        
        public List<roleactions> actions {get; set;}
    }
}