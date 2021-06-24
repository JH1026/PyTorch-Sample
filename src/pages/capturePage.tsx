/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useCallback, useState, useRef, useEffect,
} from 'react';
import { Button } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function CapturePage() {
  const [isDropped, setDropped] = useState(false);
  const [isCropMode, setCropMode] = useState(false);
  const [dropImgSrc, setDropImgSrc] = useState('');
  const [classifyResult, setClassifyResult] = useState([]);

  const imgRef = useRef(null);
  const previewCanvasRef = useRef<any>();
  const [crop, setCrop] = useState<Crop>({ unit: '%', width: 1234, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState<Crop>({ width: 0, height: 0 });

  const onDrop = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setDropImgSrc(reader.result as string);
    };

    reader.readAsDataURL(file[0]);
    setDropped(true);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const createFormData = (imgData: string) : FormData => {
    const form = document.createElement('from')[0];
    const formData = new FormData(form as HTMLFormElement);
    formData.append('dropImg', imgData);

    return formData;
  };

  const makeImgData = (imgBase64Data: string) : null | string => {
    const prefixIndex = imgBase64Data.indexOf(';base64,');
    if (prefixIndex === -1) {
      throw new Error('Image data is null');
    }

    return imgBase64Data.substr(prefixIndex + 7);
  };

  const selectImg = () : string => (
    isCropMode ? previewCanvasRef.current.toDataURL('image/png') : dropImgSrc
  );

  const getBodyData = () : FormData => (
    createFormData(
      makeImgData(
        selectImg(),
      ) as string,
    )
  );

  const outputClassifiedImgInfo = (data) => {
    setClassifyResult(data);
  };

  const getClassifiedImgInfo = () => {
    try {
      const dropImageData = getBodyData();

      fetch('/classification', {
        method: 'POST',
        body: dropImageData,
      })
        .then((res) => {
          if (!res.ok) {
            throw Error();
          }
          return res.json();
        })
        .then(outputClassifiedImgInfo)
        .catch(() => {
          alert('error');
        });
    } catch (error) {
      alert(error);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current as any;
    const canvas = previewCanvasRef.current as any;
    const cropInfo = completedCrop as any;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = cropInfo.width * pixelRatio;
    canvas.height = cropInfo.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      cropInfo.x * scaleX,
      cropInfo.y * scaleY,
      cropInfo.width * scaleX,
      cropInfo.height * scaleY,
      0,
      0,
      cropInfo.width,
      cropInfo.height,
    );
  }, [completedCrop]);

  return (
    <div style={{ maxWidth: '750px', margin: 'auto' }}>
      <div
        style={{
          width: '98%',
          height: 120,
          border: '1px dotted #888',
          paddingTop: 50,
          textAlign: 'center',
          display: isDropped ? 'none' : 'block',
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {
          isDragActive
            ? <p>Drop the files here ...</p>
            : <p>Drag and drop some files here, or click to select files</p>
        }
      </div>
      <div
        style={{
          display: isDropped ? 'block' : 'none',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => getClassifiedImgInfo()}
          style={{
            margin: '4px',
          }}
        >
          Classify
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCropMode(!isCropMode)}
          style={{
            margin: '4px',
            border: !isCropMode ? '2px solid #ccf' : 'none',
          }}
        >
          Whole
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCropMode(!isCropMode)}
          style={{
            margin: '4px',
            border: isCropMode ? '2px solid #ccf' : 'none',
          }}
        >
          Crop
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDropped(false)}
          style={{
            margin: '4px',
          }}
        >
          Select
        </Button>
      </div>
      <div
        style={{
          width: '70.4%',
          float: 'left',
          display: isDropped && !isCropMode ? 'block' : 'none',
        }}
      >
        <img
          id="dropImgField"
          src={dropImgSrc}
          alt="drop-img"
          style={{
            maxWidth: '100%',
          }}
        />
      </div>
      <div
        style={{
          width: '70.4%',
          float: 'left',
          display: isDropped && isCropMode ? 'block' : 'none',
        }}
      >
        <ReactCrop
          src={dropImgSrc}
          crop={crop}
          onImageLoaded={onLoad}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        />
      </div>
      <div
        style={{
          width: '29.4%',
          float: 'left',
          display: isDropped ? 'block' : 'none',
        }}
      >
        {classifyResult.map((item : any) => (
          <div key={item.name + item.prob}>
            {item.name}
            {' '}
            :
            {' '}
            {Math.round(item.prob * 10000) / 100}
            %
          </div>
        ))}
      </div>
      <div>
        <canvas
          ref={previewCanvasRef}
          style={{
            display: 'none',
            width: Math.round(completedCrop.width ?? 0),
            height: Math.round(completedCrop.height ?? 0),
          }}
        />
      </div>
    </div>
  );
}
