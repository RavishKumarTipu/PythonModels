using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using coreAPIs.helpers;
using coreAPIs.Services;

namespace coreAPIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        /* List<user> _availableusers = new List<user> {
            new user() {username = "ravish", password="ravish", token="123456", tokenexpired=false, role="admin"},
             new user() {username = "mohan", password="mohan", token="234567", tokenexpired=false, role="user"},
              new user() {username = "jyotsna", password="jyotsna", token="345678", tokenexpired=false, role="admin"},
        } ;*/
        private readonly UserService _userService;

        public LoginController(UserService userService)
        {
                _userService = userService;
        }
        
        [HttpPost("addAction")]
        public IActionResult AddAction([FromBody] roleactions newAction)
        {
            var _action = _userService.AddAction(newAction);
            if (_action == null)
            {
                return BadRequest(new {message = "there is a problem with data in actions"});
            }
            else 
            {
                return (Ok(_action));
            }
        }

        [HttpPost("updateAction")]
        public IActionResult updateAction([FromBody] roleactions newAction)
        {
            var _action = _userService.UpdateAction(newAction);
            if (_action == null)
            {
                return BadRequest(new {message = "there is a problem with data in actions"});
            }
            else 
            {
                return (Ok(_action));
            }
        }   

        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] credentials usercredentials)
        {
            System.Console.WriteLine("*** Ravish says :: username  " + usercredentials.username + " :: password " + usercredentials.password);
           // var _user = _availableusers.Find(a => ((a.username == usercredentials.username) && (a.password == usercredentials.password))); 
            var _user = _userService.Validate(usercredentials.username, usercredentials.password);
            if (_user == null)
            return BadRequest(new {message = "there is an issue with username or password"});
            else 
            return(Ok(_user));
        }

        [HttpGet("getUserFromToken")]
        public IActionResult GetUserFromToken([FromQuery]string token="")
        {
            System.Console.WriteLine("*** Ravish says :: token =>  " + token); 
            //var _user = _availableusers.Find(a => (a.token == token)); 
            var _user = _userService.GetUserFromToken(token);
            if (_user == null)
            return BadRequest(new {message = "Invalid token"});
            else 
            return(Ok(_user));
        }

        [HttpGet("getActionsForRole")]
        public IActionResult GetActionsForRole([FromQuery]string role="")
        {
            System.Console.WriteLine("*** Ravish says :: role =>  " + role); 
            List<roleactions> actions = _userService.GetActionJSONForRole(role);
            if (actions == null)
            return BadRequest(new {message = "something wrong happened..."});
            else 
            return(Ok(actions));
        }

        [HttpGet("getActions")]
        public IActionResult GetActions()
        {
            System.Console.WriteLine("*** Ravish says :: inside getActions" ); 
            List<roleactions> actions = _userService.GetActions();
            if (actions == null)
            return BadRequest(new {message = "something wrong happened..."});
            else 
            return(Ok(actions));
        }
    }
}
