import React from 'react'
import '../../assets/loader.css'

const Loader = () => {
  return (
    <svg className="pl my-72 mx-auto" width="128px" height="128px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" >
      <circle className="pl__ring1" cx="64" cy="64" r="60" fill="none" stroke="#6247aa" stroke-width="8" transform="rotate(-90,64,64)" stroke-linecap="round" stroke-dasharray="377 377" stroke-dashoffset="-376.4"></circle>
      <circle className="pl__ring2" cx="64" cy="64" r="52.5" fill="none" stroke="#815ac0" stroke-width="7" transform="rotate(-90,64,64)" stroke-linecap="round" stroke-dasharray="329.9 329.9" stroke-dashoffset="-329.3"></circle>
      <circle className="pl__ring3" cx="64" cy="64" r="46" fill="none" stroke="#a06cd5" stroke-width="6" transform="rotate(-90,64,64)" stroke-linecap="round" stroke-dasharray="289 289" stroke-dashoffset="-288.6"></circle>
      <circle className="pl__ring4" cx="64" cy="64" r="40.5" fill="none" stroke="#c19ee0" stroke-width="5" transform="rotate(-90,64,64)" stroke-linecap="round" stroke-dasharray="254.5 254.5" stroke-dashoffset="-254"></circle>
      <circle className="pl__ring5" cx="64" cy="64" r="36" fill="none" stroke="#dac3e8" stroke-width="4" transform="rotate(-90,64,64)" stroke-linecap="round" stroke-dasharray="226.2 226.2" stroke-dashoffset="-225.8"></circle>
      <circle className="pl__ring6" cx="64" cy="64" r="32.5" fill="none" stroke="#dec9e9" stroke-width="3" transform="rotate(-90,64,64)" stroke-linecap="round" stroke-dasharray="204.2 204.2" stroke-dashoffset="-203.9"></circle>
    </svg>
  )
}

export default Loader