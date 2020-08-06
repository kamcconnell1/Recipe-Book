import React from 'react'
import Select from 'react-select'
import ImageUpload from '../common/ImageUpload'
import { uploadClothesImage } from '../../lib/api'


const RecipeEditForm = ({formData, handleChange, handleMethodChange, handleMultiChange, handleSubmit, buttonText}) => {
  
  const { method } = formData
  
  const options = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' }
  ]
  
  return (
    <div className="column is-6 is-offset-3">
            <form onSubmit={handleSubmit} >
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input is-success"
                    type="text"
                    name="name"
                    placeholder="Recipe name" 
                    onChange={handleChange}
                    value={formData.name || ''}
                    />
                </div>
              </div>
              <div className="field">
                <label className="label">Meal</label>
                <div className="control ">
                <Select
                options={options}
                placeholder='Please select meal type'
                name='meal'
                isMulti
                onChange={handleMultiChange}
                />
                </div>
              </div>
              <div className="field">
                <label className="label">Image</label>
                <div className="control">
                  <input
                    className="input is-success"
                    type="text"
                    placeholder="Add image url here" 
                    name="image"
                    onChange={handleChange}
                    value={formData.image}
                    />
                    </div>
                    </div>
                    <div className='field'>
                    <label className="label">Or upload file here</label>
                    <div className="control">
                    <ImageUpload 
                      onChange={handleChange}
                      preset={uploadClothesImage}
                      name="image"
                    />
                </div>
              </div>
              <div className="field">
                <label className="label">Ingredients</label>
                <div className="control">
                  <textarea
                    className="textarea is-success"
                    rows="3"
                    placeholder="List ingredients here" 
                    name="ingredients"
                    onChange={handleChange}
                    value={formData.ingredients}
                    />
                </div>
              </div>
              <div className="field">
              <label className="label">Method</label>
                <div className="control">
                <textarea
                    className="textarea is-success"
                    rows="2"
                    placeholder="Step 1"
                    name="stepOne"
                    id={1}
                    onChange={handleMethodChange}
                    value={method.stepOne}
                    />
                </div>
              </div>
              <div className="field">
                <div className="control">
                <textarea
                    className="textarea is-success"
                    rows="2"
                    placeholder="Step 2"
                    name="stepTwo"
                    id={2}
                    onChange={handleMethodChange}
                    value={method.stepTwo}
                    />
                </div>
              </div>
              <div className="field">
                <div className="control">
                <textarea
                    className="textarea is-success"
                    rows="2"
                    placeholder="Step 3"
                    name="stepThree"
                    onChange={handleMethodChange}
                    value={method.stepThree}
                    />
                </div>
              </div>
              <div className="field">
                <div className="control">
                <textarea
                    className="textarea is-success"
                    rows="2"
                    placeholder="Step 4"
                    name="stepFour"
                    onChange={handleMethodChange}
                    value={method.stepFour}
                    />
                </div>
              </div>
              <div className="field">
                <div className="control">
                <textarea
                    className="textarea is-success"
                    rows="2"
                    placeholder="Step 5"
                    name="stepFive"
                    onChange={handleMethodChange}
                    value={method.stepFive}
                    />
                </div>
              </div>
              <div className="field">
                <div className="control">
                <textarea
                    className="textarea is-success"
                    rows="2"
                    placeholder="Step 6"
                    name="stepSix"
                    onChange={handleMethodChange}
                    value={method.stepSix}
                    />
                </div>
              </div>
              <div className="field">
                <label className="label">Cooking Time</label>
                <div className="control">
                  <input
                    className="input is-success"
                    type="number"
                    placeholder="Minutes"
                    name="cookingTime" 
                    onChange={handleChange}
                    value={formData.cookingTime}
                    />
                </div>
              </div>
              <div className="field">
                <label className="label">Cooking Temperature</label>
                <div className="control">
                  <input
                    className="input is-success"
                    type="number"
                    placeholder="Degrees"
                    name="cookingTemp" 
                    onChange={handleChange}
                    value={formData.cookingTemp}
                    />
                </div>
              </div>
              <div className="field">
                <label className="label">Serves</label>
                <div className="control">
                  <input
                    className="input is-success"
                    type="number"
                    placeholder="Number of people"
                    name="serves" 
                    onChange={handleChange}
                    value={formData.serves}
                    />
                </div>
              </div>
              <div className="field">
                <label className="label">Credit</label>
                <div className="control">
                  <input
                    className="input is-success"
                    type="text"
                    placeholder="URL or Chef name"
                    name="credit" 
                    onChange={handleChange}
                    value={formData.credit}
                    />
                </div>
              </div>
              <div className="field">
                <button type="submit" className="button is-fullwidth is-primary ">{buttonText}</button>
              </div>
            </form>
          </div>
  )
}



export default RecipeEditForm