using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactBookmarks.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactBookmarks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarksController : ControllerBase
    {
        private readonly string _connectionString;
        public BookmarksController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("gettopbookmarks")]
        public List<TopBookmark> GetTopBookmarks()
        {
            var repo = new UserBookmarksRepository(_connectionString);
            return repo.GetTopBookmarks();
        }
        [HttpPost]
        [Route("add")]
        public void Add(Bookmark bookmark)
        {
            var repo = new UserBookmarksRepository(_connectionString);
            bookmark.UserId = repo.GetByEmail(User.Identity.Name).Id;
            repo.AddBookmark(bookmark);
        }
        [HttpPost]
        [Route("update")]
        public void Update(Bookmark bookmark)
        {
            var repo = new UserBookmarksRepository(_connectionString);
            repo.UpdateBookmark(bookmark);
        }
        [HttpPost]
        [Route("delete")]
        public void Delete(int id)
        {
            var repo = new UserBookmarksRepository(_connectionString);
            repo.DeleteBookmark(id);
        }
        [HttpGet]
        [Route("getusersbookmarks")]
        public List<Bookmark> GetUsersBookmarks()
        {
            var repo = new UserBookmarksRepository(_connectionString);
            var id = repo.GetByEmail(User.Identity.Name).Id;
            return repo.GetUsersBookmarks(id);
        }
    }
}
