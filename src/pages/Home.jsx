import React from 'react'

const Home = () => {
  return (
    <div>
      <ul>
        <li>TODO</li>
        <li>
          <input type="checkbox" name="firms" id="firms" checked/>
          <label htmlFor="firms">Firms</label>
        </li>
        <li>
          <input type="checkbox" name="brands" id="brands" checked/>
          <label htmlFor="brands">Brands</label>
        </li>
        <li>
          <input type="checkbox" name="products" id="purchases"checked />
          <label htmlFor="purchases">Products </label>
        </li>
        <li>
          <input type="checkbox" name="sales" id="Sales" checked/>
          <label htmlFor="Sales">Sales</label>
        </li>
        <li>
          <input type="checkbox" name="purchases" id="Products" checked/>
          <label htmlFor="Products">Purchases</label>
        </li>
        <li>
          <input type="checkbox" name="dashboard" id="Dashboard" checked/>
          <label htmlFor="Dashboard">Dashboard</label>
        </li>
      </ul>
    </div>
  )
}

export default Home