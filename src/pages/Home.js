import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import UserProfile from '../components/UserProfile';
import ContactTable from '../components/ContactTable';
import Header from '../components/Header';
import contact_api from '../apis/contact';

function Home() {
  const [created, setCreated] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  

  // Event handler to update form field values
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  // Event handler to submit the form
  const handleSubmit = async () => {
    const { name, email, phone, address } = formData;

    if(!name || !email || !phone || !address) {
      toast.error('Please fill all the fields');
      return;
    }
    setLoading(true);
    try{
      const response = await contact_api.createContact(formData);
      if(response.status === 201){
        toast.success('Contact created successfully');
        setCreated(true);
        setLoading(false);
        setContacts([...contacts, response.data.contact]);
      }else{
        toast.error('Failed to create contact');
        setLoading(false);
      }
      getAllContacts();
    }catch(error){
      console.log(error);
      toast.error('Failed to create contact');
      setLoading(false);
    }
  };

  const getAllContacts = async () => {
    setLoadingContacts(true);
    try{
      const response = await contact_api.getContacts();
      setAllContacts(response.data.contacts);
      setLoadingContacts(false);
    }catch(error){
      toast.error('Failed to fetch contacts');
      console.log(error);
      setLoadingContacts(false);
    }
  }

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <div className="font-sans bg-gray-100">
      
      {/* Content Area */}
      <div className="p-4">
        {/* Top Navigation Bar */}
       
        <Header />
        {/* Main Content */}
        <main className="mt-4 h-[100%] p-4 bg-white rounded-lg shadow-md">
          {/* Dashboard content goes here */}
          <div className='flex h-[100%]'>
            <div className='w-[43%] border-r border-blue-500'>
              {
                !created ? (
                  <h1 className='text-xl flex items-center justify-center'>Create a contact</h1>
                ): (
                  <h1 className='text-xl flex items-center justify-center'>Created contact</h1>
                )
              }

              {
                !created ? (
                  <form className="bg-white mt-8 border mr-4 rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Username"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        Phone
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone"
                        type="number"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="address"
                        type="text"
                        placeholder="Input your address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                      <p className="text-gray-700 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <a
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        href="#"
                      ></a>
                      <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                      >
                        {loading ? "Creating..." : "Create"}
                      </button>
                    </div>
                  </form>
                ): (
                  <UserProfile contacts={contacts} />
                )
              }
                  

              <ToastContainer />
            </div>

            <div className='w-[57%] ml-3'>
              <h1 className='text-xl flex mb-16 items-center justify-center'>All contacts</h1>
              {loadingContacts ? (
                <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
              ): (
                <ContactTable allContacts={allContacts} />
              )}
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
