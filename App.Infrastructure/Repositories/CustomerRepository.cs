using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using App.Core.Repositories;
using App.Core.Entities;
using System.Data.Entity;
namespace App.Infrastructure.Repositories
{
   public class CustomerRepository:ICustomerRepository
    {
       CustomerContext context = new CustomerContext();
       
       public void AddCustomer(Customer customer)
        {
            context.Customers.Add(customer);
            context.SaveChanges();
        }

        public void DeleteCustomer(int id)
        {
           Customer customer= context.Customers.Find(id);
           context.Customers.Remove(customer);
           context.SaveChanges();

        }

        public Customer GetCustomer(int id)
        {
            return context.Customers.Find(id); 
        }

        public IEnumerable<Customer> GetCustomers()
        {
            return context.Customers.ToList();
        }

        public void UpdateCustomer(Customer customer)
        {
            context.Entry(customer).State = EntityState.Modified;
        }
    }
}
