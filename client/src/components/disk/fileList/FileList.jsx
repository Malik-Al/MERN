import React from 'react';
import './file.css'
import File from "./file/File";
import {useSelector} from "react-redux";

const FileList = () => {
    const files = useSelector(state => state.files.files)

    return (
        <div className='fileList'>
            <div className="fileList__header">
                <div className="fileList__name">Название</div>
                <div className="fileList__data">Дата</div>
                <div className="fileList__size">Размер</div>
            </div>
            {files.map((file, id) =>
                <File file={file} key={id}/>
            )}
       </div>
    );
};

export default FileList;