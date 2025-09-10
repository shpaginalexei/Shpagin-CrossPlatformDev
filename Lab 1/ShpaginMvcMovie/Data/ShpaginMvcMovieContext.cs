using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShpaginMvcMovie.Models;

namespace ShpaginMvcMovie.Data
{
    public class ShpaginMvcMovieContext : DbContext
    {
        public ShpaginMvcMovieContext(DbContextOptions<ShpaginMvcMovieContext> options)
            : base(options)
        {
        }

        public DbSet<ShpaginMvcMovie.Models.Movie> Movie { get; set; } = default!;
    }
}
