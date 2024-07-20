import React, { useState } from 'react';
import { ConfigProvider, Upload, Button, message, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './index.css'; // Ensure this contains your custom font CSS

const App = () => {
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  const handleChange = ({ fileList }) => {
    setFileList(fileList);

    // Show image preview
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl(null);
    }
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.error('No file selected for upload.');
      return;
    }

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file.originFileObj);
    });

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('File uploaded successfully.');
      console.log(response.data);
    } catch (error) {
      message.error('Upload failed.');
      console.error(error);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'IranSans', // Replace 'IranSans' with your custom font family
        },
      }}
    >
      <div className="h-screen w-screen flex justify-center items-center gap-4 flex-col">
        <div className="text-2xl">پروژه تشخیص ویروس کرونا - علی منتظریون</div>
        <div className="flex flex-row gap-2">
          <Upload
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />} className="IranSans">
              <div>یک فایل انتخاب کنید</div>
            </Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
          >
            آپلود تصویر
          </Button>
        </div>
        <div>
          {imageUrl && (
            <div className="mt-4">
              <Image
                src={imageUrl}
                alt="Uploaded"
                style={{ maxWidth: '500px', maxHeight: '500px' }}
              />
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
