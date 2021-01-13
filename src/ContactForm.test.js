import React from "react";
import { render,screen ,fireEvent} from "@testing-library/react";
import ContactForm from './components/ContactForm';

describe("Testing the Contact Form Component",()=>{
    
    test ("renders Contact form without Crashing",()=>{
        render(<ContactForm/>);
    })
    
    test("Query,Fill,Submit,Form Validation", async() => {
      render(<ContactForm />);
    //Note for self: When no id for the label element, below error appears and test fails to select getByLabel.
    // TestingLibraryElementError: Found a label with the text of: /name/i, however no form control was found associated to that label. Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.
    //query for the screen elements
     const firstName = await screen.getByLabelText(/first name/i);
     const lastName  = await screen.getByLabelText(/last name/i);
     const email     = await screen.getByLabelText(/email/i);
     const message   = await screen.getByLabelText(/message/i);
     const terms     = await screen.getByLabelText(/agree/i);
     const submitButton    = await screen.getByRole("button",{name: /submit/i});
    //fill out the form
    fireEvent.change(firstName,{target:{value:"Star"}});
    
    fireEvent.change(lastName,{target:{value:"Man"}});
    
    fireEvent.change(email,{target:{value:"sm@gmail.com"}});
    
    fireEvent.change(message,{target:{value:"some notes..."}});
    
    fireEvent.click(terms,{target :{value:"Agree"}});
    fireEvent.click(submitButton);
    
    //expected result
     await screen.findByText(/star/i);
     await screen.findByText(/Man/i);
     await screen.findByText(/sm@gmail.com/i);
     await screen.findByText(/some notes.../i);
    });

    test("testing for error message when first Name is more than 20char",()=>{
    render(<ContactForm/>)
    const check20CharName = screen.getByLabelText(/first name/i);
    
    //enter first name value more than 15 char
    fireEvent.change(check20CharName,{target:{value:"abcdefghijklmnopqrstuvwxyz"}})
    
    //check for error message due to exceeded max length
    screen.findByText(/error max length/i)
    })

    test("test dropdown",()=>{
        render(<ContactForm/>)
        const location = screen.getByLabelText(/location/i);
        //choose location
        fireEvent.change(location,{target:{value:"Seattle"}})
        
        //check for error message due to exceeded max length
        screen.findByText(/seattle/i)
        })

})

