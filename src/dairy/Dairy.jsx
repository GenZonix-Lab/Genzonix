import React, { useEffect, useState } from 'react'
import { fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth'
import { SlCalender } from 'react-icons/sl'
import { BsEraserFill } from 'react-icons/bs'
import { LuSend } from "react-icons/lu";
import { useNavigate } from 'react-router-dom'
import Calendar from './Calendar'
import './dairy.css'

const Dairy = () => {
  //navigate hook
  const navigate = useNavigate()
  //API Gateway endpoint
  const api = 'https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/dairy'
  //get token
  const getToken = async () => {
    const session = await fetchAuthSession()
    return session.tokens?.idToken?.toString()
  }
  //fetch diary entries on load
  const [diary, setDiary] = useState({})
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = await getToken()
        const response = await fetch(api, { headers: { 'Authorization': `Bearer ${token}` } })
        if (!response.ok) throw new Error('Failed to fetch diary entries')
        const data = await response.json()
        setDiary(data || {})
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchEntries()
  }, [])

  //state variables
  const today = new Date()
  const todayDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`
  const [selectedDate, setSelectedDate] = useState(todayDate)
  const [showCalendar, setShowCalendar] = useState(false)
  //save entry to backend
  const saveEntry = async (newDiary) => {
    try {
      const token = await getToken()
      await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(newDiary)
      })
      setDiary(newDiary)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  //entry input state
  const [entry, setEntry] = useState('');
  const handleAddEntry = async () => {
    if (!entry.trim()) return
    const newDiary = { ...diary, [selectedDate]: [...(diary[selectedDate] || []), entry] }
    await saveEntry(newDiary)
    setEntry('')
  }
  //delete entry
  const handleDeleteEntry = async (index) => {
    const newEntries = diary[selectedDate].filter((_, i) => i !== index)
    const newDiary = { ...diary, [selectedDate]: newEntries }
    await saveEntry(newDiary)
  }

  const getEntries = () => diary[selectedDate] || []
  const isToday = selectedDate === todayDate

  if (showCalendar) {
    return (
      <Calendar 
        diary={diary}
        onDateSelect={(date) => {
          setSelectedDate(date)
          setShowCalendar(false)
        }}
        onBackToDiary={() => setShowCalendar(false)}
      />
    )
  }
  return (
    <>
  <div className="d-flex justify-content-around align-items-center p-lg-4">
  {/* Calendar Button */}
  <SlCalender
    size={30}
    className="pointer"
    onClick={() => setShowCalendar(true)}
  />

  {/* Selected Date */}
  <h2 className="pb-2 f-graduate mt-3">{selectedDate}</h2>

  {/* Back Button */}
  <button
    className="btn pointer text-white d-flex align-items-center gap-1"
    onClick={() => navigate(-1)}
  >
    ⫷ <em>prev</em>
  </button>
</div>

{/* Entries Section */}
<div className="row justify-content-center px-4">
  <div className="col-md-8 col-lg-6 border-left shadow-sm p-1">
    <div
      className="pe-4 shadow-lg entries-container"
    >
      <div className="f-cursive fs-5">
        {getEntries().length > 0 ? (
          getEntries().map((entryText, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center my-0"
            >
              <p className="mb-0 flex-grow-1 text-indent">
              » {entryText}
              </p>
              <BsEraserFill
                size={16}
                className="text-warning pointer ms-2"
                onClick={() => handleDeleteEntry(index)}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-muted fst-italic mt-5">
            No entries yet... What happened today?
          </p>
        )}
      </div>
    </div>
  </div>
</div>

{/* Add Entry - Only for Today */}
{isToday && (
  <div className="row justify-content-center pb-4">
    <div className="col-md-8 col-lg-6">
      <div className="p-3">
        <div className="d-flex gap-2">
          <textarea
            className="form-control f-cursive"
            placeholder="What happened today? Write your thoughts..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary text-white"
            onClick={handleAddEntry}
          >
            <LuSend size={24} />
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{/* Back to Today Button */}
{!isToday && (
  <div className="text-center py-md-3 py-2">
    <button
      className="btn back-today-btn"
      onClick={() => setSelectedDate(todayDate)}
    >
      Back to Today
    </button>
  </div>
)}
  
    </>
  )
}

export default Dairy