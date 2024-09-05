
import React, { useState, useEffect } from "react";
import { message, Modal, Button } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import FileViewer from "react-file-viewer"; // Import react-file-viewer

const App = () => {
  const [fileList, setFileList] = useState([]); // State to store the list of file URLs
  const [previewFile, setPreviewFile] = useState(""); // State to store the URL of the file to preview
  const [fileContent, setFileContent] = useState(""); // State to store file content for text files
  const { id } = useParams(); // Extract id from URL parameters

  // Fetch files from the API when the component mounts
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `https://api-volunteers.fhn.gov.az/api/v1/Events/${id}` // Replace with your actual API URL
        );
        const files = response.data.data;
        if (files.eventAttachments && files.eventAttachments.length > 0) {
          const fileUrls = files.eventAttachments.map(
            (attachment) => attachment.url
          );
          setFileList(fileUrls); // Update state with the list of file URLs
        } else {
          message.info("Məlumat tapılmadı");
        }
      } catch (error) {
        message.error("Server xətası");
      }
    };

    fetchFiles();
  }, [id]); // Depend on id to refetch if it changes

  const handlePreview = async (url) => {
    setPreviewFile(url);

    // If the file is a text file, fetch its content
    if (url.endsWith(".txt")) {
      try {
        const response = await axios.get(url);
        setFileContent(response.data);
      } catch (error) {
        message.error("Error loading text file");
      }
    }
  };

  const handleDownload = (url) => {
    saveAs(url, url.split("/").pop()); // Download the file
  };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {fileList.length > 0 ? (
          fileList.map((url, index) => (
            <div key={index} style={{ position: "relative", margin: "10px" }}>
              {/* Render file preview based on type */}
              {url.endsWith(".pdf") ? (
                <Button type="link" onClick={() => handlePreview(url)}>
                  Ön baxış PDF
                </Button>
              ) : url.endsWith(".png") ||
                url.endsWith(".jpg") ||
                url.endsWith(".jpeg") ? (
                <img
                  src={url}
                  alt={`Attachment ${index}`}
                  style={{ width: "250px", height: "auto", cursor: "pointer" }}
                  onClick={() => handlePreview(url)}
                />
              ) : url.endsWith(".xlsx") || url.endsWith(".xls") ? (
                <Button type="link" onClick={() => handlePreview(url)}></Button>
              ) : (
                <Button type="link" onClick={() => handlePreview(url)}>
                  Yüklə
                </Button>
              )}
              <Button
                type="link"
                style={{ position: "absolute", bottom: "-25px", right: "5px" }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click from triggering the preview
                  handleDownload(url);
                }}
              >
                Yüklə
              </Button>
            </div>
          ))
        ) : (
          <p>Məlumat yoxdur</p>
        )}
      </div>
      {previewFile && (
        <Modal
          visible={!!previewFile}
          footer={null}
          onCancel={() => setPreviewFile("")}
          width="80%"
        >
          {previewFile.endsWith(".pdf") ? (
            <iframe
              src={previewFile}
              style={{ width: "100%", height: "80vh" }}
              title="PDF ön baxış"
            />
          ) : previewFile.endsWith(".txt") ? (
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {fileContent}
            </pre>
          ) : previewFile.endsWith(".xlsx") || previewFile.endsWith(".xls") ? (
            <FileViewer
              fileType={previewFile.split(".").pop()}
              filePath={previewFile}
            />
          ) : (
            <img alt="Preview" style={{ width: "100%" }} src={previewFile} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default App;