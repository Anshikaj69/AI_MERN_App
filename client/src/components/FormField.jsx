import React from 'react'

const FormField = ({ labelName, type, name, placeholder, value, handleChange,
  isSurpriseMe, handleSurpriseMe }) => {

  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label
          htmlFor={name}
          className='block text-l font-medium text-white'
          >
            {labelName}
        </label>

        {isSurpriseMe &&(
          <button 
          type="button"
          onClick={handleSurpriseMe}
          className='font-semibold text-sm bg-[#a3a3a8] py-1 px-2 rounded-[5px] text-gray-900'>
            Surprise me
          </button>
        )}
      </div>

      <input 
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
      className='bg-[#2d2139df] border  border-gray-300 text-white text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full sm:w-[60%] p-3'
      />
    </div>
  )
}

export default FormField