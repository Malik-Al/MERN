import React from 'react';
import './upoader.css'
import UploadFile from "./uploadFile/UploadFile";
import {useDispatch, useSelector} from "react-redux";
import {hideUploader} from "../../../reducers/uploadReducer";


const Uploader = () => {
    const files = useSelector(state => state.upload.files)
    const isVisible = useSelector(state => state.upload.isVisible)
    const dispatch = useDispatch()

    return ( isVisible &&
        <div className='uploader'>
            <div className="uploader__header">
                <div className="uploader__title">Загрузка</div>
                <button className='uploader__close' onClick={() => dispatch(hideUploader()) }>X</button>
            </div>

            {files.map((file, id) =>
                <UploadFile key={id} file={file}/>
            )}
        </div>
    );
};

export default Uploader;