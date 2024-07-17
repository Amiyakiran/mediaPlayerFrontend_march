import { faCloudArrowUp, faFilm } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { allVideoApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Add({setAddVideoStatus}) {
  const [show, setShow] = useState(false);
  const [videoDetails, setVideoDetails] = useState({
    caption:"",
    imageUrl:"",
    embedLink:""
  })
console.log(videoDetails);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getLink =(e)=>{
   const link = e.target.value
   console.log(link);
    if(link.startsWith('https://youtu.be/')){
     setVideoDetails({...videoDetails,embedLink:`https://www.youtube.com/embed/${link.slice(17,28)}`})

    }
    else{
     setVideoDetails({...videoDetails,embedLink:`https://www.youtube.com/embed/${link.slice(-11)}`})
    }
  }

  const handleUpload = async(e)=>{
    e.preventDefault()
   const {caption ,imageUrl,embedLink} = videoDetails
   if(!caption || !imageUrl || !embedLink){
    toast.info('Please fill the form completely')
   }
   else{
    const result = await allVideoApi(videoDetails)
   
    if(result.status>=200 && result.status<300){
      toast.success('Video Added successfully')
      handleClose()
      setAddVideoStatus(result.data)
    }
    else{
     toast.error('Something went wrong')
      console.log(result);
    }
   }
  }

  return (
    <>
    <div className="d-flex align-items-center">
      <h5>Upload new video</h5>
      <button onClick={handleShow} className='btn fs-5'><FontAwesomeIcon icon={faCloudArrowUp} /></button>
    </div>

{/* https://www.youtube.com/watch?v=tOM-nWPcR4U
https://youtu.be/tOM-nWPcR4U?feature=shared

src="https://www.youtube.com/embed/tOM-nWPcR4U"


<iframe width="914" height="514" src="https://www.youtube.com/embed/tOM-nWPcR4U" title="Illuminati|Aavesham|Jithu Madhavan|Fahadh Faasil|Sushin Shyam,Dabzee,Vinayak| Nazriya|Anwar Rasheed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


<iframe width="914" height="514" src="https://www.youtube.com/embed/rhrD7as3KJg" title="Neeraj Madhav - BALLAATHA JAATHI [Official Video] ft. Dabzee | Baby Jean | ​⁠Rzee" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

*/}
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-warning'><FontAwesomeIcon icon={faFilm} className='me-2' />Upload Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please fill the following details</p>
          <form className='border p-3 rounded'>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder='Video Caption' onChange={(e)=>setVideoDetails({...videoDetails,caption:e.target.value})} />
            </div>
            <div className="mb-3">
            <input type="text" className="form-control" placeholder='Video Image'onChange={(e)=>setVideoDetails({...videoDetails,imageUrl:e.target.value})} />
            </div>
            <div className="mb-3">
            <input type="text" className="form-control" placeholder='Video Url' onChange={(e)=>getLink(e)} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleUpload} >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </>
  )
}

export default Add