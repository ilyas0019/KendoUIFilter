using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using App.Core.Entities;

namespace App.Infrastructure
{
    public class CustomerInitializeDB : DropCreateDatabaseIfModelChanges<CustomerContext>
    {
        protected override void Seed(CustomerContext context)
        {
            context.Customers.Add(
            new Customer
            {
                FirstName = "Filiberto",
                LastName = "Medina",
                Address = "ABC",
                City = "XX",
                State = "SS",
                Country = "Mexico"
            });

            context.Customers.Add(
            new Customer
            {

                FirstName = "John",
                LastName = "Krupa",
                Address = "XYZ",
                City = "Chicago",
                State = "NY",
                Country = "USA"
            }
            );
            context.Customers.Add(
           new Customer
           {
               FirstName = "Sanjay",
               LastName = "Sharma",
               Address = "ABC",
               City = "Delhi",
               State = "Delhi",
               Country = "India"
           }
           );
            context.Customers.Add(
           new Customer
           {
               FirstName = "Debbi",
               LastName = "Robbison",
               Address = "110, Northern Road",
               City = "Irvine",
               State = "CA",
               Country = "USA"
           }
           );
            context.Customers.Add(
           new Customer
           {
               FirstName = "Kumar",
               LastName = "Vasan",
               Address = "XYZ",
               City = "Colombo",
               State = "Colombo",
               Country = "Srilanka"
           }
           );

            base.Seed(context);
        }
    }
}
