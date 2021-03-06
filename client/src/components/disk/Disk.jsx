import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../action/file";
import FileList from "./fileList/FileList";
import './disk.css'
import Popup from "./Popup";
import {setCurrentDir, setFileView, setPopupDisplay} from "../../reducers/fileReducer";
import Uploader from "./uploader/Uploader";


const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir);
    const dirStack = useSelector(state => state.files.dirStack);
    const loader = useSelector(state => state.app.loader);
    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState('type');


    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

    function showPopupHandler(){
        dispatch(setPopupDisplay('flex'))
    }

    function backClickHandler(){
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }
    function fileUpdateHandler(e){
        const files = [...e.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function dragEnterHandler(e){
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(true)
    }

    function dragLeaveHandler(e){
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(false)
    }

    function dropHandler(e){
        e.preventDefault()
        e.stopPropagation()
        const files = [...e.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)

    }
    if(loader){
        return (
            <div className='loader'>
                <div className="lds-dual-ring"></div>
            </div>
        )
    }

    return (!dragEnter ?
            <div className='disk' onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
               <div className="disk__btns">
                   <div className="disk__upload">
                       <label htmlFor="disk__upload-input" className='disk__upload-label'>?????????????????? ????????</label>
                       <input multiple={true} onChange={(e) => fileUpdateHandler(e)} type="file"  id='disk__upload-input' className='disk__upload-input'/>
                   </div>
                   <button className="disk__back" onClick={() => backClickHandler()}>??????????</button>
                   <button className="disk__create" onClick={() => showPopupHandler()}>?????????????? ??????????</button>
                   <select
                       value={sort}
                       onChange={(e) => setSort(e.target.value)}
                       className='disk__select'
                   >
                       <option value="name" >???? ??????????</option>
                       <option value="type" >???? ????????</option>
                       <option value="date" >???? ????????</option>
                   </select>

                   <button className='disk__plate' onClick={() => dispatch(setFileView('plate'))}/>
                   <button className='disk__list' onClick={() => dispatch(setFileView('list'))}/>

               </div>
                <FileList />
                <Popup />
                <Uploader/>
            </div>
            :
            <div className='drag-area' onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                ???????????????????? ?????????? ????????
            </div>
    );
};

export default Disk;