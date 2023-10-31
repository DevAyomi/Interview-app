import React from 'react';
import Header from '../components/Header';
import ContactTable from '../components/ContactTable';
import contact_api from '../apis/contact';
import {useState, useEffect} from 'react';

function History() {
    const [allContacts, setAllContacts] = useState([]);
    const [loading , setLoading] = useState(false);
    const [cardData, setCardData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchHistory = async () => {
        setLoading(true);
        try{
            const response = await contact_api.getHistory();
            if(response.status === 200){
                setAllContacts(response.data.contacts);
                setLoading(false);
                console.log(response);
            }
        }catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    const view = async (id) => {
        try{
            setIsModalOpen(!isModalOpen);
            const response = await contact_api.viewContact(id);
            if(response.status === 200){
                console.log(response);
                setCardData(response.data.contact);
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchHistory();
    }, []);
    return <div>
        <Header />

    <div className='flex items-center justify-center '>
    <div class="relative mt-6 max-w-[100%] overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Product name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Color
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Category
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" class="px-6 py-3">
                        View
                    </th>
                </tr>
            </thead>
            <tbody>
                {/* Map through the allContact data */}

                {allContacts.map((contact) => (
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                     <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                         {contact.contact.name}
                     </th>
                     <td class="px-6 py-4">
                     {contact.contact.email}
                     </td>
                     <td class="px-6 py-4">
                     {contact.contact.phone}
                     </td>
                     <td class="px-6 py-4">
                     {contact.contact.address}
                     </td>
                     <p onClick={() => view(contact.contact.id)} className='cursor-pointer px-6 py-4 text-blue-500'>View</p>
                 </tr>
                ))}
               
               <div>
                  {isModalOpen && (
                    <div
                      id="popup-modal"
                      tabIndex="-1"
                      className="fixed flex items-center justify-center z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                    >
                      <div className="relative w-full flex items-center justify-center max-w-md max-h-full">
                      <div className="max-w-xs">
                        <div className="bg-white shadow-xl rounded-lg py-3">
                          <div className="photo-wrapper p-2">
                            <img
                              className="w-32 h-32 rounded-full mx-auto"
                              src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"
                              alt="John Doe"
                            />
                          </div>
                          <div className="p-2">
                            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{cardData.name ? cardData.name : ''}</h3>
                            <div className="text-center text-gray-400 text-xs font-semibold">
                              <p>{cardData.name ? cardData.name : ''}</p>
                            </div>
                            <table className="text-xs my-3">
                              <tbody>
                                <tr>
                                  <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                                  <td className="px-2 py-2">{cardData.address ? cardData.address : ''}</td>
                                </tr>
                                <tr>
                                  <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                  <td className="px-2 py-2">{cardData.phone ? cardData.phone : ''}</td>
                                </tr>
                                <tr>
                                  <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                  <td className="px-2 py-2">{cardData.email ? cardData.email : ''}</td>
                                </tr>
                              </tbody>
                            </table>

                            <button onClick={() => setIsModalOpen(false)} className='px-6 py-4 bg-red-500 rounded-sm flex justify-center items-center text-white'>Close</button>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  )}
                </div> 
            </tbody>
        </table>
    </div>
    </div>
    

    </div>;
}

export default History;