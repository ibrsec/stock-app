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
          <input type="checkbox" name="firms" id="brands" checked/>
          <label htmlFor="brands">Brands</label>
        </li>
        <li>
          <input type="checkbox" name="firms" id="purchases" />
          <label htmlFor="purchases">Purchases</label>
        </li>
        <li>
          <input type="checkbox" name="firms" id="Sales" />
          <label htmlFor="Sales">Sales</label>
        </li>
        <li>
          <input type="checkbox" name="firms" id="Products" />
          <label htmlFor="Products">Products</label>
        </li>
        <li>
          <input type="checkbox" name="firms" id="Dashboard" />
          <label htmlFor="Dashboard">Dashboard</label>
        </li>
      </ul>
    </div>
  )
}

export default Home