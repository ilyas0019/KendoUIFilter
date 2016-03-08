using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using App.Core.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Infrastructure
{
    public class CustomerContext : DbContext
    {
        public CustomerContext(): base("name=AppConnectionstring")
        {

        }

        public DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>().HasKey(e => e.ID);
            modelBuilder.Entity<Customer>().Property(e => e.ID).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            base.OnModelCreating(modelBuilder);
        }
       
    }
}
