
import {

  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
} from '@xyflow/react';
import { toJpeg } from 'html-to-image';
const imageWidth = 800;
const imageHeight = 600;


const useStorage = () => {

  const { getNodes } = useReactFlow();

  const getFlowKey = () => {
    const savedFlows = localStorage.getItem('flowKey');
    if (savedFlows) {
      const parsedFlows: string[] = JSON.parse(savedFlows);
      return parsedFlows;
    }
    console.log("empty flowKey");
    return [];
  }

  const getThumbnail = () => {
    const savedThumbnails = localStorage.getItem('thumbnails');
    if (savedThumbnails) {
      const parsedThumbnails: {[key: string]: string} = JSON.parse(savedThumbnails);
      return parsedThumbnails;
    }
    console.log("empty thumbnails");
    return {};
  }

  const addFlowKey = async (id: string) => {
    const flowKey = getFlowKey();
    const thumbnails = getThumbnail();
    if (id !== 'flowKey' && id !== "thumbnails"){
      if (!flowKey.includes(id)){
        flowKey.push(id);
        localStorage.setItem('flowKey', JSON.stringify(flowKey));
      }
      const newThumbnail = await generateThumbnail(id);
      const newThumbnails = {...thumbnails, [id]: newThumbnail};
      localStorage.setItem('thumbnails', JSON.stringify(newThumbnails));
    }
  };

  const removeFlowKey = (id: string) => {
    const flowKey = getFlowKey();
    const thumbnails = getThumbnail();
    localStorage.removeItem(id);
    const updatedKey = flowKey.filter(key => key !== id);
    const updatedThumbnails = { ...thumbnails };
    delete updatedThumbnails[id];
    localStorage.setItem('flowKey', JSON.stringify(updatedKey));
    localStorage.setItem('thumbnails', JSON.stringify(updatedThumbnails));
  };

  const generateThumbnail = async (id: string) => {
    const viewportElement = document.querySelector('.react-flow__viewport') as HTMLElement;
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
      0
    );
    if (viewportElement) {
      const dataUrl = await toJpeg(viewportElement,
         { backgroundColor: '#fff',
           quality: 0.6,
          });
      return dataUrl;
    }
  };

  

  return { addFlowKey, removeFlowKey, getFlowKey, getThumbnail};
};

export default useStorage;
