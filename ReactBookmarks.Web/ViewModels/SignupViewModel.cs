using ReactBookmarks.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactBookmarks.Web.ViewModels
{
    public class SignupViewModel : User
    {
        public string Password { get; set; }
    }
}
