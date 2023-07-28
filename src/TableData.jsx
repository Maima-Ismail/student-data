const TableData = ({ image, name, gender, placeDOB, groups }) => {
  const renderGroups = (groups) => {
    if (!Array.isArray(groups)) {
      return ''
    }

    if (groups.length > 2) {
      const remainingGroupsCount = groups.length - 2
      const firstTwoGroups = groups.slice(0, 2).join(', ')
      if (remainingGroupsCount === 1) {
        return `${firstTwoGroups} & ${remainingGroupsCount} other`
      } else {
        return `${firstTwoGroups} & ${remainingGroupsCount} others`
      }
    } else {
      return groups.join(', ')
    }
  }

  return (
    <tr>
      <td>
        <div className="image-container">
          <img className="image" src={image} alt="null" />
        </div>
      </td>
      <td>{name}</td>
      <td>{gender}</td>
      <td>{placeDOB}</td>
      <td className="grp">{renderGroups(groups)}</td>
    </tr>
  )
}

export default TableData
