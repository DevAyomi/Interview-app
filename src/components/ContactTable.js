import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import contact_api from '../apis/contact';

function ContactTable(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardData , setCardData] = useState([]);
    const view = async (id) => {
        setIsModalOpen(!isModalOpen);
        const response = await contact_api.viewContact(id);
        setCardData(response.data.contact);
        console.log(response);
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-blue-500 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
            {/* Map through thr all contancts data */}
          {props.allContacts.map((contact) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {contact.name}
              </th>
              <td className="px-6 py-4">{contact.email}</td>
              <td className="px-6 py-4">{contact.phone}</td>
              <td className="px-6 py-4">
              <p onClick={() => view(contact.id)} className='cursor-pointer text-blue-500'>View</p>
              </td>
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
                              <button onClick={() => setIsModalOpen(false)} className='px-6 py-4 bg-red-500 rounded-sm flex justify-center items-center text-white'>Close</button>
                            </table>

                            
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
  );
}

export default ContactTable;
