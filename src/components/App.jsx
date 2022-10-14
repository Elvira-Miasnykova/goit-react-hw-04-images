import { useEffect, useState } from "react"
import { Searchbar } from "./Searchbar/Searchbar"
import { toast, ToastContainer } from "react-toastify";
import { fetchImage } from "services/api";
import { Loader } from "./Loader/Loader";
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from "./Searchbar/ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Box } from "Box";

export const App = () => {
  const [page, setPage] = useState(1);
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (imageName === '') {
      return;
    }
    //async
    setIsLoading(true);
    fetchImage(page, imageName)
      .then(data => {
        data.hits.length === 0
          ? toast.error('Oops! We did not find any images matching your request. Please try again.')
          : setImages(prevState => [...prevState, ...data.hits])
        setIsLoading(false);
      }
      )
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
        
  }, [page, imageName]);

  
const handleSearchbarSubmit = imageName => {
  setImageName(imageName);
  setPage(1);
  setImages([]);
    
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  
    
    return (
    <Box margin="0 auto" paddingTop="20px" paddingBottom="20px">
        {isLoading && <Loader/>}
        <Searchbar onSubmit={handleSearchbarSubmit} />
        <ToastContainer autoClose={2000} />
        <ImageGallery images={images} />
        {images.length > 0 && <Button handleClick={loadMore} />}
    </Box>
  );
 
  
};