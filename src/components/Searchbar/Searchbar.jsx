import { useState } from "react"
import { toast } from "react-toastify";
import { ReactComponent as SearchIcon } from 'components/icons/icons8-search.svg';
import { FormButton, HeaderSearchbar, SearchForm, FormInput } from "./Searchbar.styled";

export const Searchbar = ({onSubmit}) => {
    const[ imageName, setImageName ] = useState('');
    
    const handleNameChange = event => {
        setImageName(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (imageName.trim() === '') {
            toast.error("please input name of image");
            return 
        }
        onSubmit(imageName);
        setImageName('');
    }

    
        return (
            <HeaderSearchbar>
                <SearchForm onSubmit={handleSubmit}>
                <FormButton type="submit">
                    <SearchIcon width="32" height="32"/>
                </FormButton>

                <FormInput
                    
                    type="text"
                    name="imageName"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={imageName}
                    onChange={handleNameChange}
                    />
                    
                </SearchForm>
            </HeaderSearchbar>
        )
        
   

}