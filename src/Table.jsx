import React, { useEffect, useState } from 'react'
import TableData from './TableData'
import Filters from './Filters'
import StudentForm from './StudentForm'

const Table = () => {
  const [data, setData] = useState([])
  const [activeFilter, setActiveFilter] = useState(
    new Array(Filters.length).fill(false)
  )
  const [filteredData, setFilteredData] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem('filteredData')
        if (storedData) {
          setData(JSON.parse(storedData))
          setFilteredData(JSON.parse(storedData))
        } else {
          const response = await fetch('/studentsData.json')
          const jsonData = await response.json()
          setData(jsonData)
          setFilteredData(jsonData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const handleFilter = (position) => {
    const updatedActiveFilters = activeFilter.map((item, index) =>
      index === position ? !item : item
    )
    setActiveFilter(updatedActiveFilters)
    const updatedFilteredData = data.filter((student) =>
      updatedActiveFilters.some((filter, index) =>
        filter ? student.groups.includes(Filters[index].filterName) : false
      )
    )
    setFilteredData(updatedFilteredData.length > 0 ? updatedFilteredData : data)
  }

  useEffect(() => {
    localStorage.setItem('filteredData', JSON.stringify(filteredData))
  }, [filteredData])

  const handleAddRow = (rowData) => {
    const newRow = {
      id: filteredData.length + 1,
      ...rowData,
      groups: rowData.groups
        ? rowData.groups.split(',').map((group) => group.trim())
        : [],
    }
    setFilteredData([...filteredData, newRow])
  }

  useEffect(() => {
    const filteredData = data.filter((value) =>
      value.name.toLowerCase().startsWith(searchValue.toLowerCase())
    )
    setFilteredData(filteredData)
  }, [searchValue, data])

  return (
    <div>
      <div className="search-section">
        <h5 className="search heading">SEARCH FOR NAME</h5>
        <input
          className="search input"
          type="text"
          onChange={(event) => setSearchValue(event.target.value)}
          value={searchValue}
          placeholder="Enter"
        />
      </div>
      <ul className="filters-section">
        <h5 className="filterHeading"> FILTER FOR STUDY GROUPS</h5>
        {Filters.map(({ filterName }, index) => {
          return (
            <li key={index}>
              <div className="filters">
                <input
                  type="checkbox"
                  className="list-inputs"
                  id={`custom-checkbox-${index}`}
                  name={filterName}
                  value={filterName}
                  checked={activeFilter[index]}
                  onChange={() => handleFilter(index)}
                />
                <label htmlFor={`custom-checkbox-${index}`}>{filterName}</label>
              </div>
            </li>
          )
        })}
      </ul>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>NAME</th>
            <th>GENDER</th>
            <th>PLACE & DATE OF BIRTH</th>
            <th className="grp">GROUPS</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((student, index) => (
              <TableData key={index} {...student} />
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <StudentForm onSubmit={handleAddRow} />
    </div>
  )
}

export default Table
