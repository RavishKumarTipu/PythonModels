

namespace coreAPIs.Models
{

    public class MancerDBSettings : IMancerDBSettings
    {
        public string UsersCollectionName {get; set;}
        public string ConnectionString {get; set;}
        public string DatabaseName {get; set;}
    }

    public interface IMancerDBSettings
    {
        string UsersCollectionName {get; set;}
        string ConnectionString {get; set;}
        string DatabaseName {get; set;}
    }
}