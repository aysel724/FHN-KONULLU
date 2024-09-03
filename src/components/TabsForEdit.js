import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import FormsForEditings  from "./FormsForEditings"

const TabsForEdit = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button style={{ 
      borderRadius: "9px",
       backgroundColor: "#4b7d83",
       color: "white",
       boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }} onClick={() => setOpen(true)}>
       <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.55594 12L2.84473 15L5.68957 14.25L13.9297 5.5605C14.1963 5.27921 14.3461 4.89775 14.3461 4.5C14.3461 4.10226 14.1963 3.72079 13.9297 3.4395L13.8073 3.3105C13.5406 3.0293 13.1789 2.87132 12.8017 2.87132C12.4245 2.87132 12.0628 3.0293 11.796 3.3105L3.55594 12Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.55594 12L2.84473 15L5.68957 14.25L12.8017 6.75L10.668 4.5L3.55594 12Z" fill="white"/>
<path d="M10.668 4.5L12.8017 6.75M9.24561 15H14.9353" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> <span>Düzəliş edin</span>  
      </Button>
      <Modal
        title="Details"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        height={800}

      >
  <FormsForEditings/>
      </Modal>
    </>
  );
};
export default TabsForEdit;