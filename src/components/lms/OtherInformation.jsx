import React from 'react'

const OtherInformation = ({formData,handleChange}) => {
  return (
      <section className="bg-red-50 p-6 rounded-lg shadow-sm">
          <h2 className="lg:text-xl font-semibold text-red-700 mb-4">
            Other Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:text-base text-xs">
            <label className="flex gap-3 items-center text-gray-800">
              <input
                type="checkbox"
                name="disqualified"
                checked={formData.disqualified}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-red-600 rounded"
              />
              Ever Disqualified?
            </label>
            {formData.disqualified && (
              <input
                name="disqualificationDetails"
                placeholder="Give details of disqualification"
                value={formData.disqualificationDetails}
                onChange={handleChange}
                className="input col-span-1 md:col-span-2 p-2 text-sm"
              />
            )}
            <label className="flex gap-3 items-center text-gray-800">
              <input
                type="checkbox"
                name="isSportPerson"
                checked={formData.isSportPerson}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-green-600 rounded"
              />
              Sport Person (State/National Level)
            </label>
            {formData.isSportPerson && (
              <input
                name="sportDetails"
                placeholder="Sport details (e.g., Football, State Level, Year)"
                value={formData.sportDetails}
                onChange={handleChange}
                className="input col-span-1 md:col-span-2 p-2 text-sm"
              />
            )}
          </div>
        </section>
  )
}

export default OtherInformation