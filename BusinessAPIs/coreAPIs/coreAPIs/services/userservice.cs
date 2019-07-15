using coreAPIs.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System.Linq;
using coreAPIs.helpers;
using Newtonsoft.Json;

namespace coreAPIs.Services
{
    public class UserService {
        private readonly IMongoCollection <User> _users;
        private readonly IMongoCollection <roleactions> _actions;

        public UserService(IMancerDBSettings settings)
        {
                var client = new MongoClient(settings.ConnectionString);
                var database = client.GetDatabase(settings.DatabaseName);

                _users = database.GetCollection<User>(settings.UsersCollectionName);
                _actions = database.GetCollection<roleactions>("roleactions"); 
                
                System.Console.WriteLine("XXXXX XXXX Ravish inside user service constructor XXXXX XXXX");
                _users.Find(u => true).ToList().ForEach(v => {System.Console.WriteLine(v.username);});
        }

        
        public User Validate(string username, string password) {
             User user = _users.Find(u => true).ToList().Find(u => ((u.username == username) && (u.password == password)));
             if (user != null)
                    user.actions = GetActionJSONForRole(user.role);
                
            return user;   
        }
        public User GetUserFromToken(string token) {
            var user = _users.Find(u => (u.token == token)).FirstOrDefault();
            if (user != null)
                    user.actions = GetActionJSONForRole(user.role);
                
            return user;
        }
        public List<roleactions> GetActionJSONForRole(string role)
        {
                System.Console.WriteLine("XXXXX XXXX Ravish inside user service GetActionJSONForRole XXXXX XXXX");
                var results = _actions.Find(a => a.role == role).ToList<roleactions>();
               // results.ForEach(a => {System.Console.WriteLine(a._id);});
                //results.ForEach(a => {a.childactions = _actions.Find(b => ((b.role == role) && (b.parent == a.action )) ).ToList<roleactions>();});
                var final_results = RecurseAndFindChildren(results.FindAll(a => a.parent==0), results);
                return (final_results);
        }

        public List<roleactions> GetActions()
        {
                System.Console.WriteLine("XXXXX XXXX Ravish inside user service Get All Actions XXXXX XXXX");
                var results = _actions.Find(a => true).ToList<roleactions>();
                 return (results);
        }

        public List<roleactions> RecurseAndFindChildren(List<roleactions> rootElements, List<roleactions> allElements)
        {
            for(int i=0; i < rootElements.Count(); i++)
            {
                RecurseForRootElement(rootElements[i], allElements);
            }
            return rootElements;
        }

        public void RecurseForRootElement(roleactions element , List<roleactions> allElements)
        {
            var childElements = allElements.FindAll(a => a.parent == element.action);
            if (childElements != null)
            {
                element.childactions = childElements;
                for( int j=0; j < element.childactions.Count(); j++)
                    RecurseForRootElement(element.childactions[j], allElements);
            }
        }

        public void UpdateActionsFromJSON(List<roleactions> actions )
        {
            
        }

        public roleactions AddAction(roleactions role)
        {
            System.Console.WriteLine("### Ravish in AddAction function");
            System.Console.WriteLine(role);
            
            _actions.InsertOne(role);
            return role;
        }

         public roleactions UpdateAction(roleactions role)
        {
            System.Console.WriteLine("### Ravish in UpdateAction function");
            System.Console.WriteLine(role);
            
            _actions.ReplaceOne(r => r._id == role._id, role);
            return role;
        }


        
        
    }
}