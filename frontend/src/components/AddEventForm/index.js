import React from 'react'

const AddEventForm = (props) => (
  <form>
    <div className='form-control'>
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        id='title'
        value={props.title}
        onChange={props.onChange('title')}
      />
    </div>
    <div className='form-control'>
      <label htmlFor='price'>Price</label>
      <input
        type='text'
        id='price'
        value={props.price}
        onChange={props.onChange('price')}
      />
    </div>
    <div className='form-control'>
      <label htmlFor='date'>Date</label>
      <input
        type='text'
        id='date'
        value={props.date}
        onChange={props.onChange('date')}
      />
    </div>
    <div className='form-control'>
      <label htmlFor='description'>Description</label>
      <textarea
        id='description'
        rows='4'
        value={props.description}
        onChange={props.onChange('description')}
      />
    </div>
  </form>
)

export default AddEventForm
