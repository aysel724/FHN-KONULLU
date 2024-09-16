import React, { useEffect, useState } from "react";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import { useParams } from "react-router-dom";

const App = () => {
  let params = useParams();
  let userId = params.id;
  const DELETE_FILE_ENDPOINT = `https://api-volunteers.fhn.gov.az/api/v1/Events/DeleteAttachmentFromEvent/${userId}`;
  const API_ENDPOINT = `https://api-volunteers.fhn.gov.az/api/v1/Events/${userId}`;
  const UPLOAD_ENDPOINT =
    "https://api-volunteers.fhn.gov.az/api/v1/Events/AddNewAttachmentsToEvent";

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    axios
      .get(API_ENDPOINT)
      .then((response) => {
        const formattedFileList = response.data.data.eventAttachments.map(
          (file) => ({
            uid: file.uid || String(file.id),
            name: file.originalFileName,
            status: file.status || "Yüklənmə tamamlandı",
            url: file.url,
            thumbUrl: file.thumbUrl || file.url,
            percent: file.percent || 100,
          })
        );

        setFileList(formattedFileList);
        console.log(formattedFileList);
      })
      .catch((error) => {
        console.error("Xəta baş verdi", error);
        message.error("Xəta baş verdi");
      });
  }, []);

  const handleFileUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("Files", file);
    formData.append("EventId", userId);
    try {
      const response = await axios.post(UPLOAD_ENDPOINT, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newFile = {
        uid: file.uid,
        originalFileName: file.originalFileName,
        status: "Yüklənmə tamamlandı",
        url: response.data.url,
        thumbUrl: response.data.thumbUrl || response.data.url,
      };

      setFileList([...fileList, newFile]);
      onSuccess(null, file); // Notify success to Ant Design Upload component
      message.success("Fayl uğurla əlavə olundu");
    } catch (error) {
      console.error("Fayl əlavə olunmadı", error);
      onError(error); // Notify error to Ant Design Upload component
      message.error("Xəta baş verdi");
    }
  };
  const handleRemove = async (file) => {
    try {
      // Perform backend deletion if necessary
      await axios.delete(`${DELETE_FILE_ENDPOINT}/${file.uid}`);

      // Remove file from state
      setFileList(fileList.filter((item) => item.uid !== file.uid));
      message.success("Fayl silindi.");
    } catch (error) {
      console.error("Fayl silinmədi", error);
      message.error("Xəta baş verdi");
    }
  };

  return (
    <Upload
      customRequest={handleFileUpload}
      listType="picture"
      fileList={fileList}
      onChange={({ fileList }) => setFileList(fileList)}
      onRemove={handleRemove}
    >
      <Button type="primary" icon={<UploadOutlined />}>
        Yüklə
      </Button>
    </Upload>
  );
};

export default App;
