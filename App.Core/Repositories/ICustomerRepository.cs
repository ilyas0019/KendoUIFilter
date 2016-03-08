using App.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Repositories
{
   public interface ICustomerRepository
    {
        IEnumerable<Customer> GetCustomers();
        Customer GetCustomer(int id);
        void AddCustomer(Customer customer);
        void DeleteCustomer(int id);
        void UpdateCustomer(Customer customer);
    }
}
