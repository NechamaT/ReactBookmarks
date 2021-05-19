using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactBookmarks.Data
{
    public class UserBookmarksRepository
    {
        private readonly string _connectionString;
        public UserBookmarksRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<TopBookmark> GetTopBookmarks()
        {
            using var ctx = new BookmarkContext(_connectionString);
            return ctx.Bookmarks.GroupBy(b => b.URL)
                .OrderByDescending(g => g.Count()).Take(5)
                .Select(g => new TopBookmark { URL = g.Key, Count = g.Count() }).ToList();

        }

        public void AddBookmark(Bookmark bookmark)
        {
            using var ctx = new BookmarkContext(_connectionString);
            ctx.Bookmarks.Add(bookmark);
            ctx.SaveChanges();
        }

        public void DeleteBookmark(int id)
        {
            using var ctx = new BookmarkContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"DELETE FROM Bookmarks WHERE Id ={id}");
            ctx.SaveChanges();
        }

        public void UpdateBookmark(Bookmark bookmark)
        {
            using var ctx = new BookmarkContext(_connectionString);
            ctx.Bookmarks.Attach(bookmark);
            ctx.Entry(bookmark).State = EntityState.Modified;
            ctx.SaveChanges();
        }

        public List<Bookmark> GetUsersBookmarks(int id)
        {
            using var ctx = new BookmarkContext(_connectionString);
            return ctx.Bookmarks.Where(b => b.UserId == id).ToList();
        }
        public void AddUser(User user, string password)
        {
            string hash = BCrypt.Net.BCrypt.HashPassword(password);
            using var ctx = new BookmarkContext(_connectionString);
            user.PasswordHash = hash;
            ctx.Users.Add(user);
            ctx.SaveChanges();
        }

        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if (user == null)
            {
                return null;
            }

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (isValidPassword)
            {
                return user; //success!!
            }

            return null;
        }

        public User GetByEmail(string email)
        {
            using var ctx = new BookmarkContext(_connectionString);
            return ctx.Users.FirstOrDefault(u => u.Email == email);
        }

    }
}
