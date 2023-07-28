import { useState } from 'react'

const StudentForm = ({ onSubmit }) => {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [placeDOB, setPlaceDOB] = useState('')
  const [groups, setGroups] = useState('')

  const handleFormSubmit = (event) => {
    event.preventDefault()
    onSubmit({ name, gender, placeDOB, groups })
    // const formData = {
    //   name,
    //   gender,
    //   placeDOB,
    //   groups,
    // }

    setName('')
    setGender('')
    setPlaceDOB('')
    setGroups('')
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h5>STUDENT FORM</h5>
      <div>
        <label>NAME</label>
      </div>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
      </div>
      <div>
        <label>GENDER</label>
      </div>
      <div>
        <input
          type="radio"
          value="Male"
          onChange={(e) => setGender(e.target.value)}
        />
        <label>MALE</label>
      </div>
      <div>
        <input
          type="radio"
          value="Female"
          onChange={(e) => setGender(e.target.value)}
        />
        <label>FEMALE</label>
      </div>
      <div>
        <label>PLACE & DATE OF BIRTH</label>
      </div>
      <div>
        <input
          type="text"
          value={placeDOB}
          onChange={(e) => setPlaceDOB(e.target.value)}
          placeholder="For Example: Lahore, 2000.01.29"
          required
        />
      </div>
      <div>
        <label>GROUPS</label>
      </div>
      <div>
        <input
          type="text"
          value={groups}
          onChange={(e) => setGroups(e.target.value)}
          placeholder="Separate Groups using Commas"
          required
        />
      </div>
      <button type="submit">SUBMIT</button>
    </form>
  )
}

export default StudentForm
