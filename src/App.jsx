import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Function to share grocery list
  const shareGroceryList = () => {
    // Create a more family-friendly format
    const shareText = "Family Grocery List:\n\n" + 
      groceries.map(item => 
        `${item.purchased ? '✓' : '□'} ${item.name} - ${item.quantity} ${item.unit}`
      ).join('\n') + 
      "\n\nShared from our Family Grocery App";
    
    if (navigator.share) {
      navigator.share({
        title: 'Family Grocery List',
        text: shareText
      }).catch(err => {
        console.error('Error sharing:', err);
        // Fallback to clipboard
        copyToClipboard(shareText);
      });
    } else {
      // Fallback for browsers that don't support sharing
      copyToClipboard(shareText);
    }
  }

  // Helper function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Grocery list copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  }
  const [groceries, setGroceries] = useState(() => {
    const savedGroceries = localStorage.getItem('groceries')
    if (savedGroceries) {
      return JSON.parse(savedGroceries)
    } else {
      return []
    }
  })
  const [newItem, setNewItem] = useState('')
  const [newQuantity, setNewQuantity] = useState('')
  const [newUnit, setNewUnit] = useState('kg')
  const [editingId, setEditingId] = useState(null)
  const [editItem, setEditItem] = useState('')
  const [editQuantity, setEditQuantity] = useState('')
  const [editUnit, setEditUnit] = useState('kg')

  // Save groceries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('groceries', JSON.stringify(groceries))
  }, [groceries])

  const addGroceryItem = (e) => {
    e.preventDefault()
    if (newItem.trim() === '' || newQuantity.trim() === '') return
    
    const groceryItem = {
      id: Date.now(),
      name: newItem,
      quantity: newQuantity,
      unit: newUnit,
      purchased: false
    }
    
    setGroceries([...groceries, groceryItem])
    setNewItem('')
    setNewQuantity('')
  }

  const deleteGroceryItem = (id) => {
    setGroceries(groceries.filter(item => item.id !== id))
  }

  const togglePurchased = (id) => {
    setGroceries(groceries.map(item => 
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ))
  }

  const startEditing = (item) => {
    setEditingId(item.id)
    setEditItem(item.name)
    setEditQuantity(item.quantity)
    setEditUnit(item.unit)
  }

  const saveEdit = (id) => {
    if (editItem.trim() === '' || editQuantity.trim() === '') return
    
    setGroceries(groceries.map(item => 
      item.id === id ? { 
        ...item, 
        name: editItem, 
        quantity: editQuantity,
        unit: editUnit 
      } : item
    ))
    setEditingId(null)
  }

  return (
    <div className="grocery-app">
      <h1>Grocery List</h1>
      
      <div className="button-row">
        <button onClick={shareGroceryList} className="share-button">Share with Family</button>
      </div>
      
      <form onSubmit={addGroceryItem} className="grocery-form">
        <div className="form-row">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add grocery item"
            className="grocery-input"
          />
          <input
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            placeholder="Quantity"
            className="quantity-input"
            min="0"
            step="1.0"
          />
          <select 
            value={newUnit} 
            onChange={(e) => setNewUnit(e.target.value)}
            className="unit-select"
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="l">l</option>
            <option value="ml">ml</option>
          </select>
        </div>
        <div className="button-row">
          <button type="submit" className="add-button">Add</button>
        </div>
      </form>

      <ul className="grocery-list">
        {groceries.length === 0 ? (
          <p className="empty-message">No grocery items yet! Add one above.</p>
        ) : (
          groceries.map(item => (
            <li key={item.id} className={`grocery-item ${item.purchased ? 'completed' : ''}`}>
              {editingId === item.id ? (
                <div className="edit-form">
                  <div className="form-row">
                    <input
                      type="text"
                      value={editItem}
                      onChange={(e) => setEditItem(e.target.value)}
                      className="edit-input"
                    />
                    <input
                      type="number"
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(e.target.value)}
                      className="edit-quantity"
                      min="0"
                      step="1.0"
                    />
                    <select 
                      value={editUnit} 
                      onChange={(e) => setEditUnit(e.target.value)}
                      className="edit-unit"
                    >
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="l">l</option>
                      <option value="ml">ml</option>
                    </select>
                  </div>
                  <div className="button-row">
                    <button onClick={() => saveEdit(item.id)} className="save-button">Save</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grocery-text-container">
                    <input
                      type="checkbox"
                      checked={item.purchased}
                      onChange={() => togglePurchased(item.id)}
                      className="grocery-checkbox"
                    />
                    <span className="grocery-text">
                      {item.name} - {item.quantity} {item.unit}
                    </span>
                  </div>
                  <div className="grocery-actions">
                    <button onClick={() => startEditing(item)} className="edit-button">Edit</button>
                    <button onClick={() => deleteGroceryItem(item.id)} className="delete-button">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  )

}

export default App
