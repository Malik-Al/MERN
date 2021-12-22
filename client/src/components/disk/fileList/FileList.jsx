import React from 'react';
import './fileList.css'
import File from "./file/File";
import {useSelector} from "react-redux";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const FileList = () => {
    const files = useSelector(state => state.files.files)

    return (
        <div className='fileList'>
            <div className="fileList__header">
                <div className="fileList__name">Название</div>
                <div className="fileList__data">Дата</div>
                <div className="fileList__size">Размер</div>
            </div>
            <TransitionGroup>
                {files.map((file, id) =>
                    <CSSTransition
                        key={id}
                        timeout={500}
                        classNames={'file'}
                        exit={false}
                    >
                        <File file={file} />
                    </CSSTransition>
                )}
            </TransitionGroup>
       </div>
    );
};

export default FileList;