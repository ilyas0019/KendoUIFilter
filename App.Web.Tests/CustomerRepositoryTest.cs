using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using App.Infrastructure;
using System.Data.Entity;
using App.Core.Repositories;
using App.Infrastructure.Repositories;
using System.Linq;

namespace App.Web.Tests
{
    /// <summary>
    /// Summary description for CustomerRepositoryTest
    /// </summary>
    [TestClass]
    public class CustomerRepositoryTest
    {
        ICustomerRepository rep;

        public CustomerRepositoryTest()
        {

        }

        private TestContext testContextInstance;

        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext
        {
            get
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }

        [ClassInitialize]
        public static void MyClassInitialize(TestContext testContext)
        {
            CustomerInitializeDB db = new CustomerInitializeDB();
            Database.SetInitializer(db);

        }

        [TestInitialize()]
        public void MyTestInitialize() { rep = new CustomerRepository(); }

        #region Additional test attributes
        //
        // You can use the following additional attributes as you write your tests:
        //
        // Use ClassInitialize to run code before running the first test in the class
        // [ClassInitialize()]
        // public static void MyClassInitialize(TestContext testContext) { }
        //
        // Use ClassCleanup to run code after all tests in a class have run
        // [ClassCleanup()]
        // public static void MyClassCleanup() { }
        //
        // Use TestInitialize to run code before running each test 
        // [TestInitialize()]
        // public void MyTestInitialize() { }
        //
        // Use TestCleanup to run code after each test has run
        // [TestCleanup()]
        // public void MyTestCleanup() { }
        //
        #endregion

        [TestMethod]
        public void IsRepositoryInitalizeWithValidNumberOfData()
        {
            var result = rep.GetCustomers();
            Assert.IsNotNull(result);
            var numberOfRecords = result.ToList().Count;
            Assert.AreEqual(2, numberOfRecords);
        }

    }
}
