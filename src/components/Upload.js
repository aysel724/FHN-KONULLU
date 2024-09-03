import React, { useState, useEffect } from "react";
import { message, Modal, Button } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver"; // Import file-saver

const App = () => {
  const [fileList, setFileList] = useState([]); // State to store the list of file URLs
  const [previewFile, setPreviewFile] = useState(""); // State to store the URL of the file to preview
  const { id } = useParams(); // Extract id from URL parameters

  // Fetch files from the API when the component mounts
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `https://api-volunteers.fhn.gov.az/api/v1/MesTrainings/${id}` // Replace with your API URL
        );
        const files = response.data.data;
        if (
          files.mesTrainingAttachments &&
          files.mesTrainingAttachments.length > 0
        ) {
          const fileUrls = files.mesTrainingAttachments.map(
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

  const handlePreview = (url) => {
    setPreviewFile(url);
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
                  Preview PDF
                </Button>
              ) : url.endsWith(".png") ||
                url.endsWith(".jpg") ||
                url.endsWith(".jpeg") ? (
                <img
                  src={url}
                  alt={`Attachment ${index}`}
                  style={{ width: "200px", height: "auto", cursor: "pointer" }}
                  onClick={() => handlePreview(url)}
                />
              ) : (
                <Button type="link" onClick={() => handlePreview(url)}>
                  Baxış
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
          <p>Boşdur</p>
        )}
      </div>
      {previewFile && (
        <Modal
          visible={!!previewFile}
          footer={null}
          onCancel={() => setPreviewFile("")}
          width="50%"
        >
          {previewFile.endsWith(".pdf") ? (
            <iframe
              src={previewFile}
              style={{ width: "100%", height: "80vh" }}
              title="PDF Preview"
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

// export default App;
// import React, { useState, useEffect } from "react";
// import { message } from "antd";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const App = () => {
//   const [imageUrl, setImageUrl] = useState(""); // State to store the image URL
//   let params = useParams();
//   let userId = params.id;

//   // Fetch images from the API when the component mounts
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get(
//           `https://api-volunteers.fhn.gov.az/api/v1/MesTrainings/${userId}` // Replace with your API URL
//         );
//         const images = response.data.data;
//         const im = images.mesTrainingAttachments[0].url; // Assume response.data is an object containing image URLs
//         setImageUrl(im); // Update state with the image URL
//       } catch (error) {
//         message.error("Failed to load images from API.");
//       }
//     };

//     fetchImages();
//   }, [userId]); // Depend on userId to refetch if it changes

//   return (
//     <>
//       {imageUrl && (
//         <img
//           src={imageUrl}
//           alt="Fetched"
//           style={{ width: "10%", height: "auto" }}
//         />
//       )}
//     </>
//   );
// };

// export default App;

// import React, { useState, useEffect } from "react";
// import { message, Modal, Button } from "antd";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const App = () => {
//   const [imageList, setImageList] = useState([]); // State to store the list of image URLs
//   const [previewImage, setPreviewImage] = useState(""); // State to store the URL of the image to preview
//   const { id } = useParams(); // Extract id from URL parameters

//   // Fetch images from the API when the component mounts
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get(
//           `https://api-volunteers.fhn.gov.az/api/v1/MesTrainings/${id}` // Replace with your API URL
//         );
//         const images = response.data.data;
//         if (
//           images.mesTrainingAttachments &&
//           images.mesTrainingAttachments.length > 0
//         ) {
//           const urls = images.mesTrainingAttachments.map(
//             (attachment) => attachment.url
//           );
//           setImageList(urls); // Update state with the list of image URLs
//         } else {
//           message.info("No images found.");
//         }
//       } catch (error) {
//         message.error("Failed to load images from API.");
//       }
//     };

//     fetchImages();
//   }, [id]); // Depend on id to refetch if it changes

//   const handlePreview = (url) => {
//     setPreviewImage(url);
//   };

//   const handleDownload = (url) => {
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = url.split("/").pop(); // Extract file name from URL
//     link.click();
//   };

//   return (
//     <div>
//       <div style={{ display: "flex", flexWrap: "wrap" }}>
//         {imageList.length > 0 ? (
//           imageList.map((url, index) => (
//             <div key={index} style={{ position: "relative", margin: "10px" }}>
//               <img
//                 src={url}
//                 alt={`Attachment ${index}`}
//                 style={{ width: "100%", height: "auto", cursor: "pointer" }}
//                 onClick={() => handlePreview(url)}
//               />
//               <Button
//                 type="link"
//                 style={{ position: "absolute", bottom: "5px", right: "5px" }}
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent the click from triggering the preview
//                   handleDownload(url);
//                 }}
//               >
//                 Download
//               </Button>
//             </div>
//           ))
//         ) : (
//           <p></p>
//         )}
//       </div>
//       {previewImage && (
//         <Modal
//           visible={!!previewImage}
//           footer={null}
//           onCancel={() => setPreviewImage("")}
//           width="50%"
//         >
//           <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
//         </Modal>
//       )}
//     </div>
//   );
// };

// // export default App;
// import React, { useState, useEffect } from "react";
// import { message, Modal, Button } from "antd";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { saveAs } from "file-saver"; // Import file-saver

// const App = () => {
//   const [imageList, setImageList] = useState([]); // State to store the list of image URLs
//   const [previewImage, setPreviewImage] = useState(""); // State to store the URL of the image to preview
//   const { id } = useParams(); // Extract id from URL parameters

//   // Fetch images from the API when the component mounts
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get(
//           `https://api-volunteers.fhn.gov.az/api/v1/MesTrainings/${id}` // Replace with your API URL
//         );
//         const images = response.data.data;
//         if (
//           images.mesTrainingAttachments &&
//           images.mesTrainingAttachments.length > 0
//         ) {
//           const urls = images.mesTrainingAttachments.map(
//             (attachment) => attachment.url
//           );
//           setImageList(urls); // Update state with the list of image URLs
//         } else {
//           message.info("No images found.");
//         }
//       } catch (error) {
//         message.error("Failed to load images from API.");
//       }
//     };

//     fetchImages();
//   }, [id]); // Depend on id to refetch if it changes

//   const handlePreview = (url) => {
//     setPreviewImage(url);
//   };

//   const handleDownload = (url) => {
//     // Use file-saver to download the image
//     saveAs(url, url.split("/").pop()); // Extract file name from URL
//   };

//   return (
//     <div>
//       <div style={{ display: "flex", flexWrap: "wrap" }}>
//         {imageList.length > 0 ? (
//           imageList.map((url, index) => (
//             <div key={index} style={{ position: "relative", margin: "10px" }}>
//               <img
//                 src={url}
//                 alt={`Attachment ${index}`}
//                 style={{ width: "100px", height: "auto", cursor: "pointer" }}
//                 onClick={() => handlePreview(url)}
//               />
//               <Button
//                 type="link"
//                 style={{ position: "absolute", bottom: "5px", right: "5px" }}
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent the click from triggering the preview
//                   handleDownload(url);
//                 }}
//               >
//                 Download
//               </Button>
//             </div>
//           ))
//         ) : (
//           <p>No images available.</p>
//         )}
//       </div>
//       {previewImage && (
//         <Modal
//           visible={!!previewImage}
//           footer={null}
//           onCancel={() => setPreviewImage("")}
//           width="80%"
//         >
//           <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default App;
