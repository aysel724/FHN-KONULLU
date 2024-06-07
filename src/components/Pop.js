import React from 'react';
import { Button, ConfigProvider, Popconfirm } from 'antd';
import { QuestionCircleOutlined} from '@ant-design/icons'
const description = 'Əgər seriya AA-dırsa parametr olaraq [Seriya]+[Seriya nömrəsi] göndərilir:  AA1122345. Əgər seriya AZE-dirsə onda sadəcə [Seriya nömrəsi] göndərilir:  11922345 ';
const text = 'Şəxsiyyət vəsiqəsinin seriya nömrəsi';

const Pop = () => (
  <ConfigProvider   
  
  >
    <div className="demo" style={{marginLeft:"-20px"}}>
      
      

     
        <Popconfirm 
          placement="bottom"
          title={text}
          description={description}
    
        
        >
     
          <QuestionCircleOutlined style={{color:"teal"}} />
        </Popconfirm>
         
      </div>
      

  </ConfigProvider>
);
export default Pop;