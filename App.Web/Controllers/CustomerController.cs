using App.Core.Entities;
using App.Core.Repositories;
using App.Infrastructure;
using App.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace App.Web.Controllers
{
    public class CustomerController : ApiController
    {
        ICustomerRepository repository;
        public CustomerController()
        {
            repository = new CustomerRepository();
        }

        [HttpGet]
        public HttpResponseMessage GetCustomers()
        {
            var customers = repository.GetCustomers();

            if(customers==null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse<IEnumerable<Customer>>(HttpStatusCode.OK, customers);
          
        }
        [HttpGet]
        public HttpResponseMessage GetCustomer(int id)
        {
            var customer = repository.GetCustomer(id);
            if (customer == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse<Customer>(HttpStatusCode.OK, customer);
        }

        [HttpPost]
        public void AddCustomer(Customer customer)
        {
            repository.AddCustomer(customer);
        }
        [HttpDelete]
        public void DeleteCustomer(int id)
        {
            repository.DeleteCustomer(id);
        }

        [HttpPut]
        public void UpdateCustomer(Customer customer)
        {
            repository.UpdateCustomer(customer);
        }
    }

    //public class CustomersController : ApiController
    //{
    //    ICustomerRepository _Repository;

    //    public CustomersController()
    //    {
    //        //CustomerRepository could be injected if desired
    //        _Repository = new CustomerRepository();
    //    }

    //    // GET api/customers
    //    public HttpResponseMessage Get()
    //    {
    //        var custs = _Repository.GetCustomers();
    //        if (custs == null) throw new HttpResponseException(HttpStatusCode.NotFound);
    //        return Request.CreateResponse<IEnumerable<Customer>>(HttpStatusCode.OK, custs);
    //    }

    //    // GET api/customers/5
    //    public HttpResponseMessage Get(int id)
    //    {
    //        var cust = _Repository.GetCustomer(id);
    //        if (cust == null) throw new HttpResponseException(HttpStatusCode.NotFound);
    //        return Request.CreateResponse<Customer>(HttpStatusCode.OK, cust);
    //    }

    //    // POST api/customers
    //    public HttpResponseMessage Post([FromBody]Customer cust)
    //    {
    //        var newCust = _Repository.InsertCustomer(cust);
    //        if (newCust != null)
    //        {
    //            var msg = new HttpResponseMessage(HttpStatusCode.Created);
    //            msg.Headers.Location = new Uri(Request.RequestUri + newCust.ID.ToString());
    //            return msg;
    //        }
    //        throw new HttpResponseException(HttpStatusCode.Conflict);
    //    }

    //    // PUT api/customers/5
    //    public HttpResponseMessage Put(int id, [FromBody]Customer cust)
    //    {
    //        var status = _Repository.UpdateCustomer(cust);
    //        if (status) return new HttpResponseMessage(HttpStatusCode.OK);
    //        throw new HttpResponseException(HttpStatusCode.NotFound);
    //    }

    //    // DELETE api/customers/5
    //    public HttpResponseMessage Delete(int id)
    //    {
    //        var status = _Repository.DeleteCustomer(id);
    //        if (status) return new HttpResponseMessage(HttpStatusCode.OK);
    //        throw new HttpResponseException(HttpStatusCode.NotFound);
    //    }

    //    [HttpGet]
    //    public List<Order> Orders(int custID)
    //    {
    //        var orders = _Repository.GetOrders(custID);
    //        if (orders == null)

    //            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
    //        return orders;
    //    }
    //}
}
